// frontend/src/api/contacts.ts
import axios from 'axios';
import { Contact } from '../store/contactsSlice';

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const getContacts = async (): Promise<Contact[]> => {
  const response = await axios.get(`${API_BASE_URL}/contacts`);
  return response.data;
};

export const createContactAPI = async (contact: Omit<Contact, 'id'>): Promise<Contact> => {
  const response = await axios.post(`${API_BASE_URL}/contacts`, contact);
  return response.data;
};
