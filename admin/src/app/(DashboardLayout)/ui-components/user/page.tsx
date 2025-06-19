'use client';

import React, { useState } from "react";
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

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: "Quản lý" | "Nhân viên bán hàng" | "Nhân viên kỹ thuật";
  status: "Active" | "Inactive"; // Thêm trường status để quản lý trạng thái
}

const initialEmployees: Employee[] = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  name: `Nhân viên ${i + 1}`,
  email: `employee${i + 1}@example.com`,
  phone: `09${Math.floor(10000000 + Math.random() * 89999999)}`,
  role: ["Quản lý", "Nhân viên bán hàng", "Nhân viên kỹ thuật"][i % 3] as Employee["role"],
  status: i % 2 === 0 ? "Active" : "Inactive", // Khởi tạo trạng thái
}));

const ITEMS_PER_PAGE = 10;

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; idToDelete?: number }>({ open: false });
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Nhân viên bán hàng" as Employee["role"],
    status: "Active" as Employee["status"], // Thêm status vào form
  });

  // Hàm toggle trạng thái khóa/mở tài khoản
  const toggleStatus = (id: number) => {
    setEmployees(prev =>
        prev.map(e =>
            e.id === id ? { ...e, status: e.status === "Active" ? "Inactive" : "Active" } : e
        )
    );
  };

  const handleOpenDialog = (employee?: Employee) => {
    if (employee) {
      setEditingEmployee(employee);
      setForm({
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        role: employee.role,
        status: employee.status, // Load trạng thái vào form
      });
    } else {
      setEditingEmployee(null);
      setForm({
        name: "",
        email: "",
        phone: "",
        role: "Nhân viên bán hàng",
        status: "Active",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSave = () => {
    if (!form.name || !form.email || !form.phone) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("Email không hợp lệ");
      return;
    }
    const phoneRegex = /^[0-9]{9,11}$/;
    if (!phoneRegex.test(form.phone)) {
      alert("Số điện thoại không hợp lệ (9-11 số)");
      return;
    }

    if (editingEmployee) {
      setEmployees((prev) =>
          prev.map((e) =>
              e.id === editingEmployee.id ? { ...e, ...form } : e
          )
      );
    } else {
      const newEmployee: Employee = {
        id: employees.length ? Math.max(...employees.map(e => e.id)) + 1 : 1,
        name: form.name,
        email: form.email,
        phone: form.phone,
        role: form.role,
        status: form.status, // Lưu trạng thái mới
      };
      setEmployees((prev) => [...prev, newEmployee]);
    }
    setOpenDialog(false);
  };

  const confirmDelete = (id: number) => {
    setDeleteDialog({ open: true, idToDelete: id });
  };

  const handleDelete = () => {
    if (deleteDialog.idToDelete !== undefined) {
      setEmployees((prev) => prev.filter((e) => e.id !== deleteDialog.idToDelete));
    }
    setDeleteDialog({ open: false });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<Employee["role"] | Employee["status"]>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name!]: value as any }));
  };

  const pagedEmployees = employees.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" mb={2} alignItems="center" flexWrap="wrap" gap={1}>
            <Typography variant="h6" fontWeight="bold">Quản lý nhân viên</Typography>
            <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
              Thêm nhân viên
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Mã</TableCell>
                  <TableCell>Tên</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Số điện thoại</TableCell>
                  <TableCell>Vai trò</TableCell>
                  <TableCell>Trạng thái</TableCell> {/* Thêm cột trạng thái */}
                  <TableCell align="center">Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pagedEmployees.map(({ id, name, email, phone, role, status }) => (
                    <TableRow key={id}>
                      <TableCell>{id}</TableCell>
                      <TableCell>{name}</TableCell>
                      <TableCell>{email}</TableCell>
                      <TableCell>{phone}</TableCell>
                      <TableCell>{role}</TableCell>
                      <TableCell>{status}</TableCell> {/* Hiển thị trạng thái */}
                      <TableCell align="center" sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                        <IconButton color="primary" onClick={() => handleOpenDialog(employees.find(e => e.id === id))}>
                          <IconEdit size={20} />
                        </IconButton>
                        <IconButton color="error" onClick={() => confirmDelete(id)}>
                          <IconTrash size={20} />
                        </IconButton>
                        <Button
                            variant="outlined"
                            size="small"
                            color={status === "Active" ? "error" : "success"}
                            onClick={() => toggleStatus(id)}
                        >
                          {status === "Active" ? "Khóa" : "Mở"}
                        </Button>
                      </TableCell>
                    </TableRow>
                ))}
                {pagedEmployees.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} align="center">Chưa có nhân viên nào</TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Stack alignItems="center" mt={2}>
            <Pagination
                count={Math.ceil(employees.length / ITEMS_PER_PAGE)}
                page={page}
                onChange={handlePageChange}
                color="primary"
            />
          </Stack>

          {/* Dialog thêm / sửa */}
          <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
            <DialogTitle>{editingEmployee ? "Sửa nhân viên" : "Thêm nhân viên mới"}</DialogTitle>
            <DialogContent>
              <TextField
                  label="Tên"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  fullWidth
                  margin="dense"
              />
              <TextField
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  fullWidth
                  margin="dense"
              />
              <TextField
                  label="Số điện thoại"
                  name="phone"
                  value={form.phone}
                  onChange={handleInputChange}
                  fullWidth
                  margin="dense"
              />
              <FormControl fullWidth margin="dense">
                <InputLabel id="role-label">Vai trò</InputLabel>
                <Select
                    labelId="role-label"
                    label="Vai trò"
                    name="role"
                    value={form.role}
                    onChange={handleSelectChange}
                >
                  <MenuItem value="Quản lý">Quản lý</MenuItem>
                  <MenuItem value="Nhân viên bán hàng">Nhân viên bán hàng</MenuItem>
                  <MenuItem value="Nhân viên kỹ thuật">Nhân viên kỹ thuật</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="dense">
                <InputLabel id="status-label">Trạng thái</InputLabel>
                <Select
                    labelId="status-label"
                    label="Trạng thái"
                    name="status"
                    value={form.status}
                    onChange={handleSelectChange}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Hủy</Button>
              <Button onClick={handleSave} variant="contained" color="primary">Lưu</Button>
            </DialogActions>
          </Dialog>

          {/* Dialog xác nhận xóa */}
          <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false })}>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogContent>Bạn có chắc chắn muốn xóa nhân viên này không?</DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteDialog({ open: false })}>Hủy</Button>
              <Button onClick={handleDelete} variant="contained" color="error">Xóa</Button>
            </DialogActions>
          </Dialog>
        </CardContent>
      </Card>
  );
};

