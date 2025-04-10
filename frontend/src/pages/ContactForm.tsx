// frontend/src/pages/ContactForm.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, updateContact, Contact } from '../store/contactsSlice';
import { fetchCompanies } from '../store/companiesSlice';
import { RootState, AppDispatch } from '../store/store';

const ContactForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();  // Optional parameter; if present, edit mode
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Extract companies data from the Redux store
  const { companies, loading: loadingCompanies, error: companiesError } = useSelector(
    (state: RootState) => state.companies
  );

  // Set up local form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    company_id: 0,
  });

  // Fetch companies if not already loaded
  useEffect(() => {
    if (companies.length === 0) {
      dispatch(fetchCompanies());
    }
  }, [dispatch, companies.length]);

  // If in edit mode, fetch the existing contact details and populate the form state
  useEffect(() => {
    if (id) {
      axios
        .get<Contact>(`${process.env.REACT_APP_API_URL}/contacts/${id}`)
        .then(response => {
          const contact = response.data;
          setFormData({
            name: contact.name,
            phone: contact.phone,
            city: contact.city || '',
            company_id: contact.company_id, // prefill the company dropdown with the contact's company id
          });
        })
        .catch(error => {
          console.error('Error fetching contact details:', error);
        });
    }
  }, [id]);

  // Update state when user changes any input field or the select dropdown
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'company_id' ? Number(value) : value,
    }));
  };

  // Handle form submission for both create and edit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (id) {
        // In edit mode, dispatch an update action
        await dispatch(updateContact({ id: Number(id), ...formData })).unwrap();
      } else {
        // In create mode, dispatch an add action
        await dispatch(addContact(formData)).unwrap();
      }
      navigate('/');
    } catch (error) {
      console.error('Error submitting contact:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Contact' : 'Add Contact'}</h1>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-2">
          <label className="block mb-1">Name:</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        {/* Phone Field */}
        <div className="mb-2">
          <label className="block mb-1">Phone:</label>
          <input
            type="text"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        {/* City Field */}
        <div className="mb-2">
          <label className="block mb-1">City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        {/* Company Dropdown */}
        <div className="mb-2">
          <label className="block mb-1">Company:</label>
          {loadingCompanies ? (
            <p>Loading companies...</p>
          ) : companiesError ? (
            <p>Error loading companies: {companiesError}</p>
          ) : (
            <select
              name="company_id"
              required
              value={formData.company_id}
              onChange={handleChange}
              className="border p-2 w-full"
            >
              <option value={0}>Select a Company</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          )}
        </div>
        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          {id ? 'Update' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
