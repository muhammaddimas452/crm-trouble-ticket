import React, { useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../utils/api";
import { getUser } from "../utils/auth";

export default function OpenTicket() {
  const navigate = useNavigate();
  const currentUser = getUser();
  const userName = currentUser ? currentUser.name : "NOC User";

  const [customer, setCustomer] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [layanan, setLayanan] = useState("");
  const [device, setDevice] = useState("");
  const [tanggalDown, setTanggalDown] = useState("");
  const [jamDown, setJamDown] = useState("");
  const [insiden, setInsiden] = useState("On Going");
  const [progress, setProgress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tanggalDown || !jamDown) {
      alert("Tanggal dan Jam Down Time wajib diisi!");
      return;
    }

    setLoading(true);
    try {
      const combinedDownTime = new Date(`${tanggalDown}T${jamDown}:00`).toISOString();
      const payload = {
        customer,
        lokasi,
        layanan,
        device,
        down_time: combinedDownTime,
        insiden,
        update_progress: progress,
        status_laporan: insiden === "Selesai" ? "Closed" : insiden === "Pending" ? "Pending" : "Open",
        konfirmasi_pic: userName
      };

      await apiPost("/tickets", payload);
      alert("Tiket gangguan berhasil dibuat!");
      
      if (currentUser?.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/user-dashboard");
      }
    } catch (err) {
      alert("Gagal membuat tiket: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Open Tiket Gangguan">
      <form onSubmit={handleSubmit} className="space-y-6">
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
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                placeholder="Masukkan customer..."
                className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:border-blue-500 text-slate-800 bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">
                Lokasi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={lokasi}
                onChange={(e) => setLokasi(e.target.value)}
                placeholder="Masukkan lokasi..."
                className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:border-blue-500 text-slate-800 bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">
                Layanan <span className="text-red-500">*</span>
              </label>
              <select
                value={layanan}
                onChange={(e) => setLayanan(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-sm bg-white text-slate-800 focus:border-blue-500 outline-none"
                required
              >
                <option value="">Pilih layanan...</option>
                <option value="Lintasarta">Lintasarta</option>
                <option value="Telkom">Telkom</option>
                <option value="Icon+">Icon+</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">
                Device <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={device}
                onChange={(e) => setDevice(e.target.value)}
                placeholder="Masukkan device..."
                className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:border-blue-500 text-slate-800 bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">
                Tanggal Down Time <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={tanggalDown}
                onChange={(e) => setTanggalDown(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-sm text-slate-800 bg-white focus:border-blue-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">
                Konfirm By
              </label>
              <input
                type="text"
                value={userName}
                readOnly
                className="w-full px-3 py-2 border rounded-md text-sm bg-gray-50 text-gray-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">
                Jam Down Time (HH:MM - format 24 jam) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                pattern="^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"
                placeholder="Contoh: 20:01"
                value={jamDown}
                onChange={(e) => setJamDown(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-sm text-slate-800 bg-white focus:border-blue-500 outline-none"
                required
              />
              <p className="text-[10px] text-gray-400 mt-1">Gunakan format 24 jam (misal 20:01 untuk jam 8 malam)</p>
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
                <span
                  onClick={() => setInsiden("On Going")}
                  className={`px-4 py-1 rounded-full text-xs font-semibold cursor-pointer transition ${
                    insiden === "On Going"
                      ? "bg-orange-500 text-white"
                      : "border border-orange-500 text-orange-500"
                  }`}
                >
                  On Going
                </span>
                <span
                  onClick={() => setInsiden("Pending")}
                  className={`px-4 py-1 rounded-full text-xs font-semibold cursor-pointer transition ${
                    insiden === "Pending"
                      ? "bg-yellow-500 text-white"
                      : "border border-yellow-500 text-yellow-600"
                  }`}
                >
                  Pending
                </span>
                <span
                  onClick={() => setInsiden("Selesai")}
                  className={`px-4 py-1 rounded-full text-xs font-semibold cursor-pointer transition ${
                    insiden === "Selesai"
                      ? "bg-green-50 text-green-600 bg-green-500 text-white"
                      : "border border-green-500 text-green-600"
                  }`}
                >
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
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
                placeholder="Masukkan detail progres..."
                className="w-full px-3 py-2 border rounded-md text-sm text-slate-800 bg-white outline-none focus:border-blue-500"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 border border-gray-300 text-gray-600 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-[#10B981] text-white rounded-md text-sm font-medium hover:bg-emerald-600 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Menyimpan..." : "✓ Simpan Tiket"}
          </button>
        </div>
      </form>
    </Layout>
  );
}
