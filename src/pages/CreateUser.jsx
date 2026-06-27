import React, { useState } from "react";
import Layout from "../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { apiPost } from "../utils/api";

export default function CreateUser() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("NOC");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password konfirmasi tidak cocok!");
      return;
    }
    if (password.length < 6) {
      alert("Password minimal 6 karakter!");
      return;
    }

    setLoading(true);
    try {
      await apiPost("/register", {
        name,
        email,
        password,
        role
      });
      alert("User baru berhasil didaftarkan!");
      navigate("/users");
    } catch (err) {
      alert("Gagal membuat user: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Buat User">
      <div className="max-w-full">
        {/* Header Section: Buat User */}
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
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
            </div>
            <h3 className="font-bold text-lg text-slate-800">Buat User</h3>
          </div>
          <div className="px-5 pt-3">
            <div className="inline-block border-b-2 border-blue-600 pb-3 px-1">
              <span className="text-sm font-medium text-blue-600">
                Informasi User
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Identitas User */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 flex items-center gap-2 border-b border-[#3B82F6] bg-gray-50/50">
              <svg
                className="w-4 h-4 text-[#3B82F6]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <h3 className="font-bold text-sm text-[#3B82F6]">
                Identitas User
              </h3>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Nama Lengkap */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-505 uppercase tracking-wide mb-2">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama lengkap"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 bg-gray-50/30 text-slate-800"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-505 uppercase tracking-wide mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contoh@email.com"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 bg-gray-50/30 text-slate-800"
                  required
                />
              </div>

              {/* Role Dropdown */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-505 uppercase tracking-wide mb-2">
                  Role Akses <span className="text-red-500">*</span>
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm bg-white focus:outline-none focus:border-blue-500 text-slate-800"
                  required
                >
                  <option value="NOC">NOC</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Kata Sandi */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 flex items-center gap-2 border-b border-[#3B82F6] bg-gray-50/50">
              <svg
                className="w-4 h-4 text-[#3B82F6]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <h3 className="font-bold text-sm text-[#3B82F6]">Kata Sandi</h3>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Password */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-505 uppercase tracking-wide mb-2">
                  PASSWORD <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimal 6 karakter"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 bg-gray-50/30 pr-10 text-slate-800"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Konfirmasi Password */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-505 uppercase tracking-wide mb-2">
                  KONFIRMASI PASSWORD <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ulangi password"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 bg-gray-50/30 pr-10 text-slate-800"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons Container */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-end gap-3 mt-8">
            <Link to="/users">
              <button
                type="button"
                className="px-6 py-2.5 border border-red-500 text-red-500 rounded-md text-sm font-semibold hover:bg-red-50 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                ✕ Batal
              </button>
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-[#10B981] text-white rounded-md text-sm font-semibold hover:bg-emerald-600 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {loading ? "Menyimpan..." : "✓ Simpan User"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
