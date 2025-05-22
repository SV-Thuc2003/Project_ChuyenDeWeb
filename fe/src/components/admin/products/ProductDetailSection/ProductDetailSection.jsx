import { memo } from "react";
import "./ProductDetailSection.scss";

const ProductDetailSection = memo(({ detail }) => {
    return (
        <div className="product-detail">
            <h3>Chi tiết sản phẩm</h3>
            <ul>
                <li>Công suất lọc: {detail.capacity_l_per_hour} L/h</li>
                <li>Công nghệ: {detail.technology}</li>
                <li>Công suất điện: {detail.power_consumption}</li>
                <li>Kích thước: {detail.dimensions}</li>
                <li>Chất liệu: {detail.material}</li>
                <li>Trọng lượng: {detail.weight_kg} kg</li>
                <li>Thông tin thêm: {detail.additional_info}</li>
            </ul>
        </div>
    );
});

export default ProductDetailSection;
