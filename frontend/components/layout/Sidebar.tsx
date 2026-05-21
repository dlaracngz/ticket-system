"use client";
import { axiosClient } from "@/api/axiosClient";
import { logout } from "@/store/slices/authSlice";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { BsTicketDetailed } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { IoMenu } from "react-icons/io5";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const sidebarMenu = [
    {
      id: 1,
      title: "Talepler",
      href: "/talepler",
      icon: BsTicketDetailed,
    },
  ] as const;

  const handleLogout = async () => {
    try {
      await axiosClient.post("/auth/logout", {
        withCredentials: true,
      });
      dispatch(logout());
      router.push("/giris-yap");
    } catch (error) {
      console.log("Çıkış yapılamadı");
    }
  };

  return (
    <div
      className={`relative z-10 transition-all duration-300 ease-in-out ${isSidebarOpen ? "w-40" : "w-20"} `}
    >
      <div className="h-full bg-[#2F4698] text-white backdrop-blur-md p-4 flex flex-col border-r border-slate-200 shadow-xl rounded-r-2xl">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-3 rounded-full hover:bg-[#7F96E3] transition-colors max-w-fit cursor-pointer "
        >
          <IoMenu size={24} />
        </button>
        <nav className="mt-8 flex-grow">
          {sidebarMenu.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.id} href={item.href}>
                <div
                  className={`flex items-center p-4 text-sm font-medium rounded-lg hover:bg-[#7F96E3] transition-colors mb-2 w-full ${pathname === item.href ? "bg-[#7F96E3]" : ""} ${isSidebarOpen ? "justify-start" : " justify-center"}`}
                >
                  <Icon size={22} style={{ minWidth: "22px" }} />
                  {isSidebarOpen && (
                    <span className="ml-2 whitespace-nowrap">{item.title}</span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className={`flex items-center p-4 text-sm font-medium rounded-lg hover:bg-[#7F96E3] transition-colors w-full cursor-pointer ${
              isSidebarOpen ? "justify-start" : "justify-center"
            }`}
          >
            <FiLogOut size={22} style={{ minWidth: "22px" }} />

            {isSidebarOpen && (
              <span className="ml-2 whitespace-nowrap">Çıkış Yap</span>
            )}
          </button>
        </div>
      </div>
      sidebar
    </div>
  );
};

export default Sidebar;
