import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../utils/api";
import { loginUser } from "../utils/auth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await apiPost("/login", { email, password });
      loginUser(data.token, data.user);
      
      // Redirect based on role
      if (data.user.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/user-dashboard");
      }
    } catch (err) {
      setError(err.message || "Email atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E9F0F7] px-4 sm:px-0">
      {/* Box diubah: w-full max-w-[450px], padding responsif p-8 sm:p-16 */}
      <div className="w-full max-w-[450px] bg-[#315293] p-8 sm:p-16 shadow-2xl">
        <form onSubmit={handleLogin} className="flex flex-col space-y-6">
          {error && (
            <div className="bg-red-500 text-white p-3 text-xs font-bold text-center">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <label className="block text-white font-bold text-sm tracking-wide">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 bg-white border-none focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 text-slate-800"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-white font-bold text-sm tracking-wide">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 bg-white border-none focus:outline-none focus:ring-2 focus:ring-blue-400 px-4 text-slate-800"
              required
            />
          </div>
          <div className="pt-4 flex justify-center">
            {/* Tombol lebar penuh di layar super kecil */}
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-white text-[#315293] font-extrabold py-2 px-12 text-sm hover:bg-gray-100 transition-colors shadow-md disabled:opacity-50"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
