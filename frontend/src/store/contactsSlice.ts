// frontend/src/store/contactsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Contact {
  id: number;
  name: string;
  phone: string;
  city?: string;
  company_id: number;
}

interface ContactsState {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
}

const initialState: ContactsState = {
  contacts: [],
  loading: false,
  error: null,
};

const API_BASE_URL = process.env.REACT_APP_API_URL;

// Thunk to fetch contacts
export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Contact[]>(`${API_BASE_URL}/contacts`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching contacts:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk to delete a contact
export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (id: number, { rejectWithValue }) => {
      try {
        // Make a DELETE request
        await axios.delete(`${API_BASE_URL}/contacts/${id}`);
        return id; // Return the id to remove it from the state
      } catch (error: any) {
        console.error('Error deleting contact:', error);
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );

// Thunk to add a contact
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact: Omit<Contact, 'id'>, { rejectWithValue }) => {
    try {
      const response = await axios.post<Contact>(`${API_BASE_URL}/contacts`, contact);
      return response.data;
    } catch (error: any) {
      console.error('Error adding contact:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk to update a contact
export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async (contact: Contact, { rejectWithValue }) => {
    try {
      const response = await axios.put<Contact>(`${API_BASE_URL}/contacts/${contact.id}`, contact);
      return response.data;
    } catch (error: any) {
      console.error('Error updating contact:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    // You can add synchronous reducers here if needed.
  },
  extraReducers: (builder) => {
    // Handle fetchContacts actions
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action: PayloadAction<Contact[]>) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
    // Handle addContact actions
      .addCase(addContact.fulfilled, (state, action: PayloadAction<Contact>) => {
        state.contacts.push(action.payload);
      })
    // Handle updateContact actions
      .addCase(updateContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContact.fulfilled, (state, action: PayloadAction<Contact>) => {
        state.loading = false;
        const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
        if (index !== -1) {
          state.contacts[index] = action.payload;
        }
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        // Remove contact with the given id
        state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });


  },
});

export default contactsSlice.reducer;
