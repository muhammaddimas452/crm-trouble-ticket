import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/admin");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E9F0F7] px-4 sm:px-0">
      {/* Box diubah: w-full max-w-[450px], padding responsif p-8 sm:p-16 */}
      <div className="w-full max-w-[450px] bg-[#315293] p-8 sm:p-16 shadow-2xl">
        <form onSubmit={handleLogin} className="flex flex-col space-y-6">
          <div className="space-y-2">
            <label className="block text-white font-bold text-sm tracking-wide">
              Username
            </label>
            <input
              type="text"
              className="w-full h-11 bg-white border-none focus:outline-none focus:ring-2 focus:ring-blue-400 px-4"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-white font-bold text-sm tracking-wide">
              Password
            </label>
            <input
              type="password"
              className="w-full h-11 bg-white border-none focus:outline-none focus:ring-2 focus:ring-blue-400 px-4"
              required
            />
          </div>
          <div className="pt-4 flex justify-center">
            {/* Tombol lebar penuh di layar super kecil */}
            <button
              type="submit"
              className="w-full sm:w-auto bg-white text-[#315293] font-extrabold py-2 px-12 text-sm hover:bg-gray-100 transition-colors shadow-md"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
