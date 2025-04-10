// frontend/src/pages/CompaniesList.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanies, Company, deleteCompany } from '../store/companiesSlice';
import { RootState, AppDispatch } from '../store/store';
import { Link } from 'react-router-dom';

const CompaniesList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { companies, loading, error } = useSelector((state: RootState) => state.companies);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      try {
        await dispatch(deleteCompany(id)).unwrap();
      } catch (error) {
        console.error('Error deleting company:', error);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Companies</h1>
      {loading && <p>Loading companies...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {companies.map((company: Company) => (
          <li key={company.id} className="mb-2">
            {company.name}
            <Link className="ml-2 text-blue-500" to={`/companies/edit/${company.id}`}>Edit</Link>
            <button className="ml-2 text-red-500" onClick={() => handleDelete(company.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompaniesList;
