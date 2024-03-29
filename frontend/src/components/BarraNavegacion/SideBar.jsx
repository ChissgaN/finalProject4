import React, { useState } from "react";
import { BrowserRouter as Router, Link, useNavigate } from "react-router-dom";
import {
  RiLayoutGridLine,
  RiEarthLine,
  RiCustomerService2Line,
  RiLogoutCircleRLine,
  RiMenu3Line,
  RiCloseLine,
} from "react-icons/ri";
import { LuLayoutDashboard } from "react-icons/lu";

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");

    window.location.href = "/";

    const navigate = useNavigate();
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
      }
    }, [navigate]);
  };

  return (
    <>
      <div
        className={`xl:h-[100vh] overflow-y-scroll fixed xl:static w-[80%] md:w-[40%] lg:w-[30%] xl:w-auto h-full top-0 bg-[#880d1e] p-4 flex flex-col justify-between z-50 ${
          showMenu ? "left-0" : "-left-full"
        } transition-all`}
      >
        <div>
          <h1 className="mb-10 text-2xl font-bold text-center text-white">
            Welcome<span className="text-4xl text-[#f6e27f]">!</span>
          </h1>
          <ul>
            <li>
              <Link
                to="/LayoutAdmin/Roll"
                className="flex items-center gap-4 px-4 py-2 text-[#f6e27f] transition-colors rounded-lg hover:bg-secondary-900"
              >
                <LuLayoutDashboard className="text-[#f6e27f]" />
                Rolls
              </Link>
            </li>
            <li>
              <Link
                to="/LayoutAdmin/usuarios"
                className="flex items-center gap-4 px-4 py-2 text-[#f6e27f] transition-colors rounded-lg hover:bg-secondary-900"
              >
                <RiCustomerService2Line className="text-[#f6e27f]" /> Users
              </Link>
            </li>
            <li>
              <Link
                to="/LayoutAdmin/logs"
                className="flex items-center gap-4 px-4 py-2 text-[#f6e27f] transition-colors rounded-lg hover:bg-secondary-900"
              >
                <RiLayoutGridLine className="text-[#f6e27f]" /> Logs
              </Link>
            </li>
            <li>
              <Link
                to="/LayoutAdmin/pages"
                className="flex items-center gap-4 px-4 py-2 text-[#f6e27f] transition-colors rounded-lg hover:bg-secondary-900"
              >
                <RiEarthLine className="text-[#f6e27f]" /> Pages
              </Link>
            </li>
          </ul>
        </div>
        <nav>
          <Link
            to="/"
            className="flex items-center gap-4 py-2 w-full text-white transition-colors rounded-lg hover:bg-secondary-900"
            onClick={handleLogout}
          >
            <RiLogoutCircleRLine className="text-[#f6e27f] font-[40px]" /> Log
            Out
          </Link>
        </nav>
      </div>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="fixed z-50 p-3 text-black rounded-full xl:hidden bottom-4 right-4 bg-[#4791ff]"
      >
        {showMenu ? <RiCloseLine /> : <RiMenu3Line />}
      </button>
    </>
  );
};

export default Sidebar;
