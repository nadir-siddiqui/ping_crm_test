// frontend/src/pages/Dashboard.tsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts, Contact } from "../store/contactsSlice";
import { fetchCompanies, Company } from "../store/companiesSlice";
import { RootState, AppDispatch } from "../store/store";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { contacts, loading: contactsLoading, error: contactsError } = useSelector(
    (state: RootState) => state.contacts
  );
  const { companies, loading: companiesLoading, error: companiesError } = useSelector(
    (state: RootState) => state.companies
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(0);

  useEffect(() => {
    dispatch(fetchContacts());
    dispatch(fetchCompanies());
  }, [dispatch]);

  const filteredContacts = contacts.filter((contact: Contact) => {
    const nameMatch = contact.name.toLowerCase().includes(searchTerm.toLowerCase());
    const companyMatch =
      selectedCompany === 0 || contact.company_id === selectedCompany;
    return nameMatch && companyMatch;
  });

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Dashboard</h1>

      <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Search by contact name..."
          className="border rounded-md px-4 py-2 w-full sm:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(Number(e.target.value))}
          className="border rounded-md px-4 py-2 w-full sm:w-1/3"
        >
          <option value={0}>All Companies</option>
          {companies.map((company: Company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
      </div>

      {(contactsLoading || companiesLoading) && <p className="text-center">Loading data...</p>}
      {(contactsError || companiesError) && (
        <p className="text-center text-red-500">
          Error: {contactsError || companiesError}
        </p>
      )}

      {filteredContacts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Phone</th>
                <th className="border px-4 py-2 text-left">City</th>
                <th className="border px-4 py-2 text-left">Company</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact: Contact) => {
                const company = companies.find((c: Company) => c.id === contact.company_id);
                return (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{contact.name}</td>
                    <td className="border px-4 py-2">{contact.phone}</td>
                    <td className="border px-4 py-2">{contact.city}</td>
                    <td className="border px-4 py-2">{company ? company.name : "N/A"}</td>
                    <td className="border px-4 py-2">
                      <Link to={`/contacts/edit/${contact.id}`} className="text-blue-600 hover:underline">
                        Edit
                      </Link>
                      {/* You can add a delete button if needed */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No contacts match your search criteria.</p>
      )}
    </div>
  );
};

export default Dashboard;
