import { useState, useEffect } from "react";
import { fetchProductsData } from "../services/products";
import { mockProducts, Product } from "../utils/products_data";
import { EditProductModal } from "./EditProductModal";
import { ViewProductModal } from "./ViewProduct";

export const ProductsList = () => {
  const [productList, setProductList] = useState(Array<Product>);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [filteredProducts, setFilteredProducts] = useState(Array<Product>);

  useEffect(() => {
    const getProductsData = () => {
      const data = fetchProductsData();
      setProductList(data);
      setFilteredProducts(data);
    };
    getProductsData();
  }, []);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };
  const CELL_CLASSES = "py-3 px-4 border-b text-left";
  const categories = Array.from(new Set(productList.map((p) => p.category)));
  const statuses = Array.from(new Set(productList.map((p) => p.status)));

  const STATUS_COLORS: Record<string, string> = {
    "In Stock": "bg-green-100 text-green-800",
    "Low Stock": "bg-yellow-100 text-yellow-800",
    "Out of Stock": "bg-red-100 text-red-800",
  };

  const columns = [
    { label: "Name", key: "name", render: (p: Product) => p.name },
    { label: "Price", key: "price", render: (p: Product) => `$${p.price}` },
    { label: "Category", key: "category", render: (p: Product) => p.category },
    {
      label: "Status",
      key: "status",
      render: (p: Product) => (
        <span
          className={`inline-block px-2 py-1 rounded text-xs font-semibold ${STATUS_COLORS[p.status] || "bg-gray-100 text-gray-800"}`}
        >
          {p.status}
        </span>
      ),
    },
    { label: "Stock", key: "stock", render: (p: Product) => p.stock },
    {
      label: "Last Updated",
      key: "lastUpdated",
      render: (p: Product) => p.lastUpdated,
    },
    {
      label: "Actions",
      key: "actions",
      render: (p: Product) => (
        <div className="flex gap-2">
          <button
            className="text-blue-500 hover:text-blue-700 font-medium"
            onClick={(e) => {
              e.stopPropagation();
              setEditingProduct(p);
            }}
          >
            Edit
          </button>
          <button
            className="text-red-500 hover:text-red-700 font-medium"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(p.id);
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleDelete = (id: string) => {
    setProductList(productList.filter((p) => p.id !== id));
  };

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return " ↕";
    }
    return sortConfig.direction === "asc" ? " ↑" : " ↓";
  };

  const handleSave = (updatedProduct: Product) => {
    setProductList(
      productList.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
    );
    setEditingProduct(null);
  };

  const applyFilters = () => {
    let filtered = productList;
    if (searchText) {
      const query = searchText.trim().toLowerCase();
      filtered = filtered.filter((product) =>
        [product.name, product.category, product.status].some((value) =>
          value.toLowerCase().includes(query),
        ),
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    if (selectedStatus) {
      filtered = filtered.filter((p) => p.status === selectedStatus);
    }

    if (sortConfig) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof Product];
        const bValue = b[sortConfig.key as keyof Product];

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [searchText, selectedCategory, selectedStatus, productList, sortConfig]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="search">
        <input
          type="text"
          className="m-1 border-2"
          aria-label="Search for a product"
          value={searchText}
          onChange={handleSearchInputChange}
        />
        <button
          onClick={applyFilters}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="m-1 border-2"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="m-1 border-2"
        >
          <option value="">All Statuses</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <div className="products-table">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`${CELL_CLASSES} cursor-pointer hover:bg-gray-200`}
                  onClick={() => requestSort(col.key)}
                >
                  {col.label}
                  {getSortIcon(col.key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => setViewingProduct(product)}
              >
                {columns.map((col) => (
                  <td key={col.key} className={CELL_CLASSES}>
                    {col.render(product)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="mx-1 px-3 py-1 bg-gray-200 rounded"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span className="mx-2 self-center">
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          className="mx-1 px-3 py-1 bg-gray-200 rounded"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={handleSave}
        />
      )}
      {viewingProduct && (
        <ViewProductModal
          product={viewingProduct}
          onClose={() => setViewingProduct(null)}
        />
      )}
    </div>
  );
};
