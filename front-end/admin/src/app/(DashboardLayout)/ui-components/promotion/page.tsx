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

interface Promotion {
  id: number;
  title: string;
  description: string;
  discountType: "Phần trăm" | "Tiền mặt";
  discountValue: number;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  status: "Đang hoạt động" | "Đã hết hạn";
}

const initialPromotions: Promotion[] = Array.from({ length: 25 }).map((_, i) => ({
  id: i + 1,
  title: `Khuyến mãi ${i + 1}`,
  description: `Mô tả cho khuyến mãi số ${i + 1}`,
  discountType: i % 2 === 0 ? "Phần trăm" : "Tiền mặt",
  discountValue: i % 2 === 0 ? 10 + i : 10000 + i * 1000,
  startDate: "2023-01-01",
  endDate: "2023-12-31",
  status: i % 3 === 0 ? "Đang hoạt động" : "Đã hết hạn",
}));

const ITEMS_PER_PAGE = 10;

const PromotionManagement = () => {
  const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions);
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; idToDelete?: number }>({ open: false });
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    discountType: "Phần trăm" as Promotion["discountType"],
    discountValue: "",
    startDate: "",
    endDate: "",
    status: "Đang hoạt động" as Promotion["status"],
  });

  const handleOpenDialog = (promotion?: Promotion) => {
    if (promotion) {
      setEditingPromotion(promotion);
      setForm({
        title: promotion.title,
        description: promotion.description,
        discountType: promotion.discountType,
        discountValue: promotion.discountValue.toString(),
        startDate: promotion.startDate,
        endDate: promotion.endDate,
        status: promotion.status,
      });
    } else {
      setEditingPromotion(null);
      setForm({
        title: "",
        description: "",
        discountType: "Phần trăm",
        discountValue: "",
        startDate: "",
        endDate: "",
        status: "Đang hoạt động",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSave = () => {
    if (!form.title || !form.discountValue || !form.startDate || !form.endDate) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    const discountValNum = Number(form.discountValue);
    if (isNaN(discountValNum) || discountValNum <= 0) {
      alert("Giá trị khuyến mãi không hợp lệ");
      return;
    }

    if (new Date(form.startDate) > new Date(form.endDate)) {
      alert("Ngày bắt đầu phải trước ngày kết thúc");
      return;
    }

    if (editingPromotion) {
      setPromotions((prev) =>
          prev.map((p) =>
              p.id === editingPromotion.id
                  ? { ...p, ...form, discountValue: discountValNum }
                  : p
          )
      );
    } else {
      const newPromotion: Promotion = {
        id: promotions.length ? Math.max(...promotions.map(p => p.id)) + 1 : 1,
        title: form.title,
        description: form.description,
        discountType: form.discountType,
        discountValue: discountValNum,
        startDate: form.startDate,
        endDate: form.endDate,
        status: form.status,
      };
      setPromotions((prev) => [...prev, newPromotion]);
    }
    setOpenDialog(false);
  };

  const confirmDelete = (id: number) => {
    setDeleteDialog({ open: true, idToDelete: id });
  };

  const handleDelete = () => {
    if (deleteDialog.idToDelete !== undefined) {
      setPromotions((prev) => prev.filter((p) => p.id !== deleteDialog.idToDelete));
    }
    setDeleteDialog({ open: false });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const pagedPromotions = promotions.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" mb={2} alignItems="center" flexWrap="wrap" gap={1}>
            <Typography variant="h6" fontWeight="bold">Quản lý khuyến mãi</Typography>
            <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
              Thêm khuyến mãi
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Mã</TableCell>
                  <TableCell>Tiêu đề</TableCell>
                  <TableCell>Mô tả</TableCell>
                  <TableCell>Loại</TableCell>
                  <TableCell>Giá trị</TableCell>
                  <TableCell>Ngày bắt đầu</TableCell>
                  <TableCell>Ngày kết thúc</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell align="center">Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pagedPromotions.map(({ id, title, description, discountType, discountValue, startDate, endDate, status }) => (
                    <TableRow key={id}>
                      <TableCell>{id}</TableCell>
                      <TableCell>{title}</TableCell>
                      <TableCell sx={{ maxWidth: 200, whiteSpace: "normal" }}>{description}</TableCell>
                      <TableCell>{discountType}</TableCell>
                      <TableCell>{discountType === "Phần trăm" ? `${discountValue}%` : `${discountValue.toLocaleString("vi-VN")} VNĐ`}</TableCell>
                      <TableCell>{startDate}</TableCell>
                      <TableCell>{endDate}</TableCell>
                      <TableCell>{status}</TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" onClick={() => handleOpenDialog(promotions.find(p => p.id === id))}>
                          <IconEdit size={20} />
                        </IconButton>
                        <IconButton color="error" onClick={() => confirmDelete(id)}>
                          <IconTrash size={20} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                ))}
                {pagedPromotions.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={9} align="center">Chưa có khuyến mãi nào</TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Stack alignItems="center" mt={2}>
            <Pagination
                count={Math.ceil(promotions.length / ITEMS_PER_PAGE)}
                page={page}
                onChange={handlePageChange}
                color="primary"
            />
          </Stack>

          {/* Dialog thêm / sửa */}
          <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
            <DialogTitle>{editingPromotion ? "Sửa khuyến mãi" : "Thêm khuyến mãi mới"}</DialogTitle>
            <DialogContent>
              <TextField
                  label="Tiêu đề"
                  name="title"
                  value={form.title}
                  onChange={handleInputChange}
                  fullWidth
                  margin="dense"
              />
              <TextField
                  label="Mô tả"
                  name="description"
                  value={form.description}
                  onChange={handleInputChange}
                  multiline
                  rows={3}
                  fullWidth
                  margin="dense"
              />
              <FormControl fullWidth margin="dense">
                <InputLabel id="discount-type-label">Loại khuyến mãi</InputLabel>
                <Select
                    labelId="discount-type-label"
                    label="Loại khuyến mãi"
                    name="discountType"
                    value={form.discountType}
                    onChange={handleSelectChange}
                >
                  <MenuItem value="Phần trăm">Phần trăm</MenuItem>
                  <MenuItem value="Tiền mặt">Tiền mặt</MenuItem>
                </Select>
              </FormControl>
              <TextField
                  label="Giá trị khuyến mãi"
                  name="discountValue"
                  value={form.discountValue}
                  onChange={handleInputChange}
                  type="number"
                  fullWidth
                  margin="dense"
              />
              <TextField
                  label="Ngày bắt đầu"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleInputChange}
                  type="date"
                  fullWidth
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
              />
              <TextField
                  label="Ngày kết thúc"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleInputChange}
                  type="date"
                  fullWidth
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
              />
              <FormControl fullWidth margin="dense">
                <InputLabel id="status-label">Trạng thái</InputLabel>
                <Select
                    labelId="status-label"
                    label="Trạng thái"
                    name="status"
                    value={form.status}
                    onChange={handleSelectChange}
                >
                  <MenuItem value="Đang hoạt động">Đang hoạt động</MenuItem>
                  <MenuItem value="Đã hết hạn">Đã hết hạn</MenuItem>
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
          <Dialog
              open={deleteDialog.open}
              onClose={() => setDeleteDialog({ open: false })}
          >
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogContent>
              Bạn có chắc chắn muốn xóa khuyến mãi này không?
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteDialog({ open: false })}>Hủy</Button>
              <Button onClick={handleDelete} variant="contained" color="error">Xóa</Button>
            </DialogActions>
          </Dialog>
        </CardContent>
      </Card>
  );
};

export default PromotionManagement;
