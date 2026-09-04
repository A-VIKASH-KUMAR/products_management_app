import { useDispatch } from "react-redux"
import { Product } from "../utils/products_data"
import { Dispatch } from "@reduxjs/toolkit"
import { addToCart } from "../utils/productSlices"
interface ViewProductProps {
    product: Product
    onClose: () => void
}

export const ViewProductModal = ({ product, onClose }: ViewProductProps) => {
    const dispatch = useDispatch();
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Product Details</h2>
                <div className="space-y-2">
                    <p><strong>Name:</strong> {product.name}</p>
                    <p><strong>Category:</strong> {product.category}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
                    <p><strong>Stock:</strong> {product.stock}</p>
                    <p><strong>Status:</strong> {product.status}</p>
                    <p><strong>Last Updated:</strong> {product.lastUpdated}</p>
                </div>
                <button onClick={()=> {dispatch(addToCart(product)); alert("Product added to cart!")}} className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
                    Add to Cart
                </button>
                <button
                  onClick={onClose}
                  className="mt-6 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-full"
                >
                    Close
                </button>
            </div>
        </div>
    )
}
