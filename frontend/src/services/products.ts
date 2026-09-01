import { Product } from "../utils/products_data";

const BASE_URL = "http://localhost:3000/api/product";

export interface ProductsResponse {
  total: number;
  limit: number;
  offset: number;
  data: Product[];
}

export const getProducts = async (
  limit: number = 10,
  offset: number = 0,
): Promise<ProductsResponse> => {
  const response = await fetch(`${BASE_URL}/?limit=${limit}&offset=${offset}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
  return response.json();
};

export const getProduct = async (id: string): Promise<Product> => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.statusText}`);
  }
  return response.json();
};

export const updateProduct = async (
  id: string,
  product: Partial<Product>,
): Promise<Product | null> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error(`Failed to update product: ${response.statusText}`);
  }
  return response.json();
};

export const createProduct = async (
  product: Partial<Product>,
): Promise<Product> => {
  const response = await fetch(`${BASE_URL}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error(`Failed to create product: ${response.statusText}`);
  }
  return response.json();
};

export const deleteProduct = async (id: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Failed to delete product: ${response.statusText}`);
  }
};
