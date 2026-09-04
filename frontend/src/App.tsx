// import "./App.css";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { ProductsList } from "./components/ProductsList";
import { AddProduct } from "./components/AddProduct";
import { Cart } from "./components/Cart";
import { productStore } from "./utils/productStore";
import {ViewProductPage} from "./components/ViewProductPage"
export function App() {
  return (
    <Provider store={productStore}>
      <div>
        <Header />
        <Outlet />
      </div>
    </Provider>
  );
}

export const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ProductsList />,
      },
      {
        path: "/add-product",
        element: <AddProduct />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path:"/product/:id",
        element:<ViewProductPage />
      }
    ],
  },
]);
