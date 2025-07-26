import { createAsyncThunk } from '@reduxjs/toolkit';

interface LoginPayload {
  email: string;
  password: string;
  role?: 'Patient' | 'Admin';
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password, role = 'Patient' }: LoginPayload, { rejectWithValue }) => {
    // Simulate API call
    return new Promise<{ user: string; role: 'Patient' | 'Admin' }>((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          resolve({ user: email, role });
        } else {
          reject(rejectWithValue('Invalid credentials'));
        }
      }, 1000);
    });
  }
); 