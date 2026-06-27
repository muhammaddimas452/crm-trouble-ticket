import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { apiGet } from "../utils/api";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total_ticket: 0,
    open: 0,
    in_progress: 0,
    pending: 0,
    resolved: 0,
    closed: 0
  });
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const statsData = await apiGet("/dashboard");
        setStats(statsData);

        const ticketsData = await apiGet("/tickets");
        setTickets(ticketsData);

        const usersData = await apiGet("/users");
        setUsers(usersData);
      } catch (err) {
        console.error("Gagal mengambil data dashboard:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Hitung tiket per bulan secara dinamis
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth(); // 0-indexed
  const monthlyCounts = Array(12).fill(0);
  tickets.forEach((t) => {
    const dateStr = t.tanggal_ticket || t.CreatedAt;
    if (dateStr) {
      const d = new Date(dateStr);
      if (d.getFullYear() === currentYear) {
        monthlyCounts[d.getMonth()]++;
      }
    }
  });

  // Hitung status tiket secara dinamis
  const totalCount = tickets.length;
  const closedCount = tickets.filter((t) => t.status_laporan === "Closed").length;
  const ongoingCount = tickets.filter((t) => t.status_laporan === "In Progress" || t.status_laporan === "Open").length;
  const pendingCount = tickets.filter((t) => t.status_laporan === "Pending").length;

  const closedPercentage = totalCount > 0 ? Math.round((closedCount / totalCount) * 100) : 0;
  const ongoingPercentage = totalCount > 0 ? Math.round((ongoingCount / totalCount) * 100) : 0;
  const pendingPercentage = totalCount > 0 ? Math.round((pendingCount / totalCount) * 100) : 0;

  // Hitung tiket per layanan secara dinamis
  const serviceCounts = {};
  tickets.forEach((t) => {
    const service = t.layanan || "Lainnya";
    serviceCounts[service] = (serviceCounts[service] || 0) + 1;
  });

  const topServices = Object.keys(serviceCounts)
    .map((name) => {
      const count = serviceCounts[name];
      const percentage = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
      return { name, count, percentage };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

  const defaultServices = [
    { name: "Lintasarta", count: 0, percentage: 0 },
    { name: "Telkom", count: 0, percentage: 0 },
    { name: "Icon+", count: 0, percentage: 0 },
    { name: "Lainnya", count: 0, percentage: 0 }
  ];

  const displayServices = topServices.length > 0 ? topServices : defaultServices;

  const firstHalfMonths = [
    { name: "Jan", index: 0 },
    { name: "Feb", index: 1 },
    { name: "Mar", index: 2 },
    { name: "Apr", index: 3 },
    { name: "Mei", index: 4 },
    { name: "Jun", index: 5 }
  ];

  return (
    <Layout title="Dashboard Admin">
      <div className="space-y-6">
        {/* ROW 1: Top Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Total Tiket
                </p>
                <h3 className="text-4xl font-bold text-slate-800">{stats.total_ticket}</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center text-lg">
                📄
              </div>
            </div>
            <p className="text-xs font-semibold text-green-600 flex items-center gap-1">
              Statistik dari database
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  On Going
                </p>
                <h3 className="text-4xl font-bold text-red-500">{stats.in_progress}</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-lg">
                ❗
              </div>
            </div>
            <p className="text-xs font-semibold text-red-500 flex items-center gap-1">
              Tiket sedang dikerjakan
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Pending
                </p>
                <h3 className="text-4xl font-bold text-orange-500">{stats.pending}</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center text-lg">
                ⏱
              </div>
            </div>
            <p className="text-xs font-semibold text-orange-500 flex items-center gap-1">
              Tiket tertunda
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Selesai
                </p>
                <h3 className="text-4xl font-bold text-green-600">{stats.closed}</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-lg">
                ✓
              </div>
            </div>
            <p className="text-xs font-semibold text-green-600 flex items-center gap-1">
              Tiket sudah ditutup (Closed)
            </p>
          </div>
        </div>

        {/* ROW 2: Charts Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Tiket per Bulan (Span 2) */}
          <div className="col-span-1 lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
            <div className="flex justify-between items-center mb-10">
              <h4 className="font-bold text-sm text-slate-800">
                Tiket per Bulan
              </h4>
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-xs font-bold">
                {currentYear}
              </span>
            </div>

            {/* Dynamic Chart Area */}
            <div className="flex-1 flex flex-col justify-end relative">
              <div className="flex justify-between items-end px-4 border-b border-gray-100 pb-2">
                {firstHalfMonths.map((m) => {
                  const count = monthlyCounts[m.index];
                  const isFuture = m.index > currentMonth;
                  return (
                    <div key={m.name} className="text-center">
                      <span className="text-xs font-bold text-slate-700 block">
                        {isFuture ? "-" : count}
                      </span>
                      <span className="text-xs text-gray-400">{m.name}</span>
                    </div>
                  );
                })}
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
              {/* Dynamic Conic Donut Chart */}
              <div
                className="relative w-24 h-24 rounded-full flex items-center justify-center"
                style={{
                  background: totalCount > 0 
                    ? `conic-gradient(#16a34a 0% ${closedPercentage}%, #ef4444 ${closedPercentage}% ${closedPercentage + ongoingPercentage}%, #f97316 ${closedPercentage + ongoingPercentage}% 100%)`
                    : "#f3f4f6"
                }}
              >
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                  <div className="text-center">
                    <span className="block font-bold text-lg text-slate-800 leading-none">
                      {totalCount}
                    </span>
                    <span className="text-[9px] text-gray-400 block">tiket</span>
                  </div>
                </div>
              </div>

              {/* Legend List */}
              <div className="flex-1 ml-6 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 border border-green-500 rounded block bg-green-500"></span>{" "}
                    <span className="text-gray-600">Selesai</span>
                  </div>
                  <span className="font-bold text-green-600">{closedPercentage}%</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 border border-red-500 rounded block bg-red-500"></span>{" "}
                    <span className="text-gray-600">On Going</span>
                  </div>
                  <span className="font-bold text-red-500">{ongoingPercentage}%</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 border border-orange-400 rounded block bg-orange-400"></span>{" "}
                    <span className="text-gray-600">Pending</span>
                  </div>
                  <span className="font-bold text-orange-500">{pendingPercentage}%</span>
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
                {tickets.slice(0, 5).map((t) => (
                  <tr key={t.ID}>
                    <td className="px-5 py-4 font-bold text-slate-800">
                      {t.no_ticket}
                    </td>
                    <td className="px-5 py-4 text-gray-600">{t.customer}</td>
                    <td className="px-5 py-4 text-gray-600">{t.lokasi}</td>
                    <td className="px-5 py-4 text-gray-600">{t.layanan}</td>
                    <td className="px-5 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        t.status_laporan === "Closed"
                          ? "bg-green-50 text-green-600"
                          : t.status_laporan === "Pending"
                          ? "bg-orange-50 text-orange-600"
                          : "bg-red-50 text-red-500"
                      }`}>
                        {t.status_laporan}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-600">{t.konfirmasi_pic || "-"}</td>
                  </tr>
                ))}
                {tickets.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-5 py-8 text-center text-gray-400">
                      Belum ada tiket terdaftar.
                    </td>
                  </tr>
                )}
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
                <Link to="/create-user" className="text-xs text-blue-600 font-bold hover:underline">
                  + Tambah
                </Link>
              </div>

              {users.slice(0, 4).map((u) => {
                const initial = u.name ? u.name.charAt(0).toUpperCase() : "?";
                const bgColors = ["bg-[#1E3A8A]", "bg-[#D97706]", "bg-[#65A30D]", "bg-[#7C3AED]"];
                const colorIndex = u.ID % bgColors.length;
                return (
                  <div key={u.ID} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${bgColors[colorIndex]} text-white flex items-center justify-center text-xs font-bold`}>
                        {initial}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 leading-none">
                          {u.name}
                        </p>
                        <span className={`text-[9px] px-2 py-0.5 rounded font-bold ${u.role === "Admin" ? "bg-purple-50 text-purple-600" : "bg-blue-50 text-blue-600"}`}>
                          {u.role}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
              {users.length === 0 && (
                <div className="text-xs text-gray-400 text-center py-2">
                  Belum ada user.
                </div>
              )}

              <Link to="/create-user">
                <button className="w-full border border-dashed border-gray-300 text-gray-500 py-2 rounded-md text-xs font-bold hover:bg-gray-50 transition mt-2">
                  + Tambah User Baru
                </button>
              </Link>
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
                {displayServices.map((s, index) => {
                  const bgColors = ["bg-[#1E3A8A]", "bg-[#EA580C]", "bg-gray-400", "bg-gray-300"];
                  const colorClass = bgColors[index % bgColors.length];
                  return (
                    <div key={s.name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-bold text-slate-700">{s.name}</span>
                        <span className="text-gray-500">
                          {s.count} tiket{" "}
                          <span className="font-bold text-slate-700 ml-1">{s.percentage}%</span>
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div
                          className={`${colorClass} h-1.5 rounded-full`}
                          style={{ width: `${s.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
