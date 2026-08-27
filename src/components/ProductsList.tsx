import { useState, useEffect } from "react";
import { fetchProductsData } from "../services/products";
import { Product } from "../utils/products_data";
export const ProductsList = () => {
  const [productList, setProductList] = useState(Array<Product>);

  useEffect(() => {
    const getProductsData = () => {
      const data = fetchProductsData();
      setProductList(data);
    };
    getProductsData()
  }, []);
  const CELL_CLASSES = "py-3 px-4 border-b text-left";
  const STATUS_COLORS: Record<string, string> = {
    "In Stock": "bg-green-100 text-green-800",
    "Low Stock": "bg-yellow-100 text-yellow-800",
    "Out of Stock": "bg-red-100 text-red-800",
  };

  const columns = [
    { label: "Name", key: "name", render: (p: Product) => p.name },
    { label: "Price", key: "price", render: (p: Product) => `$${p.price.toFixed(2)}` },
    { label: "Category", key: "category", render: (p: Product) => p.category },
    { label: "Status", key: "status", render: (p: Product) => (
      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${STATUS_COLORS[p.status] || "bg-gray-100 text-gray-800"}`}>
        {p.status}
      </span>
    )},
    { label: "Stock", key: "stock", render: (p: Product) => p.stock },
    { label: "Last Updated", key: "lastUpdated", render: (p: Product) => p.lastUpdated },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => <th key={col.key} className={CELL_CLASSES}>{col.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {productList.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col.key} className={CELL_CLASSES}>{col.render(product)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
