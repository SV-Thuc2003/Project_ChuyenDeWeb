
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
  Pagination,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { apiGet, apiPut, apiDelete } from "@/libs/api";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  status: "ACTIVE" | "INACTIVE" | "BANNED";
}

function EditCustomerModal({
  open,
  customer,
  onClose,
  onSave,
}: {
  open: boolean;
  customer: Customer | null;
  onClose: () => void;
  onSave: (data: Partial<Customer> & { id: number }) => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || "",
        email: customer.email || "",
        phone: customer.phone || "",
        address: customer.address || "",
      });
    }
  }, [customer]);

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!customer) return;
    if (!formData.name.trim() || !formData.email.trim()) {
      alert("Tên và Email không được để trống");
      return;
    }
    onSave({ id: customer.id, ...formData });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Chỉnh sửa khách hàng</DialogTitle>
      <DialogContent>
        <TextField
          label="Tên"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={handleChange("name")}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange("email")}
        />
        <TextField
          label="Điện thoại"
          fullWidth
          margin="normal"
          value={formData.phone}
          onChange={handleChange("phone")}
        />
        <TextField
          label="Địa chỉ"
          fullWidth
          margin="normal"
          value={formData.address}
          onChange={handleChange("address")}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function CustomerManagement() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

  const [editOpen, setEditOpen] = useState(false);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);

  const openEditDialog = (customer: Customer) => {
    setEditCustomer(customer);
    setEditOpen(true);
  };

  const closeEditDialog = () => {
    setEditOpen(false);
    setEditCustomer(null);
  };

  // ① Fetch dữ liệu từ backend
  useEffect(() => {
    if (!token) return;
    apiGet<Customer[]>("/admin/customers", token)
      .then(setCustomers)
      .catch((err) => alert("Lỗi: " + err.message));
  }, [token]);

  // ② Toggle trạng thái (Active <-> Inactive)
  const toggleStatus = (id: number, current: Customer["status"]) => {
    const next = current === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    apiPut(`/admin/customers/${id}/status?status=${next}`, token)
      .then(() => {
        setCustomers((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: next } : c))
        );
      })
      .catch((err) => alert("Cập nhật thất bại: " + err.message));
  };

  const deleteCustomer = (id: number) => {
    if (!confirm("Bạn có chắc muốn xóa khách hàng này?")) return;
    apiDelete(`/admin/customers/${id}`, token)
      .then(() => {
        setCustomers((prev) => prev.filter((c) => c.id !== id));
        alert("Xóa thành công");
      })
      .catch((err) => alert("Xóa thất bại: " + err.message));
  };

  const handleSaveEdit = async (updatedData: Partial<Customer> & { id: number }) => {
    try {
      await apiPut(`/admin/customers/${updatedData.id}`, token, {
        name: updatedData.name,
        email: updatedData.email,
        phone: updatedData.phone,
        address: updatedData.address,
      });
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === updatedData.id ? { ...c, ...updatedData } : c
        )
      );
      closeEditDialog();
      alert("Cập nhật thành công");
    } catch (error: any) {
      alert("Cập nhật thất bại: " + error.message);
    }
  };

  // ③ Phân trang
  const paged = customers.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <Card>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6">Quản lý khách hàng</Typography>
        </Box>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                {[
                  "ID",
                  "Tên",
                  "Email",
                  "Điện thoại",
                  "Địa chỉ",
                  "Trạng thái",
                  "Hành động",
                ].map((h) => (
                  <TableCell key={h}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paged.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.id}</TableCell>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.phone || "-"}</TableCell>
                  <TableCell>{c.address || "-"}</TableCell>
                  <TableCell>{c.status}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => openEditDialog(c)}>
                      <IconEdit size={20} />
                    </IconButton>
                    <IconButton onClick={() => deleteCustomer(c.id)}>
                      <IconTrash size={20} />
                    </IconButton>

                    <Button
                      size="small"
                      variant="outlined"
                      color={c.status === "ACTIVE" ? "error" : "success"}
                      onClick={() => toggleStatus(c.id, c.status)}
                    >
                      {c.status === "ACTIVE" ? "Khóa" : "Mở"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {paged.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    Không có khách hàng
                  </TableCell>
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

        {/* Modal chỉnh sửa */}
        <EditCustomerModal
          open={editOpen}
          customer={editCustomer}
          onClose={closeEditDialog}
          onSave={handleSaveEdit}
        />
      </CardContent>
    </Card>
  );
}
