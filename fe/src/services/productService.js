import axios from "axios";


export const getProducts = async (keyword = "", page = 0, size = 10) => {
    const response = await axios.get("/products/search", {
        params: { keyword, page, size },
    });
    return response.data;
};

export const filterProducts = async (filters, page =0, size = 10) =>{
    const response = await axios.get("/product/filter",{
        params: { ...filters, page, size},
    });
    return response.data;
};

export const getProductById = async (id) => {
    const response = await axios.get(`/products/${id}`);
    return response.data;
};

export const createProduct = async (data) => {
    const response = await  axios.get("/products", data);
    return response.data;
};

export const updateProduct = async (id, data) => {
    const response = await  axios.get(`/products/${id}`, data);
    return response.data;
};

export const deleteProductById = async (id) => {
    await axios.delete(`/products/${id}`);
}