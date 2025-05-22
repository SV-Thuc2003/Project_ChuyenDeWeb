export const ROUTERS = {
    USER: {
        HOME:"",
        PROFILE:"thong-tin-ca-nhan",
        PRODUCTS:"/san-pham",
        PRODUCT:"/san-pham/chi-tiet/:id",
        SHOPPING_CART:"/gio-hang",
        CHECKOUT:"/thanh-toan",
        LOGIN: "/users/dang-nhap",
        REGISTER: "/users/dang-ky",
        VERITY:"/verify-otp",
    },
    ADMIN: {
        LOGIN: "/admin/login",
        DASHBOARD: "/admin",                 // trang chính sau khi admin đăng nhập
        PRODUCTS: "/admin/products",         // trang quản lý sản phẩm

    }
}