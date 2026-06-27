import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiGet, apiPut } from "../utils/api";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("NOC");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await apiGet(`/users/${id}`);
        setName(data.name || "");
        setEmail(data.email || "");
        setRole(data.role || "NOC");
      } catch (err) {
        alert("Gagal memuat detail user: " + err.message);
        navigate("/users");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password) {
      if (password !== confirmPassword) {
        alert("Password konfirmasi tidak cocok!");
        return;
      }
      if (password.length < 6) {
        alert("Password minimal 6 karakter!");
        return;
      }
    }

    setSubmitting(true);
    try {
      const payload = {
        name,
        email,
        role
      };
      if (password) {
        payload.password = password;
      }
      
      await apiPut(`/users/${id}`, payload);
      alert("User berhasil diperbarui!");
      navigate("/users");
    } catch (err) {
      alert("Gagal memperbarui user: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Layout title="Edit User">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center text-gray-500">
          Memuat data user...
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Edit User">
      <div className="max-w-full">
        {/* Header Section: Edit User */}
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
            <h3 className="font-bold text-lg text-slate-800">Edit User</h3>
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
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 mb-2">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama lengkap..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-slate-800 bg-white focus:border-blue-500 outline-none"
                  required
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan alamat email..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-slate-800 bg-white focus:border-blue-500 outline-none"
                  required
                />
              </div>

              {/* Role */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 mb-2">
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-slate-800 bg-white focus:border-blue-500 outline-none"
                  required
                >
                  <option value="Admin">Admin</option>
                  <option value="NOC">NOC</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Password */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 flex items-center gap-2 border-b border-[#EF4444] bg-gray-50/50">
              <svg
                className="w-4 h-4 text-[#EF4444]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <h3 className="font-bold text-sm text-[#EF4444]">
                Ubah Password (Opsional)
              </h3>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Password Baru */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 mb-2">
                  Password Baru
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Kosongkan jika tidak diubah..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-slate-800 bg-white focus:border-blue-500 outline-none"
                />
              </div>

              {/* Konfirmasi Password */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 mb-2">
                  Konfirmasi Password Baru
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Kosongkan jika tidak diubah..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-slate-800 bg-white focus:border-blue-500 outline-none"
                />
              </div>

              {/* Show Password Checkbox */}
              <div className="md:col-span-2 flex items-center gap-2">
                <input
                  id="showPasswordCheckbox"
                  type="checkbox"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="showPasswordCheckbox" className="text-xs text-slate-600 select-none cursor-pointer">
                  Tampilkan Password
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
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
              disabled={submitting}
              className="px-6 py-2.5 bg-[#10B981] text-white rounded-md text-sm font-semibold hover:bg-emerald-600 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {submitting ? "Menyimpan..." : "✓ Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
