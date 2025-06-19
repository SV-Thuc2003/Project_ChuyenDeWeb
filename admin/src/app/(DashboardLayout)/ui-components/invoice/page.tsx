'use client';
import React, { useEffect, useState } from 'react';
import {
    Card, CardContent, Typography, Table, TableHead, TableRow, TableCell,
    TableBody, TableContainer, Box, Stack, Pagination, IconButton, Dialog,
    DialogTitle, DialogContent, DialogActions, Button, Select,
    MenuItem, FormControl, InputLabel
} from '@mui/material';
import { IconEdit } from '@tabler/icons-react';

interface User {
    id: number;
    name: string;
}

interface OrderStatus {
    id: number;
    statusName: string;
}

interface Order {
    id: number;
    user: User;
    totalInvoice: number;
    status: OrderStatus;
    createdAt: string;
}

const ITEMS_PER_PAGE = 10;

const OrderManagement = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [page, setPage] = useState(1);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
    const [statusOptions, setStatusOptions] = useState<OrderStatus[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/orders')
            .then(res => res.ok ? res.json() : Promise.reject('Failed to load orders'))
            .then(data => setOrders(data))
            .catch(err => console.error('Fetch orders error:', err));

        fetch('http://localhost:8080/api/order-statuses')
            .then(res => res.ok ? res.json() : Promise.reject('Failed to load statuses'))
            .then(data => setStatusOptions(data))
            .catch(err => console.error('Fetch statuses error:', err));
    }, []);

    const pagedOrders = orders.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    const handlePageChange = (_: unknown, value: number) => setPage(value);

    const openEditDialog = (order: Order) => {
        setCurrentOrder(order);
        setEditDialogOpen(true);
    };

    const handleStatusChange = (e: any) => {
        if (!currentOrder) return;
        const statusId = parseInt(e.target.value);
        const selectedStatus = statusOptions.find(s => s.id === statusId);
        if (selectedStatus) {
            setCurrentOrder({ ...currentOrder, status: selectedStatus });
        }
    };

    const handleSaveOrder = () => {
        if (!currentOrder) return;
        fetch(`http://localhost:8080/api/orders/${currentOrder.id}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ statusId: currentOrder.status.id })
        })
            .then(res => res.ok ? res.json() : Promise.reject('Failed to update order'))
            .then(updated => {
                setOrders(prev => prev.map(o => o.id === updated.id ? updated : o));
                setEditDialogOpen(false);
            })
            .catch(err => console.error('Update order status error:', err));
    };

    return (
        <Card>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight="bold">Quản lý đơn hàng</Typography>
                </Box>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Mã</TableCell>
                                <TableCell>Khách hàng</TableCell>
                                <TableCell>Ngày tạo</TableCell>
                                <TableCell>Trạng thái</TableCell>
                                <TableCell>Tổng tiền</TableCell>
                                <TableCell>Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pagedOrders.map(order => (
                                <TableRow key={order.id}>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>{order.user.name}</TableCell>
                                    <TableCell>
                                        {new Date(order.createdAt).toLocaleTimeString('vi-VN')}<br />
                                        {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                                    </TableCell>
                                    <TableCell>{order.status.statusName}</TableCell>
                                    <TableCell>{order.totalInvoice.toLocaleString('vi-VN')}₫</TableCell>
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => openEditDialog(order)}>
                                            <IconEdit size={20} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {pagedOrders.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">Chưa có đơn hàng nào</TableCell>
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

                <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
                    <DialogTitle>Cập nhật trạng thái đơn hàng</DialogTitle>
                    <DialogContent>
                        <FormControl fullWidth margin="dense">
                            <InputLabel>Trạng thái</InputLabel>
                            <Select
                                value={currentOrder?.status.id || ''}
                                label="Trạng thái"
                                onChange={handleStatusChange}
                            >
                                {Array.isArray(statusOptions) && statusOptions.map(status => (
                                    <MenuItem key={status.id} value={status.id}>{status.statusName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setEditDialogOpen(false)}>Hủy</Button>
                        <Button onClick={handleSaveOrder} variant="contained">Lưu</Button>
                    </DialogActions>
                </Dialog>
            </CardContent>
        </Card>
    );
};

export default OrderManagement;
