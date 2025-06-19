// 'use client';

// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   IconButton,
//   Pagination,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Stack,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   SelectChangeEvent,
// } from "@mui/material";
// import { IconEdit, IconTrash } from "@tabler/icons-react";

// interface Customer {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   status: "Active" | "Inactive";
// }

// const initialCustomers: Customer[] = Array.from({ length: 50 }).map((_, i) => ({
//   id: i + 1,
//   name: `Khách hàng ${i + 1}`,
//   email: `khachhang${i + 1}@example.com`,
//   phone: `0900${String(100000 + i)}`,
//   address: `Địa chỉ khách hàng ${i + 1}`,
//   status: i % 2 === 0 ? "Active" : "Inactive",
// }));

// const ITEMS_PER_PAGE = 10;

// const CustomerManagement = () => {
//   const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
//   const [page, setPage] = useState(1);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; idToDelete?: number }>({ open: false });
//   const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     status: "Active" as Customer["status"],
//   });

//   // Thêm hàm đổi trạng thái (khóa / mở tài khoản)
//   const toggleStatus = (id: number) => {
//     setCustomers(prev =>
//         prev.map(c =>
//             c.id === id
//                 ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" }
//                 : c
//         )
//     );
//   };

//   const handleOpenDialog = (customer?: Customer) => {
//     if (customer) {
//       setEditingCustomer(customer);
//       setForm({
//         name: customer.name,
//         email: customer.email,
//         phone: customer.phone,
//         address: customer.address,
//         status: customer.status,
//       });
//     } else {
//       setEditingCustomer(null);
//       setForm({
//         name: "",
//         email: "",
//         phone: "",
//         address: "",
//         status: "Active",
//       });
//     }
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   const handleSave = () => {
//     if (!form.name || !form.email || !form.phone) {
//       alert("Vui lòng điền đầy đủ thông tin bắt buộc");
//       return;
//     }

//     // Bạn có thể thêm validate email hoặc số điện thoại ở đây nếu muốn

//     if (editingCustomer) {
//       setCustomers((prev) =>
//           prev.map((c) =>
//               c.id === editingCustomer.id
//                   ? { ...c, ...form }
//                   : c
//           )
//       );
//     } else {
//       const newCustomer: Customer = {
//         id: customers.length ? Math.max(...customers.map(c => c.id)) + 1 : 1,
//         ...form,
//       };
//       setCustomers((prev) => [...prev, newCustomer]);
//     }
//     setOpenDialog(false);
//   };

//   const confirmDelete = (id: number) => {
//     setDeleteDialog({ open: true, idToDelete: id });
//   };

//   const handleDelete = () => {
//     if (deleteDialog.idToDelete !== undefined) {
//       setCustomers((prev) => prev.filter((c) => c.id !== deleteDialog.idToDelete));
//     }
//     setDeleteDialog({ open: false });
//   };

//   // Handle TextField change
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   // Handle Select change
//   const handleSelectChange = (e: SelectChangeEvent<string>) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const pagedCustomers = customers.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

//   const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
//     setPage(value);
//   };

//   return (
//       <Card>
//         <CardContent>
//           <Box display="flex" justifyContent="space-between" mb={2} alignItems="center" flexWrap="wrap" gap={1}>
//             <Typography variant="h6" fontWeight="bold">Quản lý khách hàng</Typography>
//             <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
//               Thêm khách hàng
//             </Button>
//           </Box>

//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Mã</TableCell>
//                   <TableCell>Tên khách hàng</TableCell>
//                   <TableCell>Email</TableCell>
//                   <TableCell>Điện thoại</TableCell>
//                   <TableCell>Địa chỉ</TableCell>
//                   <TableCell>Trạng thái</TableCell>
//                   <TableCell align="center">Thao tác</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {pagedCustomers.map(({ id, name, email, phone, address, status }) => (
//                     <TableRow key={id}>
//                       <TableCell>{id}</TableCell>
//                       <TableCell>{name}</TableCell>
//                       <TableCell>{email}</TableCell>
//                       <TableCell>{phone}</TableCell>
//                       <TableCell sx={{ maxWidth: 200, whiteSpace: "normal" }}>{address}</TableCell>
//                       <TableCell>{status}</TableCell>
//                       <TableCell align="center" sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
//                         <IconButton color="primary" onClick={() => handleOpenDialog(customers.find(c => c.id === id))}>
//                           <IconEdit size={20} />
//                         </IconButton>
//                         <IconButton color="error" onClick={() => confirmDelete(id)}>
//                           <IconTrash size={20} />
//                         </IconButton>
//                         <Button
//                             variant="outlined"
//                             size="small"
//                             color={status === "Active" ? "error" : "success"}
//                             onClick={() => toggleStatus(id)}
//                         >
//                           {status === "Active" ? "Khóa" : "Mở"}
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                 ))}
//                 {pagedCustomers.length === 0 && (
//                     <TableRow>
//                       <TableCell colSpan={7} align="center">Chưa có khách hàng nào</TableCell>
//                     </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <Stack alignItems="center" mt={2}>
//             <Pagination
//                 count={Math.ceil(customers.length / ITEMS_PER_PAGE)}
//                 page={page}
//                 onChange={handlePageChange}
//                 color="primary"
//             />
//           </Stack>

