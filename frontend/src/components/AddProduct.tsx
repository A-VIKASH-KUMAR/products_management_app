import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockProducts } from "../utils/products_data";
import { createProduct } from "../services/products";

type NewProduct = {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: string;
  status: string;
  lastUpdated: string;
};

const getNextProductId = () => {
  const numericIds = mockProducts
    .map((product) => Number(String(product.id).match(/\d+/)?.[0] ?? 0))
    .filter((value) => Number.isFinite(value));

  const latestId = numericIds.length > 0 ? Math.max(...numericIds) : 100;
  const nextId = latestId + 1;
  const padded = String(nextId).padStart(3, "0");
  return `P${padded}`;
};

export const AddProduct: React.FC<{
  onProductAdded?: (product: NewProduct) => void;
}> = ({ onProductAdded }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: getNextProductId(),
    name: "",
    category: "",
    price: "",
    stock: "",
    status: "In Stock",
    lastUpdated: new Date().toISOString().split("T")[0],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await createProduct({
        name: formData.name,
        category: formData.category,
        price: formData.price,
        stock: formData.stock,
        status: formData.status,
      });
      mockProducts.push({
        id: created.id || formData.id,
        name: created.name,
        category: created.category,
        price: created.price,
        stock: created.stock,
        status: created.status,
        lastUpdated: new Date().toISOString().split("T")[0],
      });
      onProductAdded?.(formData);
      navigate("/");
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="border p-2 bg-gray-50 rounded">
          <label className="block text-sm text-gray-600 mb-1">
            Generated Product ID
          </label>
          <div className="font-medium">{formData.id}</div>
        </div>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="border p-2"
          required
        />
        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
          className="border p-2"
          required
        />
        <input
          name="price"
          type="number"
          min="0.1"
          step="0.01"
          placeholder="Price"
          onChange={handleChange}
          onInvalid={(e) => {
            const target = e.target as HTMLInputElement;
            if (target.validity.rangeUnderflow) {
              target.setCustomValidity("Price must be at least 0.1");
            } else if (target.validity.valueMissing) {
              target.setCustomValidity("Price is required");
            } else {
              target.setCustomValidity("");
            }
          }}
          onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
          className="border p-2"
          required
        />
        <input
          name="stock"
          type="number"
          min="0"
          step="1"
          placeholder="Stock"
          onChange={handleChange}
          onInvalid={(e) => {
            const target = e.target as HTMLInputElement;
            if (target.validity.rangeUnderflow) {
              target.setCustomValidity("Stock cannot be negative");
            } else if (target.validity.valueMissing) {
              target.setCustomValidity("Stock is required");
            } else {
              target.setCustomValidity("");
            }
          }}
          onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
          className="border p-2"
          required
        />
        <select name="status" onChange={handleChange} className="border p-2">
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
          <option value="Discontinued">Discontinued</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded cursor-default hover:cursor-pointer">
          Add Product
        </button>
      </div>
    </form>
  );
};
