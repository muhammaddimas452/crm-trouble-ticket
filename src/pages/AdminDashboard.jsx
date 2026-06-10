import React from "react";
import Layout from "../components/Layout";

export default function AdminDashboard() {
  return (
    <Layout title="Dashboard Admin">
      <div className="space-y-6">
        {/* ROW 1: Top Stats */}
        <div className="grid grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Total Tiket
                </p>
                <h3 className="text-4xl font-bold text-slate-800">1.284</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center text-lg">
                📄
              </div>
            </div>
            <p className="text-xs font-semibold text-green-600 flex items-center gap-1">
              <span className="text-[10px]">▲</span> 12% dari bulan lalu
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  On Going
                </p>
                <h3 className="text-4xl font-bold text-red-500">47</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-lg">
                ❗
              </div>
            </div>
            <p className="text-xs font-semibold text-red-500 flex items-center gap-1">
              <span className="text-[10px]">▼</span> 3 tiket dari kemarin
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Pending
                </p>
                <h3 className="text-4xl font-bold text-orange-500">18</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center text-lg">
                ⏱
              </div>
            </div>
            <p className="text-xs font-semibold text-orange-500 flex items-center gap-1">
              <span className="text-[10px]">▼</span> Pengerjaan di pending
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Selesai Hari Ini
                </p>
                <h3 className="text-4xl font-bold text-green-600">23</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-lg">
                ✓
              </div>
            </div>
            <p className="text-xs font-semibold text-green-600 flex items-center gap-1">
              <span className="text-[10px]">▲</span> 5 lebih dari kemarin
            </p>
          </div>
        </div>

        {/* ROW 2: Charts Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tiket per Bulan (Span 2) */}
          <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
            <div className="flex justify-between items-center mb-10">
              <h4 className="font-bold text-sm text-slate-800">
                Tiket per Bulan
              </h4>
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-xs font-bold">
                2026
              </span>
            </div>

            {/* Mockup Chart Area */}
            <div className="flex-1 flex flex-col justify-end relative">
              <div className="flex justify-between items-end px-4 border-b border-gray-100 pb-2">
                <div className="text-center">
                  <span className="text-xs font-bold text-slate-700 block">
                    87
                  </span>
                  <span className="text-xs text-gray-400">Jan</span>
                </div>
                <div className="text-center">
                  <span className="text-xs font-bold text-slate-700 block">
                    104
                  </span>
                  <span className="text-xs text-gray-400">Feb</span>
                </div>
                <div className="text-center">
                  <span className="text-xs font-bold text-slate-700 block">
                    91
                  </span>
                  <span className="text-xs text-gray-400">Mar</span>
                </div>
                <div className="text-center">
                  <span className="text-xs font-bold text-slate-700 block">
                    118
                  </span>
                  <span className="text-xs text-gray-400">Apr</span>
                </div>
                <div className="text-center">
                  <span className="text-xs font-bold text-slate-700 block">
                    -
                  </span>
                  <span className="text-xs text-gray-400">Mei</span>
                </div>
                <div className="text-center">
                  <span className="text-xs font-bold text-slate-700 block">
                    -
                  </span>
                  <span className="text-xs text-gray-400">Jun</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-6">
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3B5A9D] block"></span>{" "}
                Bulan aktif
              </span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-200 block"></span>{" "}
                Bulan lalu
              </span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-200 block"></span>{" "}
                Belum ada data
              </span>
            </div>
          </div>

          {/* Status Tiket */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-bold text-sm text-slate-800">Status Tiket</h4>
              <span className="bg-gray-50 text-gray-600 px-3 py-1 rounded-md text-[11px] font-bold">
                Bulan Ini
              </span>
            </div>
            <div className="flex items-center justify-between flex-1">
              {/* Mockup Donut Chart */}
              <div className="relative w-24 h-24 rounded-full border-[12px] border-gray-100 border-t-green-500 border-r-green-500 border-b-orange-400 border-l-red-400 flex items-center justify-center">
                <div className="text-center">
                  <span className="block font-bold text-lg text-slate-800 leading-none">
                    118
                  </span>
                  <span className="text-[9px] text-gray-400 block">tiket</span>
                </div>
              </div>

              {/* Legend List */}
              <div className="flex-1 ml-6 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 border border-green-500 rounded block"></span>{" "}
                    <span className="text-gray-600">Selesai</span>
                  </div>
                  <span className="font-bold text-green-600">40%</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 border border-orange-400 rounded block"></span>{" "}
                    <span className="text-gray-600">On Going</span>
                  </div>
                  <span className="font-bold text-orange-600">18%</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 border border-red-400 rounded block"></span>{" "}
                    <span className="text-gray-600">Pending</span>
                  </div>
                  <span className="font-bold text-red-600">17%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 3: Table and Sidebar Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tiket Terbaru Table (Span 2) */}
          <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h4 className="font-bold text-sm text-slate-800">
                Tiket Terbaru
              </h4>
              <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full block"></span>{" "}
                Live
              </span>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50/50 text-gray-400 text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3 font-semibold">NO. TIKET</th>
                  <th className="px-5 py-3 font-semibold">CUSTOMER</th>
                  <th className="px-5 py-3 font-semibold">LOKASI</th>
                  <th className="px-5 py-3 font-semibold">LAYANAN</th>
                  <th className="px-5 py-3 font-semibold">STATUS</th>
                  <th className="px-5 py-3 font-semibold">NOC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-5 py-4 font-bold text-slate-800">
                    TT250801300
                  </td>
                  <td className="px-5 py-4 text-gray-600">Bank KBI</td>
                  <td className="px-5 py-4 text-gray-600">KCP Kuningan</td>
                  <td className="px-5 py-4 text-gray-600">Lintasarta</td>
                  <td className="px-5 py-4">
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">
                      RTO
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-600">Ayman</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-bold text-slate-800">
                    TT250801301
                  </td>
                  <td className="px-5 py-4 text-gray-600">Bank KBI</td>
                  <td className="px-5 py-4 text-gray-600">
                    KCU Bandar Lampung
                  </td>
                  <td className="px-5 py-4 text-gray-600">Lintasarta</td>
                  <td className="px-5 py-4">
                    <span className="bg-red-50 text-red-500 px-3 py-1 rounded-full text-xs font-bold">
                      Down
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-600">Ayman</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-bold text-slate-800">
                    TT250801302
                  </td>
                  <td className="px-5 py-4 text-gray-600">Bank BRI</td>
                  <td className="px-5 py-4 text-gray-600">KCP Sudirman</td>
                  <td className="px-5 py-4 text-gray-600">Telkom</td>
                  <td className="px-5 py-4">
                    <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-bold">
                      On Going
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-600">Budi</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-bold text-slate-800">
                    TT250801303
                  </td>
                  <td className="px-5 py-4 text-gray-600">Bank Mandiri</td>
                  <td className="px-5 py-4 text-gray-600">KCU Makassar</td>
                  <td className="px-5 py-4 text-gray-600">Lintasarta</td>
                  <td className="px-5 py-4">
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">
                      RTO
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-600">Rina</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-bold text-slate-800">
                    TT250801304
                  </td>
                  <td className="px-5 py-4 text-gray-600">Bank BNI</td>
                  <td className="px-5 py-4 text-gray-600">KCP Depok</td>
                  <td className="px-5 py-4 text-gray-600">Icon+</td>
                  <td className="px-5 py-4">
                    <span className="bg-red-50 text-red-500 px-3 py-1 rounded-full text-xs font-bold">
                      Down
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-600">Sari</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-bold text-slate-800">
                    TT250801305
                  </td>
                  <td className="px-5 py-4 text-gray-600">Bank BRI</td>
                  <td className="px-5 py-4 text-gray-600">KCP Bogor Baru</td>
                  <td className="px-5 py-4 text-gray-600">Lintasarta</td>
                  <td className="px-5 py-4">
                    <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-bold">
                      Selesai
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-600">Dewi</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Right Column Stack (Manajemen User & Tiket per Layanan) */}
          <div className="flex flex-col gap-6">
            {/* Manajemen User */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-sm text-slate-800">
                  Manajemen User
                </h4>
                <button className="text-xs text-blue-600 font-bold hover:underline">
                  + Tambah
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center text-xs font-bold">
                    A
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 leading-none">
                      Admin
                    </p>
                    <span className="text-[9px] bg-purple-50 text-purple-600 px-2 py-0.5 rounded font-bold">
                      Super Admin
                    </span>
                  </div>
                </div>
                <button className="text-gray-400 bg-gray-50 w-6 h-6 rounded flex items-center justify-center hover:bg-gray-100">
                  ⋯
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#D97706] text-white flex items-center justify-center text-xs font-bold">
                    F
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 leading-none">
                      Fadlan
                    </p>
                    <span className="text-[9px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold">
                      NOC
                    </span>
                  </div>
                </div>
                <button className="text-gray-400 bg-gray-50 w-6 h-6 rounded flex items-center justify-center hover:bg-gray-100">
                  ⋯
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#65A30D] text-white flex items-center justify-center text-xs font-bold">
                    R
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 leading-none">
                      Rina
                    </p>
                    <span className="text-[9px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold">
                      NOC
                    </span>
                  </div>
                </div>
                <button className="text-gray-400 bg-gray-50 w-6 h-6 rounded flex items-center justify-center hover:bg-gray-100">
                  ⋯
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#7C3AED] text-white flex items-center justify-center text-xs font-bold">
                    S
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 leading-none">
                      Sari
                    </p>
                    <span className="text-[9px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold">
                      NOC
                    </span>
                  </div>
                </div>
                <button className="text-gray-400 bg-gray-50 w-6 h-6 rounded flex items-center justify-center hover:bg-gray-100">
                  ⋯
                </button>
              </div>

              <button className="w-full border border-dashed border-gray-300 text-gray-500 py-2 rounded-md text-xs font-bold hover:bg-gray-50 transition mt-2">
                + Tambah User Baru
              </button>
            </div>

            {/* Tiket per Layanan */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold text-sm text-slate-800">
                  Tiket per Layanan
                </h4>
                <span className="bg-gray-50 text-gray-600 px-3 py-1 rounded-md text-[11px] font-bold">
                  Bulan Ini
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-bold text-slate-700">Lintasarta</span>
                    <span className="text-gray-500">
                      61 tiket{" "}
                      <span className="font-bold text-slate-700 ml-1">52%</span>
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className="bg-[#1E3A8A] h-1.5 rounded-full"
                      style={{ width: "52%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-bold text-slate-700">Telkom</span>
                    <span className="text-gray-500">
                      33 tiket{" "}
                      <span className="font-bold text-slate-700 ml-1">28%</span>
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className="bg-[#EA580C] h-1.5 rounded-full"
                      style={{ width: "28%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-bold text-slate-700">Icon+</span>
                    <span className="text-gray-500">
                      15 tiket{" "}
                      <span className="font-bold text-slate-700 ml-1">13%</span>
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className="bg-gray-400 h-1.5 rounded-full"
                      style={{ width: "13%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-bold text-slate-700">Lainnya</span>
                    <span className="text-gray-500">
                      9 tiket{" "}
                      <span className="font-bold text-slate-700 ml-1">7%</span>
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className="bg-gray-300 h-1.5 rounded-full"
                      style={{ width: "7%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
