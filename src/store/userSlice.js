import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../utils/api';

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const response = await axios.get('/users');
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: { users: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch users';
      });
  },
});

export default userSlice.reducer;
