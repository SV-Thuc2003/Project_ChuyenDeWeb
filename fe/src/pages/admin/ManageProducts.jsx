import { useEffect, useState, useCallback } from "react";
import ProductTable from "@/components/products/ProductTable";
import ProductForm from "@/components/products/ProductForm";
import UploadImages from "@/components/products/UploadImages";
import ProductDetailSection from "@/components/products/ProductDetailSection";
import FilterBar from "@/components/products/FilterBar";
import SearchBar from "@/components/products/SearchBar";
import axios from "axios";
import "./ManageProducts.scss";

const API_URL = "http://localhost:8080/api/products";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isFormVisible, setFormVisible] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [filters, setFilters] = useState({});

    const fetchProducts = useCallback(async () => {
        try {
            let url = `${API_URL}`;
            const params = { ...filters, page: 0, size: 20 };

            if (searchKeyword) {
                url = `${API_URL}/search`;
                params.keyword = searchKeyword;
            } else if (Object.keys(filters).length > 0) {
                url = `${API_URL}/filter`;
            }

            const response = await axios.get(url, { params });
            setProducts(response.data.content || []);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách sản phẩm:", error);
        }
    }, [searchKeyword, filters]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleCreate = async (product) => {
        try {
            const response = await axios.post(API_URL, product);
            setProducts((prev) => [...prev, response.data]);
            setFormVisible(false);
        } catch (error) {
            console.error("Lỗi khi tạo sản phẩm:", error);
        }
    };

    const handleUpdate = async (updatedProduct) => {
        try {
            const response = await axios.put(`${API_URL}/${updatedProduct.id}`, updatedProduct);
            setProducts((prev) =>
                prev.map((p) => (p.id === updatedProduct.id ? response.data : p))
            );
            setEditingProduct(null);
            setFormVisible(false);
        } catch (error) {
            console.error("Lỗi khi cập nhật sản phẩm:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setProducts((prev) => prev.filter((p) => p.id !== id));
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm:", error);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormVisible(true);
    };

    const handleViewDetail = async (product) => {
        try {
            const response = await axios.get(`${API_URL}/${product.id}`);
            setSelectedProduct(response.data);
        } catch (error) {
            console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
        }
    };

    return (
        <div className="manage-products">
            <h2>Quản lý sản phẩm</h2>

            <div className="top-bar">
                <SearchBar onSearch={setSearchKeyword} />
                <button onClick={() => setFormVisible(true)}>➕ Thêm sản phẩm</button>
            </div>

            <FilterBar onFilter={setFilters} />

            <ProductTable
                products={products}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onViewDetail={handleViewDetail}
            />

            {isFormVisible && (
                <ProductForm
                    onSubmit={editingProduct ? handleUpdate : handleCreate}
                    initialData={editingProduct}
                    onClose={() => {
                        setFormVisible(false);
                        setEditingProduct(null);
                    }}
                />
            )}

            {selectedProduct && (
                <ProductDetailSection
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}

            <UploadImages />
        </div>
    );
};

export default ManageProducts;
