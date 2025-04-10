// frontend/src/pages/CompanyForm.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addCompany, updateCompany, Company } from '../store/companiesSlice';
import { AppDispatch } from '../store/store';

const CompanyForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>(); // If present, we’re in edit mode.
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Local form state for the company name
  const [name, setName] = useState('');

  // Fetch existing company data when in edit mode
  useEffect(() => {
    if (id) {
      axios
        .get<Company>(`${process.env.REACT_APP_API_URL}/companies/${id}`)
        .then(response => {
          setName(response.data.name);
        })
        .catch(error => {
          console.error('Error fetching company details:', error);
        });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        // Dispatch update action for edit mode.
        await dispatch(updateCompany({ id: Number(id), name })).unwrap();
      } else {
        // Dispatch add action for create mode.
        await dispatch(addCompany({ name })).unwrap();
      }
      navigate('/companies');
    } catch (error) {
      console.error('Error submitting company:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Company' : 'Add Company'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block mb-1">Name:</label>
          <input
            type="text"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          {id ? 'Update' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default CompanyForm;
