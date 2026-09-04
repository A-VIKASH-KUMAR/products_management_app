import { useState, useEffect, useRef } from "react";
import { getProducts, deleteProduct, getProduct } from "../services/products";
import { Product } from "../utils/products_data";
import { EditProductModal } from "./EditProductModal";
import { ViewProductModal } from "./ViewProduct";
import {Cart} from "./Cart";
export const ProductsList = () => {
  const [productList, setProductList] = useState(Array<Product>);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedSearchText(searchText);
      setCurrentPage(1);
    }, 600);
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchText]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [filteredProducts, setFilteredProducts] = useState(Array<Product>);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const offset = (currentPage - 1) * itemsPerPage;
      const params = {
        limit: itemsPerPage,
        offset,
        search: debouncedSearchText || undefined,
        category: selectedCategory || undefined,
        status: selectedStatus || undefined,
      };
      console.log("[getProducts] request", params);
      const response = await getProducts(params);
      console.log("[getProducts] response", response);
      setProductList(response.data || []);
      setTotalCount(response.total || 0);
    } catch (error) {
      console.error("[getProducts] failed", error);
      setProductList([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, itemsPerPage, debouncedSearchText, selectedCategory, selectedStatus, refreshKey]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
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
            onClick={async (e) => {
              e.stopPropagation();
              const product = await fetchProductById(p.id);
              if (product) setEditingProduct(product);
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

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      setProductList((currentProducts) =>
        currentProducts.filter((p) => p.id !== id),
      );
      setSelectedProductIds((currentSelected) =>
        currentSelected.filter((productId) => productId !== id),
      );
      setTotalCount((prev) => prev - 1);
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProductIds.length === 0) return;

    try {
      await Promise.all(selectedProductIds.map((id) => deleteProduct(id)));
      setProductList((currentProducts) =>
        currentProducts.filter(
          (product) => !selectedProductIds.includes(product.id),
        ),
      );
      setSelectedProductIds([]);
      setTotalCount((prev) => prev - selectedProductIds.length);
    } catch (error) {
      console.error("Failed to delete products:", error);
    }
  };

  const toggleProductSelection = (productId: string) => {
    setSelectedProductIds((currentSelected) =>
      currentSelected.includes(productId)
        ? currentSelected.filter((id) => id !== productId)
        : [...currentSelected, productId],
    );
  };

  const isAllCurrentProductsSelected =
    productList.length > 0 &&
    productList.every((product) => selectedProductIds.includes(product.id));

  const handleSelectAllCurrentPage = () => {
    if (isAllCurrentProductsSelected) {
      setSelectedProductIds((currentSelected) =>
        currentSelected.filter(
          (id) => !productList.some((product) => product.id === id),
        ),
      );
      return;
    }

    setSelectedProductIds((currentSelected) => {
      const nextSelected = new Set(currentSelected);
      productList.forEach((product) => nextSelected.add(product.id));
      return Array.from(nextSelected);
    });
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

  const handleSave = async (updatedProduct: Product) => {
    setProductList((currentProducts) =>
      currentProducts.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p,
      ),
    );
    setRefreshKey((prev) => prev + 1);
    setEditingProduct(null);
  };

  const fetchProductById = async (id: string): Promise<Product | null> => {
    try {
      const product = await getProduct(id);
      return product;
    } catch {
      return null;
    }
  };

  const applyFilters = () => {
    let filtered = [...productList];

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
  }, [productList, sortConfig]);

  useEffect(() => {
    setSelectedProductIds((currentSelected) =>
      currentSelected.filter((productId) =>
        productList.some((product) => product.id === productId),
      ),
    );
  }, [productList]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <input
          type="text"
          className="m-1 border-2"
          aria-label="Search for a product"
          value={searchText}
          onChange={handleSearchInputChange}
        />
        <button
          onClick={fetchProducts}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1);
          }}
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
          onChange={(e) => {
            setSelectedStatus(e.target.value);
            setCurrentPage(1);
          }}
          className="m-1 border-2"
        >
          <option value="">All Statuses</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-300"
          disabled={selectedProductIds.length === 0}
          onClick={handleBulkDelete}
        >
          Delete Selected ({selectedProductIds.length})
        </button>
      </div>
      <div className="products-table">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className={CELL_CLASSES}>
                <input
                  type="checkbox"
                  checked={isAllCurrentProductsSelected}
                  onChange={handleSelectAllCurrentPage}
                  aria-label="Select all products on this page"
                />
              </th>
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
            {loading ? (
              <tr>
                <td colSpan={columns.length + 1} className="py-8 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className={`hover:bg-gray-50 cursor-pointer ${
                    selectedProductIds.includes(product.id) ? "bg-blue-50" : ""
                  }`}
                  onClick={async () => {
                    const freshProduct = await fetchProductById(product.id);
                    if (freshProduct) setViewingProduct(freshProduct);
                  }}
                >
                  <td className={CELL_CLASSES}>
                    <input
                      type="checkbox"
                      checked={selectedProductIds.includes(product.id)}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleProductSelection(product.id);
                      }}
                      aria-label={`Select ${product.name}`}
                    />
                  </td>
                  {columns.map((col) => (
                    <td key={col.key} className={CELL_CLASSES}>
                      {col.render(product)}
                    </td>
                  ))}
                </tr>
              ))
            )}
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
