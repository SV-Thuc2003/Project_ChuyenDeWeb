import axios from './axios';

const BASE_URL = '/reviews';

export const createReview = async (userId: number, data: any, token: string) => {
  const response = await axios.post(`${BASE_URL}?userId=${userId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getReviewsByProduct = async (productId: number) => {
  const response = await axios.get(`${BASE_URL}/product/${productId}`);
  return response.data;
};

export const deleteReview = async (reviewId: number, userId: number, token: string) => {
  await axios.delete(`${BASE_URL}/${reviewId}?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
