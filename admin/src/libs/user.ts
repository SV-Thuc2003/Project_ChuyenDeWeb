// // libs/user.ts
// const BASE_URL = "http://localhost:8000/api/admin";

// function getCommonHeaders(token?: string, hasBody: boolean = false): Record<string, string> {
//   const headers: Record<string, string> = {};
//   if (token) headers.Authorization = `Bearer ${token}`;
//   if (hasBody) headers["Content-Type"] = "application/json";
//   return headers;
// }

// const commonFetchOptions = (token?: string, method: string = "GET", body?: any) => {
//   const hasBody = method === "POST" || method === "PUT";
//   return {
//     method,
//     headers: getCommonHeaders(token, hasBody),
//     credentials: "include" as RequestCredentials, // gửi cookie nếu có
//     ...(hasBody && body ? { body: JSON.stringify(body) } : {}),
//   };
// };

// export async function apiGet<T>(endpoint: string, token?: string): Promise<T> {
//   const url = `${BASE_URL}${endpoint}`;
//   const res = await fetch(url, commonFetchOptions(token, "GET"));
//   if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//   return res.json();
// }

// export async function apiPost<T>(endpoint: string, token?: string, data?: any): Promise<T> {
//   const url = `${BASE_URL}${endpoint}`;
//   const res = await fetch(url, commonFetchOptions(token, "POST", data));
//   if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//   return res.json();
// }

// export async function apiPut<T = void>(endpoint: string, token?: string, data?: any): Promise<T> {
//   const url = `${BASE_URL}${endpoint}`;
//   const res = await fetch(url, commonFetchOptions(token, "PUT", data));
//   if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//   if (res.status !== 204) return res.json();
//   return undefined as unknown as T;
// }

// export async function apiDelete<T>(endpoint: string, token?: string): Promise<T> {
//   const url = `${BASE_URL}${endpoint}`;
//   const res = await fetch(url, commonFetchOptions(token, "DELETE"));
//   if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//   return res.json();
// }
// libs/user.ts
const BASE_URL = "http://localhost:8080/api";

function getHeaders(token?: string, hasBody: boolean = false): HeadersInit {
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (hasBody) headers["Content-Type"] = "application/json";
  return headers;
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (res.ok) {
    if (res.status === 204) return undefined as unknown as T; // No Content
    // Thử parse JSON trả về
    try {
      return await res.json();
    } catch {
      return undefined as unknown as T;
    }
  } else {
    // Lấy message lỗi dạng text hoặc JSON
    let errorMessage = `HTTP error! status: ${res.status}`;
    try {
      const json = await res.json();
      if (json?.message) errorMessage = json.message;
    } catch {
      try {
        errorMessage = await res.text();
      } catch {}
    }
    throw new Error(errorMessage);
  }
}

export async function apiGet<T>(path: string, token?: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "GET",
    headers: getHeaders(token, false),
    credentials: "include",
  });
  return handleResponse<T>(res);
}

export async function apiPost<T>(path: string, token?: string, body?: any): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: getHeaders(token, true),
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  });
  return handleResponse<T>(res);
}

export async function apiPut<T = void>(path: string, token?: string, body?: any): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "PUT",
    headers: getHeaders(token, true),
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  });
  return handleResponse<T>(res);
}

export async function apiDelete<T = void>(path: string, token?: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "DELETE",
    headers: getHeaders(token, false),
    credentials: "include",
  });
  return handleResponse<T>(res);
}
