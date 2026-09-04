import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../utils/productSlices";
export const Cart = () => {
  const cartItems = useSelector((state: any) => state.cart.products);
  const dispatch = useDispatch();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Cart</h1>
      <div className="p-6">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item: any, index: number) => (
              <li
                key={`${item.id}-${index}`}
                className="flex items-center justify-between border-b pb-4"
              >
                <span>{item.name}</span>
                <span>
                  ${item.price} x {item.quantity}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
        <div className="text-center mt-6">
      <button
        onClick={() => dispatch(clearCart())}
        className="text-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Clear Cart
      </button>
      </div>
    </div>
  );
};
