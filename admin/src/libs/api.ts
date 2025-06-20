export async function apiGet<T>(path: string, token: string): Promise<T> {
  const res = await fetch(`http://localhost:8080/api${path}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
export async function apiPut(path: string, token: string, body?: any): Promise<void> {
  const res = await fetch(`http://localhost:8080/api${path}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(await res.text());
}


// export async function apiPut(path: string, token: string): Promise<void> {
//   const res = await fetch(`http://localhost:8080/api${path}`, {
//     method: 'PUT',
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   if (!res.ok) throw new Error(await res.text());
// }

export async function apiDelete(path: string, token: string): Promise<void> {
  const res = await fetch(`http://localhost:8080/api${path}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error(await res.text());
}

