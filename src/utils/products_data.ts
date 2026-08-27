export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  lastUpdated: string;
}

export const mockProducts: Product[] | [] = [
  {
    id: 'P001',
    name: 'Wireless Noise-Canceling Headphones',
    category: 'Electronics',
    price: 299.99,
    stock: 45,
    status: 'In Stock',
    lastUpdated: '2026-08-25',
  },
  {
    id: 'P002',
    name: 'Ergonomic Office Chair',
    category: 'Furniture',
    price: 189.50,
    stock: 12,
    status: 'Low Stock',
    lastUpdated: '2026-08-26',
  },
  {
    id: 'P003',
    name: 'Mechanical Gaming Keyboard',
    category: 'Electronics',
    price: 125.00,
    stock: 0,
    status: 'Out of Stock',
    lastUpdated: '2026-08-20',
  },
  {
    id: 'P004',
    name: 'Organic Green Tea, 50 bags',
    category: 'Groceries',
    price: 8.99,
    stock: 150,
    status: 'In Stock',
    lastUpdated: '2026-08-27',
  },
  {
    id: 'P005',
    name: 'Leather Weekend Bag',
    category: 'Accessories',
    price: 75.00,
    stock: 8,
    status: 'Low Stock',
    lastUpdated: '2026-08-24',
  },
];
