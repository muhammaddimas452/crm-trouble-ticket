import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

export default function UserList() {
  return (
    <Layout title="Daftar User">
      <div className="space-y-6">
        {/* Top Control Box */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header Area */}
          <div className="p-5 flex items-center gap-3">
            <div className="text-blue-500 bg-blue-50/50 p-2 rounded-full border border-blue-100">
              <svg
                className="w-5 h-5"
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
            </div>
            <h3 className="font-bold text-lg text-slate-800">Daftar User</h3>
          </div>

          {/* Tabs Area */}
          <div className="px-5 border-b border-gray-200">
            <div className="inline-block border-b-2 border-blue-600 pb-3 px-1">
              <span className="text-sm font-medium text-blue-600">
                Informasi User
              </span>
            </div>
          </div>

          {/* Action Button Area */}
          <div className="p-5">
            <Link to="/create-user">
              <button className="bg-[#10B981] hover:bg-emerald-600 text-white font-medium py-2.5 px-5 rounded-md text-sm transition-colors">
                Buat User baru
              </button>
            </Link>
          </div>
        </div>

        {/* List of User Cards */}
        <div className="space-y-4">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-start">
            <h4 className="font-bold text-lg text-slate-800 mb-1">Budi</h4>
            <p className="text-sm text-gray-500 mb-1">Budi Ardian</p>
            <p className="text-sm text-gray-500 mb-5">budiardian@gmail.com</p>
            <button className="bg-[#007BFF] hover:bg-blue-600 text-white text-xs font-medium py-2 px-6 rounded-md transition-colors">
              Update
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-start">
            <h4 className="font-bold text-lg text-slate-800 mb-1">Budi</h4>
            <p className="text-sm text-gray-500 mb-1">Budi Ardian</p>
            <p className="text-sm text-gray-500 mb-5">budiardian@gmail.com</p>
            <button className="bg-[#007BFF] hover:bg-blue-600 text-white text-xs font-medium py-2 px-6 rounded-md transition-colors">
              Update
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-start">
            <h4 className="font-bold text-lg text-slate-800 mb-1">Budi</h4>
            <p className="text-sm text-gray-500 mb-1">Budi Ardian</p>
            <p className="text-sm text-gray-500 mb-5">budiardian@gmail.com</p>
            <button className="bg-[#007BFF] hover:bg-blue-600 text-white text-xs font-medium py-2 px-6 rounded-md transition-colors">
              Update
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
