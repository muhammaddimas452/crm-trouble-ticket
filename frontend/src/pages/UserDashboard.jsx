import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { apiGet } from "../utils/api";
import { getUser } from "../utils/auth";

export default function UserDashboard() {
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const currentUser = getUser();
  const userName = currentUser ? currentUser.name : "User";

  useEffect(() => {
    async function fetchTickets() {
      try {
        const data = await apiGet("/tickets");
        setTickets(data);
      } catch (err) {
        console.error("Gagal mengambil data tiket:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTickets();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return "-";
      return d.toLocaleString("id-ID", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });
    } catch {
      return "-";
    }
  };

  const calculateDuration = (downStr, upStr) => {
    if (!downStr || !upStr) return "-";
    try {
      const down = new Date(downStr);
      const up = new Date(upStr);
      if (isNaN(down.getTime()) || isNaN(up.getTime())) return "-";
      const diffMs = up - down;
      if (diffMs < 0) return "-";
      
      const diffMins = Math.floor(diffMs / 60000);
      const hours = Math.floor(diffMins / 60);
      const mins = diffMins % 60;
      
      if (hours > 0) {
        return `${hours} jam ${mins} menit`;
      }
      return `${mins} menit`;
    } catch {
      return "-";
    }
  };

  const filteredTickets = tickets.filter((t) => {
    const term = searchTerm.toLowerCase();
    return (
      (t.no_ticket && t.no_ticket.toLowerCase().includes(term)) ||
      (t.customer && t.customer.toLowerCase().includes(term)) ||
      (t.lokasi && t.lokasi.toLowerCase().includes(term)) ||
      (t.device && t.device.toLowerCase().includes(term)) ||
      (t.layanan && t.layanan.toLowerCase().includes(term)) ||
      (t.insiden && t.insiden.toLowerCase().includes(term))
    );
  });

  const stats = {
    total: tickets.length,
    onGoing: tickets.filter(t => t.insiden === "On Going").length,
    pending: tickets.filter(t => t.insiden === "Pending").length,
    selesai: tickets.filter(t => t.insiden === "Selesai" || t.status_laporan === "Closed").length
  };

  return (
    <Layout
      title="Dashboard Laporan Tiket Gangguan"
      subtitle={`Selamat datang ${userName} di halaman Dashboard Laporan Tiket Gangguan`}
    >
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mb-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Total Tiket
              </p>
              <h3 className="text-4xl font-bold text-slate-800">{stats.total}</h3>
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
              <h3 className="text-4xl font-bold text-red-500">{stats.onGoing}</h3>
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
              <h3 className="text-4xl font-bold text-green-600">{stats.selesai}</h3>
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder-gray-400 px-2"
          />
        </div>

        {/* Tabel Data Tiket */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
          <table className="w-full min-w-max text-sm text-left">
            <thead className="bg-[#1E2235] text-white text-xs">
              <tr>
                <th className="px-4 py-4 font-semibold w-14">No</th>
                <th className="px-4 py-4 font-semibold">No. Tiket</th>
                <th className="px-4 py-4 font-semibold">Tanggal</th>
                <th className="px-4 py-4 font-semibold">Customer</th>
                <th className="px-4 py-4 font-semibold">Lokasi</th>
                <th className="px-4 py-4 font-semibold">Device</th>
                <th className="px-4 py-4 font-semibold">Layanan</th>
                <th className="px-4 py-4 font-semibold">Down Time</th>
                <th className="px-4 py-4 font-semibold">Up Time</th>
                <th className="px-4 py-4 font-semibold">Durasi</th>
                <th className="px-4 py-4 font-semibold">Insiden</th>
                <th className="px-4 py-4 font-semibold">Perbaikan Gangguan</th>
                <th className="px-4 py-4 font-semibold">Update Progres</th>
                <th className="px-4 py-4 font-semibold">PIC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="14" className="px-4 py-8 text-center text-gray-400">
                    Memuat data tiket...
                  </td>
                </tr>
              ) : filteredTickets.map((t, index) => (
                <tr key={t.ID} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="bg-gray-100 text-gray-600 text-xs font-bold w-6 h-6 flex items-center justify-center rounded">
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-800">
                    {t.no_ticket}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">
                    {formatDate(t.tanggal_ticket)}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{t.customer}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs">
                    {t.lokasi}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{t.device}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{t.layanan}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs">
                    {formatDate(t.down_time)}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">
                    {formatDate(t.up_time)}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs font-semibold">
                    {calculateDuration(t.down_time, t.up_time)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                      t.insiden === "Down"
                        ? "bg-red-50 text-red-500"
                        : t.insiden === "Selesai" || t.status_laporan === "Closed"
                        ? "bg-green-50 text-green-600"
                        : "bg-blue-50 text-blue-600"
                    }`}>
                      {t.insiden || "-"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">
                    {t.perbaikan_gangguan || "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-[11px]">
                    {t.update_progress || "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs font-semibold">
                    {t.konfirmasi_pic || "-"}
                  </td>
                </tr>
              ))}
              {!loading && filteredTickets.length === 0 && (
                <tr>
                  <td colSpan="14" className="px-4 py-8 text-center text-gray-400">
                    Tidak ada data tiket ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
