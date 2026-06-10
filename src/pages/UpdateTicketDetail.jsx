import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

export default function UpdateTicketDetail() {
  return (
    <Layout title="Update Tiket Gangguan">
      <div className="max-w-full">
        {/* Header Section: Update Tiket Gangguan */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="p-5 flex items-center gap-3 border-b border-gray-50">
            <div className="text-blue-500 bg-blue-50/50 p-2 rounded-full border border-blue-100">
              {/* Ticket/File Icon */}
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
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <h3 className="font-bold text-lg text-slate-800">
              Update Tiket Gangguan
            </h3>
          </div>
          <div className="px-5 pt-3">
            <div className="inline-block border-b-2 border-blue-600 pb-3 px-1">
              <span className="text-sm font-medium text-blue-600">
                Update Progres
              </span>
            </div>
          </div>
        </div>

        <form className="space-y-6">
          {/* Section 1: Detail Waktu & Pelaporan */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 flex items-center gap-2 border-b-2 border-blue-500">
              {/* Clock/Time Icon */}
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 6v6l4 2"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3 className="font-bold text-sm text-slate-800">
                Detail Waktu & Pelaporan
              </h3>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Customer */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 mb-2">
                  <svg
                    className="w-3.5 h-3.5 text-blue-500"
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
                  Customer <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value="Bank BRI"
                  readOnly
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-gray-600 bg-gray-50/50 outline-none"
                />
              </div>

              {/* Lokasi */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 mb-2">
                  <svg
                    className="w-3.5 h-3.5 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  Lokasi <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value="KCP Sudirman"
                  readOnly
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-gray-600 bg-gray-50/50 outline-none"
                />
              </div>

              {/* Layanan */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 mb-2">
                  <svg
                    className="w-3.5 h-3.5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    ></path>
                  </svg>
                  Layanan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value="Telkom"
                  readOnly
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-gray-600 bg-gray-50/50 outline-none"
                />
              </div>

              {/* Device */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 mb-2">
                  <svg
                    className="w-3.5 h-3.5 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                  Device <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value="JKT-05-1F-R1"
                  readOnly
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-gray-600 bg-gray-50/50 outline-none"
                />
              </div>

              {/* Tanggal Down Time */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 mb-2">
                  <svg
                    className="w-3.5 h-3.5 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  Tanggal Down Time <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value="08/02/2025"
                    readOnly
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-gray-600 bg-gray-50/50 outline-none"
                  />
                  <span className="absolute inset-y-0 right-4 flex items-center text-gray-500">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </span>
                </div>
              </div>

              {/* Konfirm By */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 mb-2">
                  <svg
                    className="w-3.5 h-3.5 text-blue-500"
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
                  Konfirm By
                </label>
                <input
                  type="text"
                  value="Budi"
                  readOnly
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-gray-600 bg-gray-50/50 outline-none"
                />
              </div>

              {/* Jam Down Time */}
              <div className="md:col-span-1">
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 mb-2">
                  <svg
                    className="w-3.5 h-3.5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 6v6l4 2"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Jam Down Time (HH:MM) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value="08:15 AM"
                    readOnly
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-gray-600 bg-gray-50/50 outline-none"
                  />
                  <span className="absolute inset-y-0 right-4 flex items-center text-gray-500">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 6v6l4 2"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Update Progres */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 flex items-center gap-2 border-b-2 border-blue-500">
              {/* Box Arrow Icon */}
              <svg
                className="w-4 h-4 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                ></path>
              </svg>
              <h3 className="font-bold text-sm text-slate-800">
                Update Progres
              </h3>
            </div>

            <div className="p-6">
              {/* Status Insiden */}
              <div className="mb-6">
                <label className="block text-[11px] font-bold text-gray-600 mb-3">
                  Status Insiden <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3">
                  <span className="px-6 py-1.5 bg-[#EA580C] text-white rounded-full text-xs font-semibold cursor-pointer shadow-sm">
                    On Going
                  </span>
                  <span className="px-6 py-1.5 border border-[#EAB308] text-[#EAB308] rounded-full text-xs font-semibold cursor-pointer hover:bg-yellow-50 transition">
                    Pending
                  </span>
                  <span className="px-6 py-1.5 border border-[#22C55E] text-[#22C55E] rounded-full text-xs font-semibold cursor-pointer hover:bg-green-50 transition">
                    Selesai
                  </span>
                </div>
              </div>

              {/* Detail Progres Tiket */}
              <div className="mb-6">
                <label className="block text-[11px] font-bold text-gray-600 mb-2">
                  Detail Progres Tiket
                </label>
                <textarea
                  rows="4"
                  placeholder="Masukkan detail progres..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                ></textarea>
              </div>

              {/* Bawah: Konfirm & Waktu */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 mb-2">
                    <svg
                      className="w-3.5 h-3.5 text-blue-500"
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
                    Konfirm By (Progres)
                  </label>
                  <input
                    type="text"
                    value="Budi"
                    readOnly
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-gray-600 bg-gray-50/50 outline-none"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 mb-2">
                    <svg
                      className="w-3.5 h-3.5 text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    Waktu Progres
                  </label>
                  <input
                    type="text"
                    value="2026/04/19 15:51"
                    readOnly
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-gray-600 bg-gray-50/50 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-end gap-3 mt-8">
            <Link to="/update-ticket">
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
              ✓ Simpan Update
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
