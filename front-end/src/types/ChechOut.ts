
export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
}

export interface ShippingAddress {
  address: string;
  ward: string;       // Thêm dòng này
  district: string;   // Thêm dòng này
  city: string;

  // ✅ THÊM CÁC FIELD BÊN DƯỚI NẾU CHƯA CÓ
  provinceId: string;
  districtId: string;
  wardCode: string;
}

export interface CheckoutState {
  personalInfo: PersonalInfo;
  shippingAddress: ShippingAddress;
  discountCode: string;
  paymentMethod: string;
}
