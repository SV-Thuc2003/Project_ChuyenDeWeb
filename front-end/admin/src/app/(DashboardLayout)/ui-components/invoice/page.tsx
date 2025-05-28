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

interface Order {
    id: number;
    customerName: string;
    productName: string;
    quantity: number;
    totalPrice: number;
    status: "Chờ xử lý" | "Đang giao" | "Đã giao" | "Đã hủy";
    address: string;
}

const initialOrders: Order[] = Array.from({ length: 50 }).map((_, i) => ({
    id: i + 1,
    customerName: `Khách hàng ${i + 1}`,
    productName: `Máy lọc nước ${String.fromCharCode(65 + (i % 26))}`,
    quantity: Math.floor(Math.random() * 5) + 1,
    totalPrice: (2000000 + (i % 20) * 50000) * (Math.floor(Math.random() * 5) + 1),
    status: ["Chờ xử lý", "Đang giao", "Đã giao", "Đã hủy"][i % 4] as Order["status"],
    address: `Địa chỉ khách hàng ${i + 1}`,
}));

const ITEMS_PER_PAGE = 10;

const OrderManagement = () => {
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [page, setPage] = useState(1);
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; idToDelete?: number }>({ open: false });
    const [editingOrder, setEditingOrder] = useState<Order | null>(null);
    const [form, setForm] = useState({
        customerName: "",
        productName: "",
        quantity: "",
        totalPrice: "",
        status: "Chờ xử lý" as Order["status"],
        address: "",
    });

    const handleOpenDialog = (order?: Order) => {
        if (order) {
            setEditingOrder(order);
            setForm({
                customerName: order.customerName,
                productName: order.productName,
                quantity: order.quantity.toString(),
                totalPrice: order.totalPrice.toString(),
                status: order.status,
                address: order.address,
            });
        } else {
            setEditingOrder(null);
            setForm({
                customerName: "",
                productName: "",
                quantity: "",
                totalPrice: "",
                status: "Chờ xử lý",
                address: "",
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSave = () => {
        if (!form.customerName || !form.productName || !form.quantity || !form.totalPrice || !form.address) {
            alert("Vui lòng điền đầy đủ thông tin bắt buộc");
            return;
        }
        const quantityNum = Number(form.quantity);
        const totalPriceNum = Number(form.totalPrice);
        if (isNaN(quantityNum) || quantityNum <= 0) {
            alert("Số lượng không hợp lệ");
            return;
        }
        if (isNaN(totalPriceNum) || totalPriceNum <= 0) {
            alert("Tổng tiền không hợp lệ");
            return;
        }

        if (editingOrder) {
            setOrders((prev) =>
                prev.map((o) =>
                    o.id === editingOrder.id
                        ? { ...o, ...form, quantity: quantityNum, totalPrice: totalPriceNum }
                        : o
                )
            );
        } else {
            const newOrder: Order = {
                id: orders.length ? Math.max(...orders.map(o => o.id)) + 1 : 1,
                customerName: form.customerName,
                productName: form.productName,
                quantity: quantityNum,
                totalPrice: totalPriceNum,
                status: form.status,
                address: form.address,
            };
            setOrders((prev) => [...prev, newOrder]);
        }
        setOpenDialog(false);
    };

    const confirmDelete = (id: number) => {
        setDeleteDialog({ open: true, idToDelete: id });
    };

    const handleDelete = () => {
        if (deleteDialog.idToDelete !== undefined) {
            setOrders((prev) => prev.filter((o) => o.id !== deleteDialog.idToDelete));
        }
        setDeleteDialog({ open: false });
    };

    // Handle TextField change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    // Handle Select change separately
    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const pagedOrders = orders.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <Card>
            <CardContent>
                <Box display="flex" justifyContent="space-between" mb={2} alignItems="center" flexWrap="wrap" gap={1}>
                    <Typography variant="h6" fontWeight="bold">Quản lý đơn hàng</Typography>
                    <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
                        Thêm đơn hàng
                    </Button>
                </Box>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Mã</TableCell>
                                <TableCell>Khách hàng</TableCell>
                                <TableCell>Sản phẩm</TableCell>
                                <TableCell>Số lượng</TableCell>
                                <TableCell>Tổng tiền (VNĐ)</TableCell>
                                <TableCell>Trạng thái</TableCell>
                                <TableCell>Địa chỉ</TableCell>
                                <TableCell align="center">Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pagedOrders.map(({ id, customerName, productName, quantity, totalPrice, status, address }) => (
                                <TableRow key={id}>
                                    <TableCell>{id}</TableCell>
                                    <TableCell>{customerName}</TableCell>
                                    <TableCell>{productName}</TableCell>
                                    <TableCell>{quantity}</TableCell>
                                    <TableCell>{totalPrice.toLocaleString("vi-VN")}</TableCell>
                                    <TableCell>{status}</TableCell>
                                    <TableCell sx={{ maxWidth: 200, whiteSpace: "normal" }}>{address}</TableCell>
                                    <TableCell align="center">
                                        <IconButton color="primary" onClick={() => handleOpenDialog(orders.find(o => o.id === id))}>
                                            <IconEdit size={20} />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => confirmDelete(id)}>
                                            <IconTrash size={20} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {pagedOrders.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={8} align="center">Chưa có đơn hàng nào</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Stack alignItems="center" mt={2}>
                    <Pagination
                        count={Math.ceil(orders.length / ITEMS_PER_PAGE)}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Stack>

                {/* Dialog thêm / sửa */}
                <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                    <DialogTitle>{editingOrder ? "Sửa đơn hàng" : "Thêm đơn hàng mới"}</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Tên khách hàng"
                            name="customerName"
                            value={form.customerName}
                            onChange={handleInputChange}
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            label="Tên sản phẩm"
                            name="productName"
                            value={form.productName}
                            onChange={handleInputChange}
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            label="Số lượng"
                            name="quantity"
                            value={form.quantity}
                            onChange={handleInputChange}
                            type="number"
                            fullWidth
                            margin="dense"
                        />
                        <TextField
                            label="Tổng tiền (VNĐ)"
                            name="totalPrice"
                            value={form.totalPrice}
                            onChange={handleInputChange}
                            type="number"
                            fullWidth
                            margin="dense"
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
                                <MenuItem value="Chờ xử lý">Chờ xử lý</MenuItem>
                                <MenuItem value="Đang giao">Đang giao</MenuItem>
                                <MenuItem value="Đã giao">Đã giao</MenuItem>
                                <MenuItem value="Đã hủy">Đã hủy</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Địa chỉ"
                            name="address"
                            value={form.address}
                            onChange={handleInputChange}
                            multiline
                            rows={3}
                            fullWidth
                            margin="dense"
                        />
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
                        Bạn có chắc chắn muốn xóa đơn hàng này không?
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

export default OrderManagement;
