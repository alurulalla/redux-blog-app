import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// const initialState = [
//   { id: '0', name: 'Aluru' },
//   { id: '1', name: 'Murali' },
//   { id: '2', name: 'Krishna' },
// ];

const initialState = {
  users: [],
  status: 'idle', // idle, loading, successeded, failed
  error: null,
};

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const users = await axios.get(USERS_URL);

  return users.data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const selectAllUsers = (state) => state.users.users;
export const selectUserById = (state, userId) =>
  state.users.users.find((user) => user.id === userId);

export default usersSlice.reducer;
