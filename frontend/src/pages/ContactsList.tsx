// frontend/src/pages/ContactsList.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, Contact, deleteContact } from '../store/contactsSlice';
import { RootState, AppDispatch } from '../store/store';
import { Link } from 'react-router-dom';

const ContactsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { contacts, loading, error } = useSelector((state: RootState) => state.contacts);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = contacts.filter((contact: Contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    // Confirm before deleting
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await dispatch(deleteContact(id)).unwrap();
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Contacts</h1>
      <input
        type="text"
        placeholder="Search contacts by name..."
        className="border p-2 mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading && <p>Loading contacts...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {filteredContacts.map((contact) => (
          <li key={contact.id} className="mb-2">
            {contact.name} - {contact.phone} ({contact.city})
            <Link className="ml-2 text-blue-500" to={`/contacts/edit/${contact.id}`}>Edit</Link>
            <button className="ml-2 text-red-500" onClick={() => handleDelete(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactsList;
