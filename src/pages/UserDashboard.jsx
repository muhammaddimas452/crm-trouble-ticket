import React from "react";
import Layout from "../components/Layout";

export default function UserDashboard() {
  return (
    <Layout
      title="Dashboard Laporan Tiket Gangguan"
      subtitle="Selamat datang Saker MKT di halaman Dashboard Laporan Tiket Gangguan"
    >
      {/* Jika kamu ingin mengubah Header bawaan Layout khusus di halaman ini, 
          kamu bisa mengatur props di Layout. Namun di sini kita fokus pada konten utamanya */}

      {/* Tab Navigasi */}
      <div className="flex border-b border-gray-200 mb-6">
        <div className="flex items-center gap-2 border-b-2 border-[#EA580C] pb-3 px-1">
          <span className="w-2 h-2 bg-[#1E3A8A] rounded-sm block"></span>
          <span className="font-bold text-sm text-slate-800">Data Tiket</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Title Box: Data Tiket Gangguan */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
          <div className="text-[#3B82F6]">
            {/* Icon File/List */}
            <svg
              width="22"
              height="22"
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
            Data Tiket Gangguan
          </h3>
        </div>

        {/* Search Bar Box */}
        <div className="bg-white p-2.5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-gray-400 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <input
            type="text"
            placeholder="Cari nomor tiket, customer, lokasi..."
            className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder-gray-400 px-2"
          />
        </div>

        {/* Tabel Data Tiket */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#1E2235] text-white text-xs">
              <tr>
                <th className="px-4 py-4 font-semibold w-14"></th>
                <th className="px-4 py-4 font-semibold">No. Tiket</th>
                <th className="px-4 py-4 font-semibold">Tanggal</th>
                <th className="px-4 py-4 font-semibold">Customer</th>
                <th className="px-4 py-4 font-semibold">Lokasi</th>
                <th className="px-4 py-4 font-semibold">Device</th>
                <th className="px-4 py-4 font-semibold">Layanan</th>
                <th className="px-4 py-4 font-semibold">Down Time</th>
                <th className="px-4 py-4 font-semibold">Insiden</th>
                <th className="px-4 py-4 font-semibold">Update Progres</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {/* Row 0 */}
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="bg-gray-100 text-gray-600 text-xs font-bold w-6 h-6 flex items-center justify-center rounded">
                    0
                  </div>
                </td>
                <td className="px-4 py-3 font-bold text-slate-800">
                  TT250801300
                </td>
                <td className="px-4 py-3 text-gray-600 text-xs">01/08/2025</td>
                <td className="px-4 py-3 text-gray-600 text-xs">Indomaret</td>
                <td className="px-4 py-3 text-gray-600 text-xs">
                  Cabang Bekasi
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs">Modem</td>
                <td className="px-4 py-3 text-gray-600 text-xs">Lintasarta</td>
                <td className="px-4 py-3 text-gray-600 text-xs">
                  19/04/2026 04:04
                </td>
                <td className="px-4 py-3">
                  <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-bold">
                    RTO
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400 text-[11px]">
                  01/08 (05:33) by Jamal: Ping Restore...
                </td>
              </tr>

              {/* Row 1 */}
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="bg-gray-100 text-gray-600 text-xs font-bold w-6 h-6 flex items-center justify-center rounded">
                    1
                  </div>
                </td>
                <td className="px-4 py-3 font-bold text-slate-800">
                  TT250801301
                </td>
                <td className="px-4 py-3 text-gray-600 text-xs">01/08/2025</td>
                <td className="px-4 py-3 text-gray-600 text-xs">Indomaret</td>
                <td className="px-4 py-3 text-gray-600 text-xs">
                  Cabang Jakarta Barat
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs">Modem</td>
                <td className="px-4 py-3 text-gray-600 text-xs">Lintasarta</td>
                <td className="px-4 py-3 text-gray-600 text-xs">
                  19/04/2026 06:40
                </td>
                <td className="px-4 py-3">
                  <span className="bg-red-50 text-red-500 px-3 py-1 rounded-full text-[10px] font-bold">
                    Down
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400 text-[11px]">
                  01/08 (07:21) by Andri: Ping Req...
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="bg-gray-100 text-gray-600 text-xs font-bold w-6 h-6 flex items-center justify-center rounded">
                    2
                  </div>
                </td>
                <td className="px-4 py-3 font-bold text-slate-800">
                  TT250801302
                </td>
                <td className="px-4 py-3 text-gray-600 text-xs">02/08/2025</td>
                <td className="px-4 py-3 text-gray-600 text-xs">Bank BRI</td>
                <td className="px-4 py-3 text-gray-600 text-xs">
                  KCP Sudirman
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs">
                  JKT-05-1F-R1
                </td>
                <td className="px-4 py-3 text-gray-600 text-xs">Telkom</td>
                <td className="px-4 py-3 text-gray-600 text-xs">
                  19/04/2026 08:15
                </td>
                <td className="px-4 py-3">
                  <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-[10px] font-bold whitespace-nowrap">
                    Mac Addess Incomplete
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400 text-[11px]">
                  02/08 (09:00) by Budi: Cek link...
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="bg-gray-100 text-gray-600 text-xs font-bold w-6 h-6 flex items-center justify-center rounded">
                    3
                  </div>
                </td>
                <td className="px-4 py-3 font-bold text-slate-800">
                  TT250801303
                </td>
                <td className="px-4 py-3 text-gray-600 text-xs">02/08/2025</td>
                <td className="px-4 py-3 text-gray-600 text-xs">
                  Bank Mandiri
                </td>
                <td className="px-4 py-3 text-gray-600 text-xs">
                  KCU Makassar
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs">
                  MKS-02-2F-R3
                </td>
                <td className="px-4 py-3 text-gray-600 text-xs">Oxygen</td>
                <td className="px-4 py-3 text-gray-600 text-xs">
                  19/04/2026 09:30
                </td>
                <td className="px-4 py-3">
                  <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-bold">
                    RTO
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400 text-[11px]">
                  02/08 (10:10) by Rina: Restore...
                </td>
              </tr>

              {/* Row 4 */}
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="bg-gray-100 text-gray-600 text-xs font-bold w-6 h-6 flex items-center justify-center rounded">
                    4
                  </div>
                </td>
                <td className="px-4 py-3 font-bold text-slate-800">
                  TT250801304
                </td>
                <td className="px-4 py-3 text-gray-600 text-xs">03/08/2025</td>
                <td className="px-4 py-3 text-gray-600 text-xs">Bank BNI</td>
                <td className="px-4 py-3 text-gray-600 text-xs">KCP Depok</td>
                <td className="px-4 py-3 text-gray-400 text-xs">
                  DPK-08-3F-R1
                </td>
                <td className="px-4 py-3 text-gray-600 text-xs">Icon+</td>
                <td className="px-4 py-3 text-gray-600 text-xs">
                  19/04/2026 11:00
                </td>
                <td className="px-4 py-3">
                  <span className="bg-red-50 text-red-500 px-3 py-1 rounded-full text-[10px] font-bold">
                    Down
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400 text-[11px]">
                  03/08 (11:45) by Sari: Eskalasi NOC...
                </td>
              </tr>

              {/* Row 5 */}
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="bg-gray-100 text-gray-600 text-xs font-bold w-6 h-6 flex items-center justify-center rounded">
                    5
                  </div>
                </td>
                <td className="px-4 py-3 font-bold text-slate-800">
                  TT250801305
                </td>
                <td className="px-4 py-3 text-gray-600 text-xs">03/08/2025</td>
                <td className="px-4 py-3 text-gray-600 text-xs">Bank BRI</td>
                <td className="px-4 py-3 text-gray-600 text-xs">
                  KCP Bogor Baru
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs">
                  BGR-11-2F-R2
                </td>
                <td className="px-4 py-3 text-gray-600 text-xs">Lintasarta</td>
                <td className="px-4 py-3 text-gray-600 text-xs">
                  19/04/2026 13:20
                </td>
                <td className="px-4 py-3">
                  <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-bold">
                    Selesai
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400 text-[11px]">
                  03/08 (14:00) by Dewi: Link UP normal...
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
