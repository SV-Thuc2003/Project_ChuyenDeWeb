// export async function apiGet<T>(path: string, token: string): Promise<T> {
//   const res = await fetch(`/api${path}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   if (!res.ok) throw new Error(await res.text());
//   return res.json();
// }

// export async function apiPut(path: string, token: string): Promise<void> {
//   const res = await fetch(`/api${path}`, {
//     method: 'PUT',
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   if (!res.ok) throw new Error(await res.text());
// }
