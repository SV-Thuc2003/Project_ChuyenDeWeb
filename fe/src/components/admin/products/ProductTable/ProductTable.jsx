import { memo } from "react";
import "./ProductTable.scss";

const ProductTable = memo(({ products, onEdit, onDelete, onViewDetail }) => {
    return (
        <div className="product-table">
            <table>
                <thead>
                <tr>
                    <th>Tên sản phẩm</th>
                    <th>Giá</th>
                    <th>Danh mục</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {products?.length > 0 ? (
                    products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.price.toLocaleString()} ₫</td>
                            <td>{product.category}</td>
                            <td>
                  <span
                      className={`status ${
                          product.status === "active" ? "active" : "inactive"
                      }`}
                  >
                    {product.status === "active" ? "Đang bán" : "Ẩn"}
                  </span>
                            </td>
                            <td className="actions">
                                <button onClick={() => onViewDetail(product)}>👁️</button>
                                <button onClick={() => onEdit(product)}>✏️</button>
                                <button onClick={() => onDelete(product.id)}>🗑️</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5">Không có sản phẩm nào.</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
});

export default ProductTable;