//           {/* Dialog thêm / sửa */}
//           <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
//             <DialogTitle>{editingCustomer ? "Sửa khách hàng" : "Thêm khách hàng mới"}</DialogTitle>
//             <DialogContent>
//               <TextField
//                   label="Tên khách hàng"
//                   name="name"
//                   value={form.name}
//                   onChange={handleInputChange}
//                   fullWidth
//                   margin="dense"
//               />
//               <TextField
//                   label="Email"
//                   name="email"
//                   value={form.email}
//                   onChange={handleInputChange}
//                   fullWidth
//                   margin="dense"
//                   type="email"
//               />
//               <TextField
//                   label="Điện thoại"
//                   name="phone"
//                   value={form.phone}
//                   onChange={handleInputChange}
//                   fullWidth
//                   margin="dense"
//                   type="tel"
//               />
//               <TextField
//                   label="Địa chỉ"
//                   name="address"
//                   value={form.address}
//                   onChange={handleInputChange}
//                   multiline
//                   rows={3}
//                   fullWidth
//                   margin="dense"
//               />
//               <FormControl fullWidth margin="dense">
//                 <InputLabel id="status-label">Trạng thái</InputLabel>
//                 <Select
//                     labelId="status-label"
//                     label="Trạng thái"
//                     name="status"
//                     value={form.status}
//                     onChange={handleSelectChange}
//                 >
//                   <MenuItem value="Active">Active</MenuItem>
//                   <MenuItem value="Inactive">Inactive</MenuItem>
//                 </Select>
//               </FormControl>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleCloseDialog}>Hủy</Button>
//               <Button onClick={handleSave} variant="contained" color="primary">
//                 Lưu
//               </Button>
//             </DialogActions>
//           </Dialog>

//           {/* Dialog xác nhận xóa */}
//           <Dialog
//               open={deleteDialog.open}
//               onClose={() => setDeleteDialog({ open: false })}
//           >
//             <DialogTitle>Xác nhận xóa</DialogTitle>
//             <DialogContent>
//               Bạn có chắc chắn muốn xóa khách hàng này không?
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={() => setDeleteDialog({ open: false })}>Hủy</Button>
//               <Button onClick={handleDelete} variant="contained" color="error">Xóa</Button>
//             </DialogActions>
//           </Dialog>
//         </CardContent>
//       </Card>
//   );
// };

// export default CustomerManagement;

'use client';
import React, { useState, useEffect } from 'react';
import {
  Box, Button, Card, CardContent,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography, Pagination, IconButton
} from '@mui/material';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { apiGet, apiPut } from '@/libs/api';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'BANNED';
}

export default function CustomerManagement() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const token = typeof window !== 'undefined'
    ? localStorage.getItem('token') || ''
    : '';

  // ① Fetch dữ liệu từ backend
  useEffect(() => {
    if (!token) return;
    apiGet<Customer[]>('/admin/customers', token)
      .then(setCustomers)
      .catch(err => alert('Lỗi: ' + err.message));
  }, [token]);

  // ② Toggle trạng thái (Active <-> Inactive)
  const toggleStatus = (id: number, current: Customer['status']) => {
    const next = current === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    apiPut(`/admin/customers/${id}/status?status=${next}`, token)
      .then(() => {
        setCustomers(prev =>
          prev.map(c => c.id === id ? { ...c, status: next } : c)
        );
      })
      .catch(err => alert('Cập nhật thất bại: ' + err.message));
  };

  // ③ Phân trang
  const paged = customers.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Quản lý khách hàng</Typography>
        </Box>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                {['ID', 'Tên', 'Email', 'Điện thoại', 'Địa chỉ', 'Trạng thái', 'Hành động'].map(h => (
                  <TableCell key={h}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paged.map(c => (
                <TableRow key={c.id}>
                  <TableCell>{c.id}</TableCell>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.phone || '-'}</TableCell>
                  <TableCell>{c.address || '-'}</TableCell>
                  <TableCell>{c.status}</TableCell>
                  <TableCell>
                    <IconButton disabled><IconEdit size={20} /></IconButton>
                    <IconButton disabled><IconTrash size={20} /></IconButton>
                    <Button
                      size="small"
                      variant="outlined"
                      color={c.status === 'ACTIVE' ? 'error' : 'success'}
                      onClick={() => toggleStatus(c.id, c.status)}
                    >
                      {c.status === 'ACTIVE' ? 'Khóa' : 'Mở'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {paged.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">Không có khách hàng</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={2} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(customers.length / ITEMS_PER_PAGE)}
            page={page}
            onChange={(_, v) => setPage(v)}
            color="primary"
          />
        </Box>
      </CardContent>
    </Card>
  );
}
