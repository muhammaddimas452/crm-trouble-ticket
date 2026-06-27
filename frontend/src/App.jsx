import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

// Import semua halaman yang sudah dibuat
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import UserList from "./pages/UserList";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";
import OpenTicket from "./pages/OpenTicket";
import UpdateTicketList from "./pages/UpdateTicketList";
import UpdateTicketDetail from "./pages/UpdateTicketDetail";

function App() {
  return (
    // ⚠️ Gunakan basename "/" untuk Docker local environment
    <Router basename="/">
      <Routes>
        {/* Halaman Login tanpa Sidebar */}
        <Route path="/" element={<Login />} />

        {/* Halaman-halaman dengan Sidebar (Layout) */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />

        {/* Management User */}
        <Route path="/users" element={<UserList />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />

        {/* Management Tiket */}
        <Route path="/open-ticket" element={<OpenTicket />} />
        <Route path="/update-ticket" element={<UpdateTicketList />} />
        <Route path="/update-ticket/:id" element={<UpdateTicketDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
