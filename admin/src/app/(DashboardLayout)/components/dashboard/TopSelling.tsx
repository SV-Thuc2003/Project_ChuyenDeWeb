import React from "react";
import {
  Box,
  CardContent,
  Card,
  Typography,
  Stack,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { IconTrendingUp } from "@tabler/icons-react";

const products = [
  {
    id: 1,
    name: "Sản phẩm A",
    image: "/contact/products/customer-a.jpg",
    sales: "1,200",
    category: "Điện tử",
  },
  {
    id: 2,
    name: "Sản phẩm B",
    image: "/contact/products/customer-b.jpg",
    sales: "980",
    category: "Thời trang",
  },
  {
    id: 3,
    name: "Sản phẩm C",
    image: "/contact/products/customer-c.jpg",
    sales: "870",
    category: "Gia dụng",
  },
  {
    id: 4,
    name: "Sản phẩm D",
    image: "/contact/products/customer-d.jpg",
    sales: "750",
    category: "Đồ chơi",
  },
];

const TopSellingProductsCard = () => {
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
            {products.map((product) => (
                <ListItem key={product.id} disableGutters divider>
                  <ListItemAvatar>
                    <Avatar
                        variant="rounded"
                        src={product.image}
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
                            {product.category}
                          </Typography>
                          <Typography
                              variant="body2"
                              color="primary.main"
                              fontWeight={700}
                          >
                            {product.sales} bán ra
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

export default TopSellingProductsCard;
