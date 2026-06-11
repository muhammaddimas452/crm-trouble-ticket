import React from "react";
// ⚠️ Ganti BrowserRouter menjadi HashRouter
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

// Import semua halaman kamu di sini...

function App() {
  return (
    // ⚠️ Pada HashRouter, properti `basename` biasanya tidak diperlukan lagi
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/open-ticket" element={<OpenTicket />} />
        <Route path="/update-ticket" element={<UpdateTicketList />} />
        <Route path="/update-ticket/:id" element={<UpdateTicketDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
