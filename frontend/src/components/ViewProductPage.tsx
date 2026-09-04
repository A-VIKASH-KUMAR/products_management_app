import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Product } from "../utils/products_data";
import { getProduct } from "../services/products";
import { addToCart } from "../utils/productSlices";

export const ViewProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadProduct = async () => {
      if (!id) {
        setError("Product id is missing");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const data = await getProduct(id);
        if (!cancelled) {
          setProduct(data);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load product");
          setLoading(false);
        }
      }
    };

    loadProduct();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Loading product...</p>
        <Link to="/" className="text-blue-500 hover:underline">
          Back to products
        </Link>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="p-6">
        <p className="text-red-500 mb-4">
          {error ?? "Product not found"}
        </p>
        <Link to="/" className="text-blue-500 hover:underline">
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to products
      </Link>
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Product Details</h2>
        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {product.name}
          </p>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <p>
            <strong>Price:</strong> ${product.price}
          </p>
          <p>
            <strong>Stock:</strong> {product.stock}
          </p>
          <p>
            <strong>Status:</strong> {product.status}
          </p>
          <p>
            <strong>Last Updated:</strong> {product.lastUpdated}
          </p>
        </div>
        <button
          onClick={() => {
            dispatch(addToCart(product));
            alert("Product added to cart!");
          }}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Add to Cart
        </button>
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};
