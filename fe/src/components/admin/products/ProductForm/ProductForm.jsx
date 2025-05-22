import { memo } from "react";
import "./ProductForm.scss";

const ProductForm = memo(({ product, onChange, onSubmit }) => {
    return (
        <form className="product-form" onSubmit={onSubmit}>
            <label>
                Tên sản phẩm:
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={onChange}
                    required
                />
            </label>

            <label>
                Giá:
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={onChange}
                    required
                />
            </label>

            <label>
                Thương hiệu:
                <input
                    type="text"
                    name="brand"
                    value={product.brand}
                    onChange={onChange}
                />
            </label>

            <button type="submit">Lưu sản phẩm</button>
        </form>
    );
});

export default ProductForm;
