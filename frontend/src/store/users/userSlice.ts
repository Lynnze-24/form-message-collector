import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  id: string;
  email: string;
  token: string;
}

// Get user from localStorage
const userData: string | null = localStorage.getItem('user');

const initialState: {
  data: UserState | null;
} = {
  data: userData ? JSON.parse(userData) : null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.data = null;
      localStorage.removeItem('user');
    },
    setUser: (state, action: PayloadAction<UserState>) => {
      state.data = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
  },
});

// Action creators are generated for each case reducer function
export const { resetUser, setUser } = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
