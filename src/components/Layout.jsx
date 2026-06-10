import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Layout({ children, title, subtitle }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Helper untuk mengecek menu aktif berdasarkan URL
  const isActive = (paths) => {
    return paths.some((path) => location.pathname.includes(path))
      ? "bg-[#3B82F6] text-white"
      : "text-gray-400 hover:text-white hover:bg-gray-800/50";
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="flex w-full h-screen font-sans bg-[#F4F7F9]">
      {/* SIDEBAR */}
      <aside className="w-[240px] bg-[#1E2235] flex flex-col justify-between shrink-0">
        <div>
          {/* Sidebar Brand / Header */}
          <div className="px-6 pt-8 pb-10">
            <h1 className="text-white text-[15px] font-bold leading-tight">
              PT Mitra Kerja
              <br />
              <span className="text-xs font-normal text-gray-400">
                Teknologi
              </span>
            </h1>
          </div>

          {/* Navigasi Menu */}
          <nav className="flex flex-col px-4 space-y-1">
            <Link
              to="/user-dashboard"
              className={`px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${isActive(["/user-dashboard"])}`}
            >
              Dashboard
            </Link>
            <Link
              to="/update-ticket"
              className={`px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${isActive(["/update-ticket"])}`}
            >
              Update
            </Link>
            <Link
              to="/open-ticket"
              className={`px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${isActive(["/open-ticket"])}`}
            >
              Open
            </Link>
            <Link
              to="/users"
              className={`px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${isActive(["/users", "/create-user"])}`}
            >
              User
            </Link>
            <Link
              to="/admin"
              className={`px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${isActive(["/admin"])}`}
            >
              Admin
            </Link>
          </nav>
        </div>

        {/* Tombol Log Out */}
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
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* TOP BAR / HEADER */}
        <header className="bg-white h-[84px] px-8 flex items-center border-b border-gray-200 shrink-0">
          <div className="flex items-center gap-6">
            {/* Logo & Company Name */}
            <div className="flex items-center gap-4 border-r border-gray-200 pr-6">
              <div className="w-10 h-10 bg-blue-50/50 border border-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                {/* Custom Triangle Logo based on the design */}
                <svg
                  width="24"
                  height="24"
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
              <div>
                <p className="text-[10px] font-extrabold text-slate-800 uppercase tracking-widest leading-tight mb-0.5">
                  PT MITRA KERJA
                </p>
                <p className="text-[10px] font-extrabold text-slate-800 uppercase tracking-widest leading-tight">
                  TEKNOLOGI
                </p>
              </div>
            </div>

            {/* Dynamic Page Title & Subtitle */}
            <div>
              <h2 className="text-[22px] font-bold text-slate-800 leading-none">
                {title}
              </h2>
              {subtitle && (
                <p className="text-[13px] text-gray-400 mt-2">{subtitle}</p>
              )}
            </div>
          </div>
        </header>

        {/* SCROLLABLE PAGE CONTENT */}
        <div className="flex-1 overflow-y-auto p-8">{children}</div>
      </main>
    </div>
  );
}
