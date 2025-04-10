// frontend/src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ContactsList from "./pages/ContactsList";
import ContactForm from "./pages/ContactForm";
import CompaniesList from "./pages/CompaniesList";
import CompanyForm from "./pages/CompanyForm";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="max-w-6xl mx-auto p-6">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center text-blue-700 mb-4">
            PingCRM Dashboard
          </h1>
          <nav className="flex flex-wrap justify-center space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-600 text-white px-4 py-2 rounded-md"
                  : "text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-md"
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/contacts"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-600 text-white px-4 py-2 rounded-md"
                  : "text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-md"
              }
            >
              Contacts
            </NavLink>
            <NavLink
              to="/contacts/new"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-600 text-white px-4 py-2 rounded-md"
                  : "text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-md"
              }
            >
              Add Contact
            </NavLink>
            <NavLink
              to="/companies"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-600 text-white px-4 py-2 rounded-md"
                  : "text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-md"
              }
            >
              Companies
            </NavLink>
            <NavLink
              to="/companies/new"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-600 text-white px-4 py-2 rounded-md"
                  : "text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-md"
              }
            >
              Add Company
            </NavLink>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/contacts" element={<ContactsList />} />
          <Route path="/contacts/new" element={<ContactForm />} />
          <Route path="/contacts/edit/:id" element={<ContactForm />} />
          <Route path="/companies" element={<CompaniesList />} />
          <Route path="/companies/new" element={<CompanyForm />} />
          <Route path="/companies/edit/:id" element={<CompanyForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
