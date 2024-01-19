import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faList, faHome, faList12, faHomeUser, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
// import useTokenRefresh from "../../../controllers/useToken";
import { Link } from "react-router-dom";

const SidebarAdmin = () => {
  const [productSubMenu, setproductSubMenu] = useState(false);
  const toggleLokasiSubMenu = () => {
    setproductSubMenu(!productSubMenu);
  };


  return (
    <div className="fixed flex flex-col top-14 left-0 w-[15%] hover:w-[15%] md:w-[15%] bg-blue-500  h-full text-white transition-all duration-300 border-none z-10 sidebar">
      <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
        <ul className="flex flex-col py-4 space-y-1">

         
          <li>
            <Link
              to={'/beranda'}
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-300  text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-200  "
            >
              <span className="inline-flex justify-center items-center ml-4">
                <FontAwesomeIcon icon={faHomeUser} className="w-5 h-5" />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">Halaman User</span>
            </Link>
          </li>
          <li>
            <Link
              to={'/dashboard'}
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-300 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-200 "
            >
              <span className="inline-flex justify-center items-center ml-4">
                <FontAwesomeIcon icon={faHome} className="w-5 h-5" />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">Dashboard</span>
            </Link>
          </li>
           {/* Users */}
           <li>
            <Link
              to={'/usersall'}
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-300  text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-200  "
            >
              <span className="inline-flex justify-center items-center ml-4">
                <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">Data Users</span>
            </Link>
          </li>
          {/* end Users */}
          {/* Landing Page */}
          <li>
            <a
              href="#"
              onClick={toggleLokasiSubMenu}
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-300  text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-200  "
            >
              <span className="inline-flex justify-center items-center ml-4">
              <FontAwesomeIcon icon={faList12} className="w-5 h-5" />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">Products</span>
            </a>
            {productSubMenu && (
              <ul className="ml-6 mt-2 space-y-2">
                 <li>
                  <Link
                    to={'/productall'}
                    className="flex flex-row items-center h-8 text-white-600 hover:text-white-800"
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                    <FontAwesomeIcon icon={faList} className="w-5 h-5" />
                    </span>
                    <span className="ml-2 text-xs tracking-wide">All Products</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={'/productadd'}
                    className="flex flex-row items-center h-8 text-white-600 hover:text-white-800"
                  >
                    <span className="inline-flex justify-center items-center ml-4">
                    <FontAwesomeIcon icon={faPlus} className="w-5 h-5" />
                    </span>
                    <span className="ml-2 text-xs tracking-wide">Add Products</span>
                  </Link>
                </li>
               
              </ul>
            )}
          </li>
          {/* end Landing Page */}
          <li>
            <Link
              to={'/transaksisall'}
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-300  text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-200 "
            >
              <span className="inline-flex justify-center items-center ml-4">
                <FontAwesomeIcon icon={faMoneyBill} className="w-5 h-5" />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">Data Transactions</span>
            </Link>
          </li>

        </ul>
      </div>
    </div>
  );
};

export default SidebarAdmin;
