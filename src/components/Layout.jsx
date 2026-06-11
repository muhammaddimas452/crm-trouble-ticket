import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Layout({ children, title, subtitle }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State untuk Sidebar Mobile

  const isActive = (paths) => {
    return paths.some((path) => location.pathname.includes(path))
      ? "bg-[#3B82F6] text-white"
      : "text-gray-400 hover:text-white hover:bg-gray-800/50";
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="flex w-full h-screen font-sans bg-[#F4F7F9] overflow-hidden relative">
      {/* Overlay Hitam untuk Mobile ketika Sidebar Terbuka */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* SIDEBAR */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-[240px] bg-[#1E2235] flex flex-col justify-between shrink-0
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div>
          <div className="px-6 pt-8 pb-10 flex justify-between items-start">
            <h1 className="text-white text-[15px] font-bold leading-tight">
              PT Mitra Kerja
              <br />
              <span className="text-xs font-normal text-gray-400">
                Teknologi
              </span>
            </h1>
            {/* Tombol Close (X) di Mobile */}
            <button
              className="lg:hidden text-gray-400 hover:text-white"
              onClick={() => setIsSidebarOpen(false)}
            >
              ✕
            </button>
          </div>

          <nav className="flex flex-col px-4 space-y-1">
            <Link
              to="/user-dashboard"
              onClick={() => setIsSidebarOpen(false)}
              className={`px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${isActive(["/user-dashboard"])}`}
            >
              Dashboard
            </Link>
            <Link
              to="/update-ticket"
              onClick={() => setIsSidebarOpen(false)}
              className={`px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${isActive(["/update-ticket"])}`}
            >
              Update
            </Link>
            <Link
              to="/open-ticket"
              onClick={() => setIsSidebarOpen(false)}
              className={`px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${isActive(["/open-ticket"])}`}
            >
              Open
            </Link>
            <Link
              to="/users"
              onClick={() => setIsSidebarOpen(false)}
              className={`px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${isActive(["/users", "/create-user"])}`}
            >
              User
            </Link>
            <Link
              to="/admin"
              onClick={() => setIsSidebarOpen(false)}
              className={`px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${isActive(["/admin"])}`}
            >
              Admin
            </Link>
          </nav>
        </div>

        <div className="p-4 mb-4">
          <button
            onClick={handleLogout}
            className="w-full bg-black text-white text-sm font-medium py-3 rounded-md hover:bg-gray-900 transition-colors text-left px-4"
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden w-full">
        {/* TOP BAR / HEADER */}
        <header className="bg-white h-[84px] px-4 md:px-8 flex items-center justify-between lg:justify-start border-b border-gray-200 shrink-0">
          {/* Hamburger Menu & Logo */}
          <div className="flex items-center gap-3 lg:gap-6">
            <button
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
              onClick={() => setIsSidebarOpen(true)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>

            <div className="flex items-center gap-2 md:gap-4 lg:border-r lg:border-gray-200 lg:pr-6">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-50/50 border border-blue-100 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
                <svg
                  width="20"
                  height="20"
                  className="md:w-6 md:h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3L3 19h18L12 3z" />
                  <circle cx="12" cy="5" r="1.5" fill="currentColor" />
                  <circle cx="5" cy="17" r="1.5" fill="currentColor" />
                  <circle cx="19" cy="17" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <div className="hidden sm:block">
                <p className="text-[10px] font-extrabold text-slate-800 uppercase tracking-widest leading-tight mb-0.5">
                  PT MITRA KERJA
                </p>
                <p className="text-[10px] font-extrabold text-slate-800 uppercase tracking-widest leading-tight">
                  TEKNOLOGI
                </p>
              </div>
            </div>
          </div>

          {/* Dynamic Page Title & Subtitle */}
          <div className="ml-0 lg:ml-6 flex-1 lg:flex-none text-right lg:text-left truncate">
            <h2 className="text-lg md:text-[22px] font-bold text-slate-800 leading-none truncate">
              {title}
            </h2>
            {subtitle && (
              <p className="text-[11px] md:text-[13px] text-gray-400 mt-1.5 truncate hidden md:block">
                {subtitle}
              </p>
            )}
          </div>
        </header>

        {/* SCROLLABLE PAGE CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
