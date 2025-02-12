import axios from 'axios';

const API_URL = 'https://dummyjson.com';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  images: string[];
}

const api = {
  getProducts: async (
    limit: number = 10,
    skip: number = 0,
  ): Promise<Product[]> => {
    try {
      const response = await axios.get(`${API_URL}/products`, {
        params: {
          limit,
          skip,
          select: 'title,price,description,thumbnail,images',
        },
      });
      return response.data.products;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },
};

export default api;
