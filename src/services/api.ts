import axios from 'axios';

const API_URL = 'http://localhost:3000';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  thumbnail: string;
}

export interface Banner {
  id: number;
  image: string;
  title: string;
}

export interface CartItem extends Product {
  quantity: number;
}

var instance = axios.create({
  baseURL: API_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json"
  }
});

const api = {
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await instance.get(`${API_URL}/products`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  getBanners: async (): Promise<Banner[]> => {
    try {
      const response = await instance.get(`${API_URL}/banners`);
      return response.data;
    } catch (error) {
      console.error('Error fetching banners:', error);
      return [];
    }
  },
};

export default api;
