import AdminLayout from "../layout/adminLayout";
import AdminDashboard from "./AdminDashboard";
import AdminOrder from "./AdminOrder";
import AdminCars from "./AdminCars.jsx"
import { LogOut } from "lucide-react"
import { useState } from "react";
import { useAuth } from "../lib/auth.jsx";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [activetab, setActiveTab] = useState("Dashboard");

  const navigation = [
    { name: "Dashboard" },
    { name: "Cars" },
    { name: "Order" },
  ];
  return (
    <div className="flex h-screen">
      <aside className="flex h-screen w-64 flex-col justify-between border-e border-gray-200 bg-white">
        <div className="px-6 py-8">
          <div className="flex items-center justify-center h-12 w-full rounded-lg text-sm font-semibold text-gray-700">
            <svg className="h-8 text-teal-600" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <nav className="mt-10 space-y-1 flex flex-col justify-between h-full">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full text-left rounded-md px-4 py-2 text-sm font-medium transition ${activetab === item.name
                    ? "bg-gray-100 text-gray-800"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </nav>
        </div>
        <div className="flex justify-center flex-col items-center gap-4">

          <button
            onClick={async () => {
              await logout()
              navigate("/login")
            }}
            className="p-3 w-3/4 mx-4 flex items-center justify-center gap-2 bg-[#009689] text-white text-sm font-semibold rounded-md hover:bg-[#007e73] transition duration-200"
          >
            <LogOut />
            Logout
          </button>

          <div className="border-t border-gray-200 p-4">
            <a
              href="#"
              className="flex items-center gap-3 rounded-md p-2 hover:bg-gray-50 transition"
            >
              <img
                alt="Profile"
                src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?auto=format&fit=crop&w=1770&q=80"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="text-sm">
                <p className="font-medium text-gray-900">admindai</p>
                <p className="text-xs text-gray-500">admin@gmail.com</p>
              </div>
            </a>
          </div>

        </div>
      </aside>


      <div className="flex-1 overflow-y-auto p-8">
        <AdminLayout title={activetab}>
          {activetab === "Dashboard" && <AdminDashboard />}
          {activetab === "Order" && <AdminOrder />}
          {activetab === "Cars" && <AdminCars />}
        </AdminLayout>
      </div>

    </div>
  );
};

export default Admin;

