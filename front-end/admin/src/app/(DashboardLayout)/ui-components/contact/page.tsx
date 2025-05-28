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
} from "@mui/material";
import { IconTrash, IconMail } from "@tabler/icons-react";

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string; // YYYY-MM-DD
  status: "Chưa đọc" | "Đã đọc";
  reply?: string;
}

const initialMessages: ContactMessage[] = Array.from({ length: 25 }).map((_, i) => ({
  id: i + 1,
  name: `Người gửi ${i + 1}`,
  email: `user${i + 1}@example.com`,
  phone: `09${Math.floor(10000000 + Math.random() * 89999999)}`,
  subject: `Tiêu đề liên hệ ${i + 1}`,
  message: `Nội dung tin nhắn mẫu số ${i + 1}. Đây là ví dụ nội dung để bạn dễ dàng phát triển sau này.`,
  date: new Date(2023, 4, 20).toLocaleDateString("vi-VN"),
  status: i % 3 === 0 ? "Đã đọc" : "Chưa đọc",
}));

const ITEMS_PER_PAGE = 10;

const ContactManagement = () => {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [page, setPage] = useState(1);

  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; idToDelete?: number }>({ open: false });
  const [replyDialog, setReplyDialog] = useState<{ open: boolean; idToReply?: number }>({ open: false });

  const [replyContent, setReplyContent] = useState("");

  // Đánh dấu đã đọc
  const markAsRead = (id: number) => {
    setMessages(prev =>
        prev.map(m => (m.id === id ? { ...m, status: "Đã đọc" } : m))
    );
  };

  // Xóa liên hệ
  const confirmDelete = (id: number) => {
    setDeleteDialog({ open: true, idToDelete: id });
  };

  const handleDelete = () => {
    if (deleteDialog.idToDelete !== undefined) {
      setMessages((prev) => prev.filter((m) => m.id !== deleteDialog.idToDelete));
    }
    setDeleteDialog({ open: false });
  };

  // Mở popup trả lời
  const handleOpenReplyDialog = (id: number) => {
    markAsRead(id);
    const message = messages.find(m => m.id === id);
    setReplyContent(message?.reply || "");
    setReplyDialog({ open: true, idToReply: id });
  };

  const handleCloseReplyDialog = () => {
    setReplyDialog({ open: false, idToReply: undefined });
  };

  // Gửi trả lời (giả lập)
  const handleSendReply = () => {
    if (!replyContent.trim()) {
      alert("Vui lòng nhập nội dung trả lời");
      return;
    }
    setMessages(prev =>
        prev.map(m =>
            m.id === replyDialog.idToReply ? { ...m, reply: replyContent, status: "Đã đọc" } : m
        )
    );
    alert("Đã gửi phản hồi");
    setReplyDialog({ open: false, idToReply: undefined });
  };

  const pagedMessages = messages.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" mb={2} alignItems="center" flexWrap="wrap" gap={1}>
            <Typography variant="h6" fontWeight="bold">Quản lý hộp thư liên hệ</Typography>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Mã</TableCell>
                  <TableCell>Tên người gửi</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Số điện thoại</TableCell>
                  <TableCell>Tiêu đề</TableCell>
                  <TableCell>Nội dung</TableCell>
                  <TableCell>Ngày gửi</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell align="center">Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pagedMessages.map(({ id, name, email, phone, subject, message, date, status }) => (
                    <TableRow key={id} hover>
                      <TableCell>{id}</TableCell>
                      <TableCell>{name}</TableCell>
                      <TableCell>{email}</TableCell>
                      <TableCell>{phone}</TableCell>
                      <TableCell>{subject}</TableCell>
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
                      <TableCell>{date}</TableCell>
                      <TableCell>{status}</TableCell>
                      <TableCell align="center">
                        <Button
                            variant="outlined"
                            size="small"
                            startIcon={<IconMail size={16} />}
                            sx={{ mr: 1 }}
                            onClick={() => handleOpenReplyDialog(id)}
                        >
                          Trả lời
                        </Button>
                        <IconButton color="error" onClick={() => confirmDelete(id)}>
                          <IconTrash size={20} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                ))}
                {pagedMessages.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={9} align="center">Chưa có liên hệ nào</TableCell>
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

          {/* Dialog trả lời */}
          <Dialog open={replyDialog.open} onClose={handleCloseReplyDialog} maxWidth="sm" fullWidth>
            <DialogTitle>Trả lời liên hệ</DialogTitle>
            <DialogContent>
              <Typography variant="subtitle2" mb={2}>
                Địa chỉ email: <b>{replyDialog.idToReply ? messages.find(m => m.id === replyDialog.idToReply)?.email : ""}</b>
              </Typography>
              <TextField
                  label="Nội dung trả lời"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  multiline
                  rows={6}
                  fullWidth
                  autoFocus
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseReplyDialog}>Hủy</Button>
              <Button onClick={handleSendReply} variant="contained" color="primary">Gửi</Button>
            </DialogActions>
          </Dialog>

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
