// frontend/src/store/companiesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Company {
  id: number;
  name: string;
}

interface CompaniesState {
  companies: Company[];
  loading: boolean;
  error: string | null;
}

const initialState: CompaniesState = {
  companies: [],
  loading: false,
  error: null,
};

const API_BASE_URL = process.env.REACT_APP_API_URL;

// Thunk to fetch companies
export const fetchCompanies = createAsyncThunk(
  'companies/fetchCompanies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Company[]>(`${API_BASE_URL}/companies`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching companies:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk to delete a company
export const deleteCompany = createAsyncThunk(
    'companies/deleteCompany',
    async (id: number, { rejectWithValue }) => {
      try {
        await axios.delete(`${API_BASE_URL}/companies/${id}`);
        return id;
      } catch (error: any) {
        console.error('Error deleting company:', error);
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );

// Thunk to add a company
export const addCompany = createAsyncThunk(
  'companies/addCompany',
  async (company: Omit<Company, 'id'>, { rejectWithValue }) => {
    try {
      const response = await axios.post<Company>(`${API_BASE_URL}/companies`, company);
      return response.data;
    } catch (error: any) {
      console.error('Error adding company:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk to update a company
export const updateCompany = createAsyncThunk(
  'companies/updateCompany',
  async (company: Company, { rejectWithValue }) => {
    try {
      const response = await axios.put<Company>(`${API_BASE_URL}/companies/${company.id}`, company);
      return response.data;
    } catch (error: any) {
      console.error('Error updating company:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    // Define synchronous reducers here if needed.
  },
  extraReducers: (builder) => {
    builder
      // fetchCompanies handlers
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action: PayloadAction<Company[]>) => {
        state.loading = false;
        state.companies = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // addCompany handler
      .addCase(addCompany.fulfilled, (state, action: PayloadAction<Company>) => {
        state.companies.push(action.payload);
      })
      // updateCompany handlers
      .addCase(updateCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCompany.fulfilled, (state, action: PayloadAction<Company>) => {
        state.loading = false;
        const index = state.companies.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.companies[index] = action.payload;
        }
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // delete Company handlers
      .addCase(deleteCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCompany.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.companies = state.companies.filter(company => company.id !== action.payload);
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default companiesSlice.reducer;
