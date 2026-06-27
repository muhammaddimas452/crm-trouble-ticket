import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Link, useParams, useNavigate } from "react-router-dom";
import { apiGet, apiPut, apiPatch, apiPost } from "../utils/api";
import { getUser } from "../utils/auth";

export default function UpdateTicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [insiden, setInsiden] = useState("On Going");
  const [progress, setProgress] = useState("");
  const [perbaikan, setPerbaikan] = useState("");
  const [tanggalUp, setTanggalUp] = useState("");
  const [jamUp, setJamUp] = useState("");
  const [tanggalPending, setTanggalPending] = useState("");
  const [jamPending, setJamPending] = useState("");
  const [progressList, setProgressList] = useState([]);
  const [newProgressText, setNewProgressText] = useState("");
  const [editingProgressId, setEditingProgressId] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentUser = getUser();
  const userName = currentUser ? currentUser.name : "NOC User";

  const fetchProgressList = async () => {
    try {
      const data = await apiGet(`/tickets/${id}/progress`);
      setProgressList(data || []);
    } catch (err) {
      console.error("Gagal memuat riwayat progres:", err);
    }
  };

  useEffect(() => {
    async function fetchTicket() {
      try {
        const data = await apiGet(`/tickets/${id}`);
        setTicket(data);
        setInsiden(data.insiden || "On Going");
        setProgress(data.update_progress || "");
        setPerbaikan(data.perbaikan_gangguan || "");
        if (data.up_time) {
          const d = new Date(data.up_time);
          if (!isNaN(d.getTime())) {
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            setTanggalUp(`${year}-${month}-${day}`);
            
            const hour = String(d.getHours()).padStart(2, '0');
            const minute = String(d.getMinutes()).padStart(2, '0');
            setJamUp(`${hour}:${minute}`);
          }
        }
        if (data.batas_pending) {
          const d = new Date(data.batas_pending);
          if (!isNaN(d.getTime())) {
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            setTanggalPending(`${year}-${month}-${day}`);
            
            const hour = String(d.getHours()).padStart(2, '0');
            const minute = String(d.getMinutes()).padStart(2, '0');
            setJamPending(`${hour}:${minute}`);
          }
        }
        await fetchProgressList();
      } catch (err) {
        console.error("Gagal memuat tiket:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTicket();
  }, [id]);

  useEffect(() => {
    if (insiden === "Selesai") {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hour = String(now.getHours()).padStart(2, '0');
      const minute = String(now.getMinutes()).padStart(2, '0');
      
      if (!tanggalUp) setTanggalUp(`${year}-${month}-${day}`);
      if (!jamUp) setJamUp(`${hour}:${minute}`);
    } else if (insiden === "Pending") {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hour = String(now.getHours()).padStart(2, '0');
      const minute = String(now.getMinutes()).padStart(2, '0');
      
      if (!tanggalPending) setTanggalPending(`${year}-${month}-${day}`);
      if (!jamPending) setJamPending(`${hour}:${minute}`);
    }
  }, [insiden]);

  const handleSendProgress = async () => {
    if (!newProgressText.trim()) {
      alert("Teks progres tidak boleh kosong!");
      return;
    }

    try {
      if (editingProgressId) {
        await apiPut(`/tickets/${id}/progress/${editingProgressId}`, {
          user: userName,
          progress: newProgressText
        });
        setEditingProgressId(null);
      } else {
        await apiPost(`/tickets/${id}/progress`, {
          user: userName,
          progress: newProgressText
        });
      }

      setNewProgressText("");
      setProgress(newProgressText);
      await fetchProgressList();
    } catch (err) {
      alert("Gagal menyimpan progres: " + err.message);
    }
  };

  const handleEditProgress = (item) => {
    setEditingProgressId(item.ID);
    setNewProgressText(item.progress);
  };

  const handleCancelEdit = () => {
    setEditingProgressId(null);
    setNewProgressText("");
  };

  const formatProgressDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return "";
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      const hour = String(d.getHours()).padStart(2, '0');
      const minute = String(d.getMinutes()).padStart(2, '0');
      return `${day}/${month}/${year} (${hour}:${minute})`;
    } catch {
      return "";
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return "-";
      return d.toLocaleDateString("id-ID");
    } catch {
      return "-";
    }
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return "-";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return "-";
      return d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false });
    } catch {
      return "-";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (insiden === "Selesai") {
      if (!perbaikan.trim()) {
        alert("Informasi perbaikan gangguan wajib diisi jika status Selesai!");
        return;
      }
      if (!tanggalUp || !jamUp) {
        alert("Tanggal dan Jam Up Time wajib diisi jika status Selesai!");
        return;
      }
      const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!timeRegex.test(jamUp)) {
        alert("Format Jam Up Time tidak valid! Gunakan format 24 jam (misal 20:05).");
        return;
      }
    } else if (insiden === "Pending") {
      if (!tanggalPending || !jamPending) {
        alert("Tanggal dan Jam Batas Pending wajib diisi jika status Pending!");
        return;
      }
      const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!timeRegex.test(jamPending)) {
        alert("Format Jam Batas Pending tidak valid! Gunakan format 24 jam (misal 09:00).");
        return;
      }
    }

    try {
      const payload = {
        insiden: insiden,
        update_progress: progress,
        status_laporan: insiden === "Selesai" ? "Closed" : insiden === "Pending" ? "Pending" : "In Progress",
        konfirmasi_pic: userName,
        perbaikan_gangguan: insiden === "Selesai" ? perbaikan : "",
        up_time: insiden === "Selesai" && tanggalUp && jamUp ? new Date(`${tanggalUp}T${jamUp}:00`).toISOString() : null,
        batas_pending: insiden === "Pending" && tanggalPending && jamPending ? new Date(`${tanggalPending}T${jamPending}:00`).toISOString() : null
      };

      await apiPut(`/tickets/${id}`, payload);
      
      if (insiden === "Selesai") {
        await apiPatch(`/tickets/${id}/close`);
      }
      
      navigate("/update-ticket");
    } catch (err) {
      alert("Gagal memperbarui tiket: " + err.message);
    }
  };

  if (loading) {
    return (
      <Layout title="Update Tiket Gangguan">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center text-gray-500">
          Memuat detail tiket...
        </div>
      </Layout>
    );
  }

  if (!ticket) {
    return (
      <Layout title="Update Tiket Gangguan">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center text-red-500 font-bold">
          Tiket tidak ditemukan.
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Update Tiket Gangguan">
      <div className="max-w-full">
        {/* Header Section: Update Tiket Gangguan */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="p-5 flex items-center gap-3 border-b border-gray-50">
            <div className="text-blue-500 bg-blue-50/50 p-2 rounded-full border border-blue-100">
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
              Update Tiket Gangguan - {ticket.no_ticket}
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

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Detail Waktu & Pelaporan */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 flex items-center gap-2 border-b-2 border-blue-500 bg-gray-50/50">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3 className="font-bold text-sm text-slate-800">
                Detail Waktu & Pelaporan
              </h3>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Customer */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 mb-2">
                  Customer
                </label>
                <input
                  type="text"
                  value={ticket.customer || ""}
                  readOnly
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-gray-600 bg-gray-50/50 outline-none"
                />
              </div>

              {/* Lokasi */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 mb-2">
                  Lokasi
                </label>
                <input
                  type="text"
                  value={ticket.lokasi || ""}
                  readOnly
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-gray-600 bg-gray-50/50 outline-none"
                />
              </div>

              {/* Layanan */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 mb-2">
                  Layanan
                </label>
                <input
                  type="text"
                  value={ticket.layanan || ""}
                  readOnly
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-gray-600 bg-gray-50/50 outline-none"
                />
              </div>

              {/* Device */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 mb-2">
                  Device
                </label>
                <input
                  type="text"
                  value={ticket.device || ""}
                  readOnly
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-gray-600 bg-gray-50/50 outline-none"
                />
              </div>

              {/* Tanggal Down Time */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 mb-2">
                  Tanggal Down Time
                </label>
                <input
                  type="text"
                  value={formatDate(ticket.down_time)}
                  readOnly
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-gray-600 bg-gray-50/50 outline-none"
                />
              </div>

              {/* Konfirm By */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 mb-2">
                  PIC Pembuat Tiket
                </label>
                <input
                  type="text"
                  value={ticket.konfirmasi_pic || "-"}
                  readOnly
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-gray-600 bg-gray-50/50 outline-none"
                />
              </div>

              {/* Jam Down Time */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 mb-2">
                  Jam Down Time
                </label>
                <input
                  type="text"
                  value={formatTime(ticket.down_time)}
                  readOnly
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-gray-600 bg-gray-50/50 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Update Progres */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 flex items-center gap-2 border-b-2 border-blue-500 bg-gray-50/50">
              <svg
                className="w-4 h-4 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
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
                  <span
                    onClick={() => setInsiden("On Going")}
                    className={`px-6 py-1.5 rounded-full text-xs font-semibold cursor-pointer shadow-sm transition-colors ${
                      insiden === "On Going"
                        ? "bg-[#EA580C] text-white"
                        : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    On Going
                  </span>
                  <span
                    onClick={() => setInsiden("Pending")}
                    className={`px-6 py-1.5 rounded-full text-xs font-semibold cursor-pointer shadow-sm transition-colors ${
                      insiden === "Pending"
                        ? "bg-[#EAB308] text-white"
                        : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Pending
                  </span>
                  <span
                    onClick={() => setInsiden("Selesai")}
                    className={`px-6 py-1.5 rounded-full text-xs font-semibold cursor-pointer shadow-sm transition-colors ${
                      insiden === "Selesai"
                        ? "bg-[#22C55E] text-white"
                        : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Selesai
                  </span>
                </div>
              </div>

              {/* Riwayat Update Progres (Progress History bubbles) */}
              <div className="mb-6">
                <label className="block text-[11px] font-bold text-gray-600 mb-3">
                  Riwayat Progres Tiket
                </label>
                <div className="space-y-3 mb-6 max-h-[300px] overflow-y-auto pr-1">
                  {progressList.map((item) => (
                    <div key={item.ID} className="flex items-center gap-3 w-full">
                      <div className="flex-1 bg-blue-50/50 border border-blue-100/60 p-4 rounded-xl shadow-sm text-slate-700 text-sm flex justify-between items-start">
                        <div>
                          <span className="font-semibold text-blue-700">
                            {formatProgressDate(item.CreatedAt)} by {item.user} :
                          </span>{" "}
                          <span className="text-slate-600">{item.progress}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleEditProgress(item)}
                        className="w-10 h-10 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg flex items-center justify-center text-blue-600 transition-colors cursor-pointer shrink-0"
                      >
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  {progressList.length === 0 && (
                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-center text-gray-400 text-sm">
                      Belum ada riwayat update progres.
                    </div>
                  )}
                </div>

                {/* Box Tambah/Edit Progres */}
                <div className="bg-slate-50 border border-gray-200 rounded-xl p-5 space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <span className="font-bold text-xs text-slate-800 uppercase tracking-wider">
                      {editingProgressId ? "Edit Update Progres" : "Tambah Update Progres"}
                    </span>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 mb-1.5 uppercase">
                      NOC
                    </label>
                    <input
                      type="text"
                      value={userName}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-200 rounded-md text-xs text-gray-600 bg-gray-100 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 mb-1.5 uppercase">
                      Tulis progres terbaru...
                    </label>
                    <textarea
                      rows="3"
                      value={newProgressText}
                      onChange={(e) => setNewProgressText(e.target.value)}
                      placeholder="Masukkan update progres terbaru..."
                      className="w-full px-3 py-2 border border-gray-200 rounded-md text-xs text-gray-700 bg-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    ></textarea>
                  </div>

                  <div className="flex justify-end gap-2">
                    {editingProgressId && (
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="px-4 py-1.5 border border-gray-300 text-gray-600 rounded text-xs font-semibold hover:bg-gray-100 transition"
                      >
                        Batal
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleSendProgress}
                      className="px-4 py-1.5 bg-blue-600 text-white rounded text-xs font-semibold hover:bg-blue-700 transition"
                    >
                      {editingProgressId ? "Simpan Perubahan" : "Kirim Update"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Dinamik Perbaikan & Up Time */}
              {insiden === "Selesai" && (
                <div className="space-y-6 border-t border-gray-100 pt-6 mt-6 mb-6">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-2">
                      Perbaikan Gangguan <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows="4"
                      value={perbaikan}
                      onChange={(e) => setPerbaikan(e.target.value)}
                      placeholder="Masukkan detail perbaikan gangguan..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
                      required
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 mb-2">
                        Tanggal Up Time <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={tanggalUp}
                        onChange={(e) => setTanggalUp(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-slate-800 bg-white focus:border-blue-500 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 mb-2">
                        Jam Up Time (HH:MM - format 24 jam) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        pattern="^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"
                        placeholder="Contoh: 20:05"
                        value={jamUp}
                        onChange={(e) => setJamUp(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-slate-800 bg-white focus:border-blue-500 outline-none"
                        required
                      />
                      <p className="text-[10px] text-gray-400 mt-1">Gunakan format 24 jam (misal 20:05 untuk jam 8.05 malam)</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Dinamik Batas Waktu Pending */}
              {insiden === "Pending" && (
                <div className="space-y-6 border-t border-gray-100 pt-6 mt-6 mb-6">
                  <div className="bg-[#1E2235] text-white p-4 rounded-t-xl font-bold text-sm">
                    Batas Waktu Pending
                  </div>
                  <div className="bg-white border border-t-0 border-gray-200 rounded-b-xl p-6 space-y-6 -mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 mb-2">
                          Tanggal Batas Pending <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          value={tanggalPending}
                          onChange={(e) => setTanggalPending(e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-slate-800 bg-white focus:border-blue-500 outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 mb-2">
                          Jam Batas Pending (HH:MM - format 24 jam) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          pattern="^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"
                          placeholder="Contoh: 09:00"
                          value={jamPending}
                          onChange={(e) => setJamPending(e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-slate-800 bg-white focus:border-blue-500 outline-none"
                          required
                        />
                        <p className="text-[10px] text-gray-400 mt-1">Gunakan format 24 jam (misal 09:00 untuk jam 9 pagi)</p>
                      </div>
                    </div>

                    <div className="bg-blue-50/70 border border-blue-100/60 p-4 rounded-lg text-slate-700 text-xs font-semibold">
                      Batas waktu pending: {tanggalPending || "YYYY-MM-DD"} {jamPending || "HH:MM"}:00
                    </div>
                  </div>
                </div>
              )}

              {/* Bawah: Konfirm & Waktu */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 mb-2">
                    Konfirm By (Progres)
                  </label>
                  <input
                    type="text"
                    value={userName}
                    readOnly
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-gray-600 bg-gray-50/50 outline-none"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 mb-2">
                    Waktu Update Sekarang
                  </label>
                  <input
                    type="text"
                    value={new Date().toLocaleString("id-ID", { hour12: false })}
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
                className="px-6 py-2.5 border border-red-500 text-red-500 rounded-md text-sm font-semibold hover:bg-red-50 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                ✕ Batal
              </button>
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#10B981] text-white rounded-md text-sm font-semibold hover:bg-emerald-600 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              ✓ Simpan Update
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
