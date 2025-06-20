'use client';
import React, { useEffect, useState } from 'react';
import {
  Box, CardContent, Card, Typography, Stack,
  Avatar, List, ListItem, ListItemAvatar, ListItemText,
} from '@mui/material';
import { IconTrendingUp } from '@tabler/icons-react';

const TopSellingProducts = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/admin/top-selling')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setProducts(data);
          } else if (Array.isArray(data.products)) {
            setProducts(data.products);
          } else {
            console.error('Top-selling API không trả về mảng:', data);
            setProducts([]);
          }
        })
        .catch(error => {
          console.error('Lỗi khi gọi API top-selling:', error);
          setProducts([]);
        });
  }, []);

  return (
      <Card variant="outlined" sx={{ p: 0 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <IconTrendingUp width={22} />
            <Typography variant="h6" fontWeight="bold">
              Top sản phẩm bán chạy nhất
            </Typography>
          </Stack>
          <List>
            {Array.isArray(products) &&
                products.map((product, index) => (
                    <ListItem key={index} disableGutters divider>
                      <ListItemAvatar>
                        <Avatar
                            variant="rounded"
                            src={product.imageUrl || '/placeholder.png'}
                            alt={product.name}
                            sx={{ width: 56, height: 56, mr: 2 }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                          primary={
                            <Typography variant="subtitle1" fontWeight={600}>
                              {product.name}
                            </Typography>
                          }
                          secondary={
                            <>
                              <Typography variant="body2" color="text.secondary">
                                {product.category || 'Không rõ danh mục'}
                              </Typography>
                              <Typography variant="body2" color="primary.main" fontWeight={700}>
                                {product.totalSold} bán ra
                              </Typography>
                            </>
                          }
                      />
                    </ListItem>
                ))}
          </List>
        </CardContent>
      </Card>
  );
};

export default TopSellingProducts;
