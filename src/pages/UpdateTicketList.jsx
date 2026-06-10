import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

export default function UpdateTicketList() {
  return (
    <Layout title="Update Tiket Gangguan">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
        <h3 className="font-bold text-lg text-slate-800">Daftar Tiket Open</h3>
      </div>

      <div className="space-y-4">
        {/* Card Tiket 1 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-start gap-2">
          <h4 className="font-bold text-lg text-slate-800">Tiket #123</h4>
          <p className="text-sm text-gray-500">Status: Open</p>
          <p className="text-sm text-gray-500 mb-2">
            Masalah: Tidak bisa login
          </p>
          <Link to="/update-ticket/123">
            <button className="bg-[#3B82F6] hover:bg-blue-600 text-white text-xs font-medium py-2 px-6 rounded transition-colors">
              Update
            </button>
          </Link>
        </div>

        {/* Card Tiket 2 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-start gap-2">
          <h4 className="font-bold text-lg text-slate-800">Tiket #124</h4>
          <p className="text-sm text-gray-500">Status: Open</p>
          <p className="text-sm text-gray-500 mb-2">
            Masalah: Koneksi terputus
          </p>
          <Link to="/update-ticket/124">
            <button className="bg-[#3B82F6] hover:bg-blue-600 text-white text-xs font-medium py-2 px-6 rounded transition-colors">
              Update
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
