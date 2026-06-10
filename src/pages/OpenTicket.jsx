import React from "react";
import Layout from "../components/Layout";

export default function OpenTicket() {
  return (
    <Layout title="Open Tiket Gangguan">
      <form className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <h3 className="font-bold text-sm text-slate-800 border-l-4 border-blue-600 pl-2">
              Detail Waktu & Pelaporan
            </h3>
          </div>
          <div className="p-6 grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">
                Customer <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Masukkan customer..."
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">
                Lokasi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Masukkan lokasi..."
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">
                Layanan <span className="text-red-500">*</span>
              </label>
              <select className="w-full px-3 py-2 border rounded-md text-sm bg-white text-gray-500">
                <option>Masukkan layanan...</option>
                <option>Lintasarta</option>
                <option>Telkom</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">
                Device <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Masukkan device..."
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">
                Tanggal Down Time <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded-md text-sm text-gray-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">
                Konfirm By
              </label>
              <input
                type="text"
                placeholder="User by Login"
                readOnly
                className="w-full px-3 py-2 border rounded-md text-sm bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">
                Jam Down Time (HH:MM) <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                className="w-full px-3 py-2 border rounded-md text-sm text-gray-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <h3 className="font-bold text-sm text-slate-800 border-l-4 border-blue-600 pl-2">
              Update Progres Awal
            </h3>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-600 mb-2">
                Status Insiden <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <span className="px-4 py-1 border border-orange-500 text-orange-500 rounded-full text-xs font-semibold cursor-pointer">
                  On Going
                </span>
                <span className="px-4 py-1 border border-yellow-500 text-yellow-600 rounded-full text-xs font-semibold cursor-pointer">
                  Pending
                </span>
                <span className="px-4 py-1 border border-green-500 text-green-600 rounded-full text-xs font-semibold cursor-pointer">
                  Selesai
                </span>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-600 mb-1">
                Progres awal tiket
              </label>
              <textarea
                rows="4"
                placeholder="Masukkan detail progres..."
                className="w-full px-3 py-2 border rounded-md text-sm"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 text-gray-600 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#10B981] text-white rounded-md text-sm font-medium hover:bg-emerald-600 transition-colors"
          >
            ✓ Simpan Tiket
          </button>
        </div>
      </form>
    </Layout>
  );
}
