import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

// Import semua halaman yang sudah dibuat
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import UserList from "./pages/UserList";
import CreateUser from "./pages/CreateUser";
import OpenTicket from "./pages/OpenTicket";
import UpdateTicketList from "./pages/UpdateTicketList";
import UpdateTicketDetail from "./pages/UpdateTicketDetail";

function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman Login tanpa Sidebar */}
        <Route path="/crm-trouble-ticket/" element={<Login />} />

        {/* Halaman-halaman dengan Sidebar (Layout) */}
        <Route path="/crm-trouble-ticket/admin" element={<AdminDashboard />} />
        <Route
          path="/crm-trouble-ticket/user-dashboard"
          element={<UserDashboard />}
        />

        {/* Management User */}
        <Route path="/crm-trouble-ticket/users" element={<UserList />} />
        <Route
          path="/crm-trouble-ticket/create-user"
          element={<CreateUser />}
        />

        {/* Management Tiket */}
        <Route
          path="/crm-trouble-ticket/open-ticket"
          element={<OpenTicket />}
        />
        <Route
          path="/crm-trouble-ticket/update-ticket"
          element={<UpdateTicketList />}
        />
        <Route
          path="/crm-trouble-ticket/update-ticket/:id"
          element={<UpdateTicketDetail />}
        />
      </Routes>
    </Router>
  );
}

export default App;
