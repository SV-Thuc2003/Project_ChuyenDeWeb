'use client';

import React, { useEffect, useState } from "react";
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
  Stack,
  CircularProgress,
} from "@mui/material";
import { IconTrash } from "@tabler/icons-react";

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  title: string;
  message: string;
  createdAt: string; // ISO format
}

const ITEMS_PER_PAGE = 10;

const ContactManagement = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; idToDelete?: number }>({ open: false });

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/contact");
      if (!res.ok) throw new Error("Failed to fetch contacts");
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
      alert("Không thể tải dữ liệu liên hệ.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const pagedMessages = messages.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const confirmDelete = (id: number) => {
    setDeleteDialog({ open: true, idToDelete: id });
  };

  const handleDelete = async () => {
    if (deleteDialog.idToDelete !== undefined) {
      try {
        const res = await fetch(`http://localhost:8080/api/contact/${deleteDialog.idToDelete}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Xoá thất bại");
        // Cập nhật lại danh sách
        setMessages((prev) => prev.filter((m) => m.id !== deleteDialog.idToDelete));
      } catch (err) {
        console.error("Lỗi khi xoá:", err);
        alert("Không thể xoá liên hệ.");
      } finally {
        setDeleteDialog({ open: false });
      }
    }
  };

  return (
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" mb={2} alignItems="center" flexWrap="wrap" gap={1}>
            <Typography variant="h6" fontWeight="bold">Quản lý hộp thư liên hệ</Typography>
          </Box>

          {loading ? (
              <Stack alignItems="center" mt={4}>
                <CircularProgress />
              </Stack>
          ) : (
              <>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Mã</TableCell>
                        <TableCell>Tên người gửi</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Tiêu đề</TableCell>
                        <TableCell>Nội dung</TableCell>
                        <TableCell>Ngày gửi</TableCell>
                        <TableCell align="center">Thao tác</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pagedMessages.map(({ id, name, email, title, message, createdAt }) => (
                          <TableRow key={id} hover>
                            <TableCell>{id}</TableCell>
                            <TableCell>{name}</TableCell>
                            <TableCell>{email}</TableCell>
                            <TableCell>{title}</TableCell>
                            <TableCell
                                sx={{
                                  maxWidth: 250,
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                                title={message}
                            >
                              {message}
                            </TableCell>
                            <TableCell>{new Date(createdAt).toLocaleDateString("vi-VN")}</TableCell>
                            <TableCell align="center">
                              <IconButton color="error" onClick={() => confirmDelete(id)}>
                                <IconTrash size={20} />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                      ))}
                      {pagedMessages.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={7} align="center">Chưa có liên hệ nào</TableCell>
                          </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Stack alignItems="center" mt={2}>
                  <Pagination
                      count={Math.ceil(messages.length / ITEMS_PER_PAGE)}
                      page={page}
                      onChange={handlePageChange}
                      color="primary"
                  />
                </Stack>
              </>
          )}

          {/* Dialog xác nhận xóa */}
          <Dialog
              open={deleteDialog.open}
              onClose={() => setDeleteDialog({ open: false })}
          >
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogContent>
              Bạn có chắc chắn muốn xóa liên hệ này không?
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

export default ContactManagement;
