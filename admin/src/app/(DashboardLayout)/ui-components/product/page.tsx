// 'use client';

// import React, { useState } from "react";
// import {
//     Box,
//     Button,
//     Card,
//     CardContent,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Typography,
//     IconButton,
//     Pagination,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     TextField,
//     Stack,
//     Select,
//     MenuItem,
//     InputLabel,
//     FormControl,
//     SelectChangeEvent,
// } from "@mui/material";
// import { IconEdit, IconTrash } from "@tabler/icons-react";

// interface Product {
//     id: number;
//     name: string;
//     category: string;
//     price: number;
//     stock: number;
//     description: string;
//     image?: string; // url base64 preview or path
// }

// const initialProducts: Product[] = Array.from({ length: 50 }).map((_, i) => ({
//     id: i + 1,
//     name: `Máy lọc nước ${String.fromCharCode(65 + (i % 26))}`,
//     category: ["Điện tử", "Gia dụng", "Đồ chơi"][i % 3],
//     price: 2000000 + i * 50000,
//     stock: Math.floor(Math.random() * 50),
//     description: `Mô tả cho sản phẩm Máy lọc nước ${String.fromCharCode(65 + (i % 26))}`,
// }));

// const ITEMS_PER_PAGE = 10;

// const ProductManagement = () => {
//     const [products, setProducts] = useState<Product[]>(initialProducts);
//     const [page, setPage] = useState(1);
//     const [openDialog, setOpenDialog] = useState(false);
//     const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; idToDelete?: number }>({ open: false });
//     const [editingProduct, setEditingProduct] = useState<Product | null>(null);
//     const [form, setForm] = useState({
//         name: "",
//         category: "",
//         price: "",
//         stock: "",
//         description: "",
//         image: "",
//     });

//     const handleOpenDialog = (product?: Product) => {
//         if (product) {
//             setEditingProduct(product);
//             setForm({
//                 name: product.name,
//                 category: product.category,
//                 price: product.price.toString(),
//                 stock: product.stock.toString(),
//                 description: product.description,
//                 image: product.image || "",
//             });
//         } else {
//             setEditingProduct(null);
//             setForm({
//                 name: "",
//                 category: "",
//                 price: "",
//                 stock: "",
//                 description: "",
//                 image: "",
//             });
//         }
//         setOpenDialog(true);
//     };

//     const handleCloseDialog = () => {
//         setOpenDialog(false);
//     };

//     const handleSave = () => {
//         if (!form.name || !form.category || !form.price || !form.stock) {
//             alert("Vui lòng điền đầy đủ thông tin bắt buộc");
//             return;
//         }
//         const priceNum = Number(form.price);
//         const stockNum = Number(form.stock);
//         if (isNaN(priceNum) || priceNum <= 0) {
//             alert("Giá sản phẩm không hợp lệ");
//             return;
//         }
//         if (isNaN(stockNum) || stockNum < 0) {
//             alert("Số lượng tồn kho không hợp lệ");
//             return;
//         }

//         if (editingProduct) {
//             setProducts((prev) =>
//                 prev.map((p) =>
//                     p.id === editingProduct.id
//                         ? { ...p, ...form, price: priceNum, stock: stockNum }
//                         : p
//                 )
//             );
//         } else {
//             const newProduct: Product = {
//                 id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1,
//                 name: form.name,
//                 category: form.category,
//                 price: priceNum,
//                 stock: stockNum,
//                 description: form.description,
//                 image: form.image,
//             };
//             setProducts((prev) => [...prev, newProduct]);
//         }
//         setOpenDialog(false);
//     };

//     const confirmDelete = (id: number) => {
//         setDeleteDialog({ open: true, idToDelete: id });
//     };

//     const handleDelete = () => {
//         if (deleteDialog.idToDelete !== undefined) {
//             setProducts((prev) => prev.filter((p) => p.id !== deleteDialog.idToDelete));
//         }
//         setDeleteDialog({ open: false });
//     };

//     const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target;
//         setForm({ ...form, [name]: value });
//     };

//     const handleChangeSelect = (e: SelectChangeEvent<string>) => {
//         const { name, value } = e.target;
//         setForm({ ...form, [name]: value });
//     };

