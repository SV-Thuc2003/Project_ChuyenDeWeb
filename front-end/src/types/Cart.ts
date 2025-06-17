export interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  thumbnail: string; // 👈 thêm dòng này
}


export interface PromoCode {
  code: string;
  discount: number;
}