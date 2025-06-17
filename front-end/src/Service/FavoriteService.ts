// import axios from 'axios';
import axios from './axios';

// const BASE_URL = 'http://localhost:8080/api/favorites';
const BASE_URL = '/favorites';

export const addFavorite = async (userId: number, productId: number): Promise<void> => {
  await axios.post(`${BASE_URL}`, null, {
    params: { userId, productId }
  });
};

export const removeFavorite = async (userId: number, productId: number): Promise<void> => {
  await axios.delete(`${BASE_URL}`, {
    params: { userId, productId }
  });
};

export const getFavorites = async (userId: number): Promise<number[]> => {
  const response = await axios.get(`${BASE_URL}/${userId}`);
  const data = response.data;

  if (Array.isArray(data)) {
    return data.map((favorite: any) => favorite.product.id);
  }

  console.warn('Expected an array but got:', data);
  return [];
};

// export const getFavorites = async (userId: number): Promise<number[]> => {
//   const response = await axios.get(`${BASE_URL}/${userId}`);
//   return response.data.map((favorite: any) => favorite.product.id); // trả về danh sách productId
// };
