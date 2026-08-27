import { LOGO_URL } from "../utils/constants";
import {Link} from "react-router-dom";

export const Header = () => {
  return (
    <div className="flex justify-between bg-gray-200 shadow-lg">
      <div className="w-20">
        <img src={LOGO_URL} alt="logo" />
      </div>
      <div className="flex items-center">
        <ul className="flex p-4 m-4">
            <li className="px-4 ">
                <Link to= "/">Product List</Link>
            </li>
            <li className="px-4">
                <Link to= "/add-product">Add Product</Link>
            </li>
        </ul>
      </div>
    </div>
  );

};
