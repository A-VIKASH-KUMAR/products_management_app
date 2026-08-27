import { useState } from 'react';
import { mockProducts } from '../utils/products_data';

const getNextProductId = () => {
  const numericIds = mockProducts
    .map((product) => Number(String(product.id).match(/\d+/)?.[0] ?? 0))
    .filter((value) => Number.isFinite(value));

  const latestId = numericIds.length > 0 ? Math.max(...numericIds) : 100;
  const nextId = latestId + 1;
  const padded = String(nextId).padStart(3, '0');
  return `P${padded}`;
};

export const AddProduct: React.FC = () => {
  const [formData, setFormData] = useState({
    id: getNextProductId(),
    name: '',
    category: '',
    price: '',
    stock: '',
    status: 'In Stock',
    lastUpdated: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add logic to save the product
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="border p-2 bg-gray-50 rounded">
          <label className="block text-sm text-gray-600 mb-1">Generated Product ID</label>
          <div className="font-medium">{formData.id}</div>
        </div>
        <input name="name" placeholder="Name" onChange={handleChange} className="border p-2" required />
        <input name="category" placeholder="Category" onChange={handleChange} className="border p-2" required />
        <input name="price" type="number" placeholder="Price" onChange={handleChange} className="border p-2" required />
        <input name="stock" type="number" placeholder="Stock" onChange={handleChange} className="border p-2" required />
        <select name="status" onChange={handleChange} className="border p-2">
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
          <option value="Discontinued">Discontinued</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Product</button>
      </div>
    </form>
  );
};