export default EmployeeManagement;


// 'use client';
// import { useState, useEffect } from 'react';
// import {
//   Box, Button, Card, CardContent, Table,
//   TableBody, TableCell, TableContainer,
//   TableHead, TableRow, Typography, Pagination,
//   IconButton
// } from "@mui/material";
// import { IconEdit, IconTrash } from "@tabler/icons-react";
// import { apiGet, apiPut } from '../../service/api';

// interface Customer {
//   id: number;
//   name: string;
//   email: string;
//   phone?: string;
//   address?: string;
//   status: 'ACTIVE' | 'INACTIVE' | 'BANNED';
// }

// export default function EmployeeManagement() {
//   const [customers, setCustomers] = useState<Customer[]>([]);
//   const [page, setPage] = useState(1);
//   const ITEMS_PER_PAGE = 10;

//   const token = typeof window !== 'undefined'
//     ? localStorage.getItem('token') || ''
//     : '';

//   useEffect(() => {
//     if (!token) return;
//     apiGet<Customer[]>('/api/admin/customers', token)
//       .then(setCustomers)
//       .catch(err => {
//         console.error(err);
//         alert('Không thể lấy dữ liệu khách hàng');
//       });
//   }, [token]);

//   const toggleStatus = (id: number, current: Customer['status']) => {
//     const next = current === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
//     apiPut(`/api/admin/customers/${id}/status?status=${next}`, token)
//       .then(() => {
//         setCustomers(prev =>
//           prev.map(c => c.id === id ? { ...c, status: next } : c)
//         );
//       })
//       .catch(err => {
//         console.error(err);
//         alert('Cập nhật trạng thái thất bại');
//       });
//   };

//   const paged = customers.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

//   return (
//     <Card>
//       <CardContent>
//         <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//           <Typography variant="h6">Quản lý khách hàng</Typography>
//         </Box>
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>ID</TableCell>
//                 <TableCell>Tên</TableCell>
//                 <TableCell>Email</TableCell>
//                 <TableCell>Điện thoại</TableCell>
//                 <TableCell>Địa chỉ</TableCell>
//                 <TableCell>Trạng thái</TableCell>
//                 <TableCell align="center">Hành động</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paged.map(c => (
//                 <TableRow key={c.id}>
//                   <TableCell>{c.id}</TableCell>
//                   <TableCell>{c.name}</TableCell>
//                   <TableCell>{c.email}</TableCell>
//                   <TableCell>{c.phone || '-'}</TableCell>
//                   <TableCell>{c.address || '-'}</TableCell>
//                   <TableCell>{c.status}</TableCell>
//                   <TableCell align="center">
//                     {/* Edit/Delete nếu muốn mở rộng */}
//                     <IconButton disabled><IconEdit /></IconButton>
//                     <IconButton disabled><IconTrash /></IconButton>
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       color={c.status === 'ACTIVE' ? 'error' : 'success'}
//                       onClick={() => toggleStatus(c.id, c.status)}
//                     >
//                       {c.status === 'ACTIVE' ? 'Khóa' : 'Mở'}
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//               {paged.length === 0 && (
//                 <TableRow>
//                   <TableCell colSpan={7} align="center">Không có khách hàng</TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <Box mt={2} display="flex" justifyContent="center">
//           <Pagination
//             count={Math.ceil(customers.length / ITEMS_PER_PAGE)}
//             page={page}
//             onChange={(_, v) => setPage(v)}
//           />
//         </Box>
//       </CardContent>
//     </Card>
//   );
// }
