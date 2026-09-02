import { Product } from "../utils/products_data";

const BASE_URL = "http://localhost:3000/api/product";

export interface ProductsResponse {
  total: number;
  limit: number;
  offset: number;
  data: Product[];
}

export interface GetProductsParams {
  limit?: number;
  offset?: number;
  search?: string;
  category?: string;
  status?: string;
}

export const getProducts = async (
  params: GetProductsParams = {},
): Promise<ProductsResponse> => {
  const { limit = 10, offset = 0, search, category, status } = params;
  const query = new URLSearchParams();
  query.set("limit", String(limit));
  query.set("offset", String(offset));
  if (search) query.set("search", search);
  if (category) query.set("category", category);
  if (status) query.set("status", status);
  const response = await fetch(`${BASE_URL}/?${query.toString()}`);
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
