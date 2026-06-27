import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { apiGet } from "../utils/api";

export default function UpdateTicketList() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const data = await apiGet("/tickets");
        // Show all tickets that are not closed
        const openTickets = data.filter((t) => t.status_laporan !== "Closed");
        setTickets(openTickets);
      } catch (err) {
        console.error("Gagal memuat tiket:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTickets();
  }, []);

  return (
    <Layout title="Update Tiket Gangguan">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
        <h3 className="font-bold text-lg text-slate-800">Daftar Tiket Aktif</h3>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center text-gray-500">
            Memuat data tiket...
          </div>
        ) : tickets.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center text-gray-500">
            Tidak ada tiket aktif saat ini.
          </div>
        ) : (
          tickets.map((t) => (
            <div key={t.ID} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-start gap-2">
              <h4 className="font-bold text-lg text-slate-800">{t.no_ticket}</h4>
              <p className="text-sm text-gray-500">Status: <span className="font-semibold text-blue-600">{t.status_laporan}</span></p>
              <p className="text-sm text-gray-500">Customer: {t.customer} ({t.lokasi})</p>
              <p className="text-sm text-gray-500 mb-2">
                Insiden: {t.insiden || "-"}
              </p>
              <Link to={`/update-ticket/${t.ID}`}>
                <button className="bg-[#3B82F6] hover:bg-blue-600 text-white text-xs font-medium py-2 px-6 rounded transition-colors cursor-pointer">
                  Update
                </button>
              </Link>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}
