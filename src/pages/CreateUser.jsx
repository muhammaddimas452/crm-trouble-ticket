import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

export default function CreateUser() {
  return (
    <Layout title="Buat User">
      <div className="max-w-full">
        {/* Header Section: Buat User */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="p-5 flex items-center gap-3 border-b border-gray-50">
            <div className="text-blue-500 bg-blue-50/50 p-2 rounded-full border border-blue-100">
              {/* User Plus Icon */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
            </div>
            <h3 className="font-bold text-lg text-slate-800">Buat User</h3>
          </div>
          <div className="px-5 pt-3">
            <div className="inline-block border-b-2 border-blue-600 pb-3 px-1">
              <span className="text-sm font-medium text-blue-600">
                Informasi User
              </span>
            </div>
          </div>
        </div>

        <form className="space-y-6">
          {/* Section 1: Identitas User */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 flex items-center gap-2 border-b border-[#3B82F6]">
              {/* User Outline Icon */}
              <svg
                className="w-4 h-4 text-[#3B82F6]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
              <h3 className="font-bold text-sm text-[#3B82F6]">
                Identitas User
              </h3>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Nama Lengkap */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-2">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                  NAMA LENGKAP <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 bg-gray-50/30"
                />
              </div>

              {/* Username */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-2">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                    ></path>
                  </svg>
                  USERNAME <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Masukkan username"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 bg-gray-50/30"
                />
                <p className="text-[10px] text-gray-400 mt-1.5">
                  Digunakan untuk login. Tidak boleh ada spasi.
                </p>
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-2">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                  EMAIL <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="contoh@email.com"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 bg-gray-50/30"
                />
              </div>

              {/* No Telepon */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-2">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                  NO. TELEPON
                </label>
                <input
                  type="text"
                  placeholder="+62 812 xxxx xxxx"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 bg-gray-50/30"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Kata Sandi */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 flex items-center gap-2 border-b border-[#3B82F6]">
              {/* Lock Icon */}
              <svg
                className="w-4 h-4 text-[#3B82F6]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                ></path>
              </svg>
              <h3 className="font-bold text-sm text-[#3B82F6]">Kata Sandi</h3>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Password */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-2">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    ></path>
                  </svg>
                  PASSWORD <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Minimal 8 karakter"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 bg-gray-50/30 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {/* Eye Icon */}
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                </div>
                {/* Password Strength Indicator */}
                <div className="flex gap-1.5 mt-2.5 mb-1">
                  <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
                  <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
                  <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
                  <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
                </div>
                <p className="text-[10px] text-gray-400 mt-1.5">
                  Masukkan password
                </p>
              </div>

              {/* Konfirmasi Password */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-2">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    ></path>
                  </svg>
                  KONFIRMASI PASSWORD <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Ulangi password"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 bg-gray-50/30 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-[10px] text-gray-400 mt-2.5">
                  Pastikan password sama dengan di atas.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons Container */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-end gap-3 mt-8">
            <Link to="/users">
              <button
                type="button"
                className="px-6 py-2.5 border border-red-500 text-red-500 rounded-md text-sm font-semibold hover:bg-red-50 transition-colors flex items-center gap-1.5"
              >
                ✕ Batal
              </button>
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#10B981] text-white rounded-md text-sm font-semibold hover:bg-emerald-600 transition-colors flex items-center gap-1.5"
            >
              ✓ Simpan User
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
