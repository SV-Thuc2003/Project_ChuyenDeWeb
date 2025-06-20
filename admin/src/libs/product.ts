const API_BASE = "http://localhost:8080/api/admin/products";

export interface ProductResponse {
  id: number;
  name: string;
  description?: string;
  price: number | string;
  stock?: number;
  categories?: string[];
  thumbnailUrl?: string;
  imageUrls?: string[];
  status?: string;  // giữ nếu bạn cần dùng
  
  // add các trường cần thiết theo backend trả về
}

export interface ProductListResponse {
  content: ProductResponse[];
  totalPages: number;
  totalElements: number;
  // ...
}

export async function fetchProducts(
  params: { page?: number; size?: number; sort?: string } = {}
): Promise<ProductListResponse> {
  const { page = 0, size = 10, sort = "createdAt,desc" } = params;
  const res = await fetch(`${API_BASE}?page=${page}&size=${size}&sort=${sort}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${token}`, nếu cần
    },
  });

  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function deleteProduct(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete product");
}

export async function toggleProductStatus(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}/toggle-status`, {
    method: "PUT",
  });
  if (!res.ok) throw new Error("Failed to toggle product status");
}
