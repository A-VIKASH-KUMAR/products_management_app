// import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { ProductsList } from "./components/ProductsList";
import { AddProduct } from "./components/AddProduct";
export function App() {
  return (
    <div>
      <Header />
      <Outlet/>
    </div>
  );
}

export const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ProductsList/>,
      },
      {
        path: "/add-product",
        element: <AddProduct/>,
      }
    ],
  },
]);
