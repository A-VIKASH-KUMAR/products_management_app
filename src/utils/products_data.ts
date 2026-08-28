export interface Product {
  id: string;
  name: string;
  category: string;
  price: number | string;
  stock: number | string;
  status: string;
  lastUpdated: string;
}

export const mockProducts: Product[] = [
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
  { id: 'P006', name: 'Smart Watch Series 5', category: 'Electronics', price: 399.99, stock: 20, status: 'In Stock', lastUpdated: '2026-08-27' },
  { id: 'P007', name: 'Cotton T-Shirt', category: 'Apparel', price: 19.99, stock: 100, status: 'In Stock', lastUpdated: '2026-08-25' },
  { id: 'P008', name: 'Running Shoes', category: 'Apparel', price: 89.99, stock: 50, status: 'In Stock', lastUpdated: '2026-08-26' },
  { id: 'P009', name: 'Coffee Maker', category: 'Home', price: 49.99, stock: 15, status: 'Low Stock', lastUpdated: '2026-08-24' },
  { id: 'P010', name: 'Blender', category: 'Home', price: 59.99, stock: 30, status: 'In Stock', lastUpdated: '2026-08-23' },
  { id: 'P011', name: 'Gaming Mouse', category: 'Electronics', price: 45.00, stock: 60, status: 'In Stock', lastUpdated: '2026-08-27' },
  { id: 'P012', name: 'Desk Lamp', category: 'Home', price: 30.00, stock: 25, status: 'In Stock', lastUpdated: '2026-08-25' },
  { id: 'P013', name: 'Bluetooth Speaker', category: 'Electronics', price: 55.00, stock: 40, status: 'In Stock', lastUpdated: '2026-08-26' },
  { id: 'P014', name: 'Yoga Mat', category: 'Sports', price: 25.00, stock: 0, status: 'Out of Stock', lastUpdated: '2026-08-20' },
  { id: 'P015', name: 'Water Bottle', category: 'Sports', price: 15.00, stock: 80, status: 'In Stock', lastUpdated: '2026-08-27' },
  { id: 'P016', name: 'Backpack', category: 'Accessories', price: 35.00, stock: 12, status: 'Low Stock', lastUpdated: '2026-08-26' },
  { id: 'P017', name: 'Sun Glasses', category: 'Accessories', price: 120.00, stock: 10, status: 'Low Stock', lastUpdated: '2026-08-25' },
  { id: 'P018', name: 'Notebook', category: 'Stationery', price: 5.00, stock: 200, status: 'In Stock', lastUpdated: '2026-08-27' },
  { id: 'P019', name: 'Pen Set', category: 'Stationery', price: 10.00, stock: 150, status: 'In Stock', lastUpdated: '2026-08-27' },
  { id: 'P020', name: 'Headphones Case', category: 'Accessories', price: 15.00, stock: 60, status: 'In Stock', lastUpdated: '2026-08-26' },
  { id: 'P021', name: 'Phone Charger', category: 'Electronics', price: 20.00, stock: 100, status: 'In Stock', lastUpdated: '2026-08-27' },
  { id: 'P022', name: 'Wall Clock', category: 'Home', price: 25.00, stock: 20, status: 'In Stock', lastUpdated: '2026-08-25' },
  { id: 'P023', name: 'Throw Pillow', category: 'Home', price: 15.00, stock: 50, status: 'In Stock', lastUpdated: '2026-08-24' },
  { id: 'P024', name: 'Table Runner', category: 'Home', price: 20.00, stock: 35, status: 'In Stock', lastUpdated: '2026-08-23' },
  { id: 'P025', name: 'Hand Towel', category: 'Home', price: 8.00, stock: 120, status: 'In Stock', lastUpdated: '2026-08-27' },
];
