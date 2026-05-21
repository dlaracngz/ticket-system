import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/type";

interface RegisterState {
  user: User | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: RegisterState = {
  user: null,
  loading: false,
  error: null,
  success: false,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    registerSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
      state.success = true;
      state.error = null;
    },
    registerFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    resetRegister: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.user = null;
    },
  },
});

export const { registerStart, registerSuccess, registerFail, resetRegister } =
  registerSlice.actions;

export default registerSlice.reducer;
