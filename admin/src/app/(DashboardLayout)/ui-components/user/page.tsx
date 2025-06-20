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
import { apiGet, apiPut, apiDelete, apiPost } from "@/libs/user";

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: "Quản lý" | "Nhân viên bán hàng" | "Nhân viên kỹ thuật";
  status: "Active" | "Inactive";
}

const ITEMS_PER_PAGE = 10;

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; idToDelete?: number }>({ open: false });
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Nhân viên bán hàng" as Employee["role"],
    status: "Active" as Employee["status"],
  });

  const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

  useEffect(() => {
    if (!token) return;
    const fetchEmployees = async () => {
      try {
        const data = await apiGet<Employee[]>("/admin/employees", token);
        setEmployees(data);
      } catch (error: any) {
        alert("Lỗi khi tải danh sách nhân viên: " + (error.message || error));
      }
    };
    fetchEmployees();
  }, [token]);

  const handleOpenDialog = (employee?: Employee) => {
    if (employee) {
      setEditingEmployee(employee);
      setForm({
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        role: employee.role,
        status: employee.status,
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

  const handleCloseDialog = () => setOpenDialog(false);

  const confirmDelete = (id: number) => setDeleteDialog({ open: true, idToDelete: id });

  const handleDelete = async () => {
    if (deleteDialog.idToDelete === undefined) return;
    try {
      await apiDelete(`/admin/employees/${deleteDialog.idToDelete}`, token);
      setEmployees((prev) => prev.filter((e) => e.id !== deleteDialog.idToDelete));
      setDeleteDialog({ open: false });
      alert("Xóa nhân viên thành công");
    } catch (error: any) {
      alert("Lỗi khi xóa nhân viên: " + (error.message || error));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name!]: value,
    }));
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
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

    try {
      if (editingEmployee) {
        await apiPut(`/admin/employees/${editingEmployee.id}`, token, form);
        setEmployees((prev) =>
          prev.map((e) => (e.id === editingEmployee.id ? { ...e, ...form } : e))
        );
        alert("Cập nhật nhân viên thành công");
      } else {
        await apiPost(`/admin/employees`, token, form);
        const updatedList = await apiGet<Employee[]>("/admin/employees", token);
        setEmployees(updatedList);
        alert("Thêm nhân viên thành công");
      }
      setOpenDialog(false);
    } catch (error: any) {
      alert("Lỗi khi lưu nhân viên: " + (error.message || error));
    }
  };

  const toggleStatus = async (id: number) => {
    const emp = employees.find((e) => e.id === id);
    if (!emp) return;
    const newStatus = emp.status === "Active" ? "Inactive" : "Active";

    try {
      await apiPut(`/admin/employees/${id}/status`, token, { status: newStatus });
      setEmployees((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
      );
      alert(`Đã chuyển trạng thái nhân viên thành "${newStatus}"`);
    } catch (error: any) {
      alert("Lỗi khi đổi trạng thái: " + (error.message || error));
    }
  };

  const pagedEmployees = employees.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => setPage(value);

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap" gap={1}>
          <Typography variant="h6" fontWeight="bold">Quản lý nhân viên</Typography>
          <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
            Thêm nhân viên
          </Button>
        </Box>

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Mã</TableCell>
                <TableCell>Tên</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Vai trò</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pagedEmployees.length ? (
                pagedEmployees.map(({ id, name, email, phone, role, status }) => (
                  <TableRow key={id}>
                    <TableCell>{id}</TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{email}</TableCell>
                    <TableCell>{phone}</TableCell>
                    <TableCell>{role}</TableCell>
                    <TableCell>{status}</TableCell>
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    Chưa có nhân viên nào
                  </TableCell>
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
            <Button onClick={handleSave} variant="contained" color="primary">
              Lưu
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog xác nhận xóa */}
        <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false })}>
          <DialogTitle>Xác nhận xóa</DialogTitle>
          <DialogContent>Bạn có chắc chắn muốn xóa nhân viên này không?</DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialog({ open: false })}>Hủy</Button>
            <Button onClick={handleDelete} variant="contained" color="error">
              Xóa
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
}