//     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files[0]) {
//             const reader = new FileReader();
//             reader.onload = () => {
//                 setForm((prev) => ({ ...prev, image: reader.result as string }));
//             };
//             reader.readAsDataURL(e.target.files[0]);
//         }
//     };

//     const pagedProducts = products.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

//     const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
//         setPage(value);
//     };

//     return (
//         <Card>
//             <CardContent>
//                 <Box display="flex" justifyContent="space-between" mb={2} alignItems="center" flexWrap="wrap" gap={1}>
//                     <Typography variant="h6" fontWeight="bold">Quản lý sản phẩm</Typography>
//                     <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
//                         Thêm sản phẩm
//                     </Button>
//                 </Box>

//                 <TableContainer>
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>Mã</TableCell>
//                                 <TableCell>Tên sản phẩm</TableCell>
//                                 <TableCell>Danh mục</TableCell>
//                                 <TableCell>Giá (VNĐ)</TableCell>
//                                 <TableCell>Tồn kho</TableCell>
//                                 <TableCell>Mô tả</TableCell>
//                                 <TableCell>Ảnh</TableCell>
//                                 <TableCell align="center">Thao tác</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {pagedProducts.map(({ id, name, category, price, stock, description, image }) => (
//                                 <TableRow key={id}>
//                                     <TableCell>{id}</TableCell>
//                                     <TableCell>{name}</TableCell>
//                                     <TableCell>{category}</TableCell>
//                                     <TableCell>{price.toLocaleString("vi-VN")}</TableCell>
//                                     <TableCell>{stock}</TableCell>
//                                     <TableCell sx={{ maxWidth: 200, whiteSpace: "normal" }}>{description}</TableCell>
//                                     <TableCell>
//                                         {image ? (
//                                             <img
//                                                 src={image}
//                                                 alt={name}
//                                                 style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 4 }}
//                                             />
//                                         ) : (
//                                             <Typography variant="caption" color="text.secondary">Chưa có ảnh</Typography>
//                                         )}
//                                     </TableCell>
//                                     <TableCell align="center">
//                                         <IconButton color="primary" onClick={() => handleOpenDialog(products.find(p => p.id === id))}>
//                                             <IconEdit size={20} />
//                                         </IconButton>
//                                         <IconButton color="error" onClick={() => confirmDelete(id)}>
//                                             <IconTrash size={20} />
//                                         </IconButton>
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                             {pagedProducts.length === 0 && (
//                                 <TableRow>
//                                     <TableCell colSpan={8} align="center">Chưa có sản phẩm nào</TableCell>
//                                 </TableRow>
//                             )}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>

//                 <Stack alignItems="center" mt={2}>
//                     <Pagination
//                         count={Math.ceil(products.length / ITEMS_PER_PAGE)}
//                         page={page}
//                         onChange={handlePageChange}
//                         color="primary"
//                     />
//                 </Stack>

//                 {/* Dialog thêm / sửa */}
//                 <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
//                     <DialogTitle>{editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}</DialogTitle>
//                     <DialogContent>
//                         <TextField
//                             label="Tên sản phẩm"
//                             name="name"
//                             value={form.name}
//                             onChange={handleChangeInput}
//                             fullWidth
//                             margin="dense"
//                         />
//                         <FormControl fullWidth margin="dense">
//                             <InputLabel id="category-label">Danh mục</InputLabel>
//                             <Select
//                                 labelId="category-label"
//                                 label="Danh mục"
//                                 name="category"
//                                 value={form.category}
//                                 onChange={handleChangeSelect}
//                             >
//                                 <MenuItem value="Điện tử">Điện tử</MenuItem>
//                                 <MenuItem value="Gia dụng">Gia dụng</MenuItem>
//                                 <MenuItem value="Đồ chơi">Đồ chơi</MenuItem>
//                             </Select>
//                         </FormControl>
//                         <TextField
//                             label="Giá (VNĐ)"
//                             name="price"
//                             value={form.price}
//                             onChange={handleChangeInput}
//                             type="number"
//                             fullWidth
//                             margin="dense"
//                         />
//                         <TextField
//                             label="Tồn kho"
//                             name="stock"
//                             value={form.stock}
//                             onChange={handleChangeInput}
//                             type="number"
//                             fullWidth
//                             margin="dense"
//                         />
//                         <TextField
//                             label="Mô tả"
//                             name="description"
//                             value={form.description}
//                             onChange={handleChangeInput}
//                             multiline
//                             rows={3}
//                             fullWidth
//                             margin="dense"
//                         />
//                         <Button
//                             variant="outlined"
//                             component="label"
//                             fullWidth
//                             sx={{ mt: 1, mb: 2 }}
//                         >
//                             Chọn ảnh sản phẩm
//                             <input
//                                 type="file"
//                                 hidden
//                                 accept="image/*"
//                                 onChange={handleImageChange}
//                             />
//                         </Button>
//                         {form.image && (
//                             <Box textAlign="center" mb={2}>
//                                 <img
//                                     src={form.image}
//                                     alt="Preview"
//                                     style={{ maxWidth: "100%", maxHeight: 200, objectFit: "contain" }}
//                                 />
//                             </Box>
//                         )}
//                     </DialogContent>
//                     <DialogActions>
//                         <Button onClick={handleCloseDialog}>Hủy</Button>
//                         <Button onClick={handleSave} variant="contained" color="primary">
//                             Lưu
//                         </Button>
//                     </DialogActions>
//                 </Dialog>

//                 {/* Dialog xác nhận xóa */}
//                 <Dialog
//                     open={deleteDialog.open}
//                     onClose={() => setDeleteDialog({ open: false })}
//                 >
//                     <DialogTitle>Xác nhận xóa</DialogTitle>
//                     <DialogContent>
//                         Bạn có chắc chắn muốn xóa sản phẩm này không?
//                     </DialogContent>
//                     <DialogActions>
//                         <Button onClick={() => setDeleteDialog({ open: false })}>Hủy</Button>
//                         <Button onClick={handleDelete} variant="contained" color="error">Xóa</Button>
//                     </DialogActions>
//                 </Dialog>
//             </CardContent>
//         </Card>
//     );
// };

// export default ProductManagement;

"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { IconEdit, IconTrash } from "@tabler/icons-react";

import { fetchProducts, deleteProduct } from "@/libs/product"; // đường dẫn đến file api.ts của bạn

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  image?: string;
}

const ITEMS_PER_PAGE = 10;

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Dialog trạng thái
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    idToDelete?: number;
  }>({ open: false });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: "",
  });

  // Load danh sách sản phẩm từ API khi page thay đổi
  useEffect(() => {
    loadProducts(page);
  }, [page]);

  const loadProducts = async (page: number) => {
    try {
      const data = await fetchProducts({
        page: page - 1,
        size: ITEMS_PER_PAGE,
      });

      const productsMapped: Product[] = data.content.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description || "",
        price: Number(p.price),
        stock: p.stock || 0,
        category:
          p.categories && p.categories.length > 0 ? p.categories[0] : "Chưa có",
        image: p.thumbnailUrl || (p.imageUrls && p.imageUrls[0]) || "",
      }));

      setProducts(productsMapped);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Lỗi tải sản phẩm:", error);
      alert("Lỗi tải danh sách sản phẩm");
    }
  };

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setForm({
        name: product.name,
        category: product.category,
        price: product.price.toString(),
        stock: product.stock.toString(),
        description: product.description,
        image: product.image || "",
      });
    } else {
      setEditingProduct(null);
      setForm({
        name: "",
        category: "",
        price: "",
        stock: "",
        description: "",
        image: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSave = () => {
    // Bạn cần viết hàm gọi API tạo/sửa ở đây nếu có backend support
    alert("Bạn cần cài đặt hàm tạo/sửa sản phẩm gọi API");
  };

  const confirmDelete = (id: number) => {
    setDeleteDialog({ open: true, idToDelete: id });
  };

  const handleDelete = async () => {
    if (deleteDialog.idToDelete === undefined) return;
    try {
      await deleteProduct(deleteDialog.idToDelete);
      alert("Xóa sản phẩm thành công");
      loadProducts(page);
    } catch (error) {
      console.error("Lỗi xóa sản phẩm:", error);
      alert("Xóa sản phẩm thất bại");
    } finally {
      setDeleteDialog({ open: false });
    }
  };

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleChangeSelect = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setForm((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Card>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          mb={2}
          alignItems="center"
          flexWrap="wrap"
          gap={1}
        >
          <Typography variant="h6" fontWeight="bold">
            Quản lý sản phẩm
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenDialog()}
          >
            Thêm sản phẩm
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã</TableCell>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Danh mục</TableCell>
                <TableCell>Giá (VNĐ)</TableCell>
                <TableCell>Tồn kho</TableCell>
                <TableCell>Mô tả</TableCell>
                <TableCell>Ảnh</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map(
                ({ id, name, category, price, stock, description, image }) => (
                  <TableRow key={id}>
                    <TableCell>{id}</TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{category}</TableCell>
                    <TableCell>{price.toLocaleString("vi-VN")}</TableCell>
                    <TableCell>{stock}</TableCell>
                    <TableCell sx={{ maxWidth: 200, whiteSpace: "normal" }}>
                      {description}
                    </TableCell>
                    <TableCell>
                      {image ? (
                        <img
                          src={image}
                          alt={name}
                          style={{
                            width: 60,
                            height: 60,
                            objectFit: "cover",
                            borderRadius: 4,
                          }}
                        />
                      ) : (
                        <Typography variant="caption" color="text.secondary">
                          Chưa có ảnh
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() =>
                          handleOpenDialog(products.find((p) => p.id === id))
                        }
                      >
                        <IconEdit size={20} />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => confirmDelete(id)}
                      >
                        <IconTrash size={20} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              )}
              {products.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    Chưa có sản phẩm nào
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack alignItems="center" mt={2}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>

        {/* Dialog thêm / sửa */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Tên sản phẩm"
              name="name"
              value={form.name}
              onChange={handleChangeInput}
              fullWidth
              margin="dense"
            />
            <FormControl fullWidth margin="dense">
              <InputLabel id="category-label">Danh mục</InputLabel>
              <Select
                labelId="category-label"
                label="Danh mục"
                name="category"
                value={form.category}
                onChange={handleChangeSelect}
              >
                <MenuItem value="Điện tử">Máy lọc nước</MenuItem>
                <MenuItem value="Gia dụng">Máy lọc điện giải</MenuItem>
                <MenuItem value="Đồ chơi">Máy lọc nước RO Hydrogen</MenuItem>
                <MenuItem value="Điện tử">Lõi máy lọc nước</MenuItem>
                <MenuItem value="Gia dụng">Lọc nước không điện</MenuItem>
                <MenuItem value="Đồ chơi">Cốc lọc nước đầu nguồn</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Giá (VNĐ)"
              name="price"
              value={form.price}
              onChange={handleChangeInput}
              type="number"
              fullWidth
              margin="dense"
            />
            <TextField
              label="Tồn kho"
              name="stock"
              value={form.stock}
              onChange={handleChangeInput}
              type="number"
              fullWidth
              margin="dense"
            />
            <TextField
              label="Mô tả"
              name="description"
              value={form.description}
              onChange={handleChangeInput}
              multiline
              rows={3}
              fullWidth
              margin="dense"
            />
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mt: 1, mb: 2 }}
            >
              Chọn ảnh sản phẩm
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
            {form.image && (
              <Box textAlign="center" mb={2}>
                <img
                  src={form.image}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: 200,
                    objectFit: "contain",
                  }}
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Hủy</Button>
            <Button onClick={handleSave} variant="contained" color="primary">
              Lưu
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog xác nhận xóa */}
        <Dialog
          open={deleteDialog.open}
          onClose={() => setDeleteDialog({ open: false })}
        >
          <DialogTitle>Xác nhận xóa</DialogTitle>
          <DialogContent>
            Bạn có chắc chắn muốn xóa sản phẩm này không?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialog({ open: false })}>
              Hủy
            </Button>
            <Button onClick={handleDelete} variant="contained" color="error">
              Xóa
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ProductManagement;
