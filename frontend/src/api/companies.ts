// frontend/src/api/companies.ts
import axios from 'axios';
import { Company } from '../store/companiesSlice';

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const getCompanies = async (): Promise<Company[]> => {
  const response = await axios.get(`${API_BASE_URL}/companies`);
  return response.data;
};

export const createCompanyAPI = async (company: Omit<Company, 'id'>): Promise<Company> => {
  const response = await axios.post(`${API_BASE_URL}/companies`, company);
  return response.data;
};
