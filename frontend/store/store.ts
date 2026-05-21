import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./slices/registerSlice";
import authReducer from "./slices/authSlice";
import ticketReducer from "./slices/ticketSlice";
import commentReducer from "./slices/commentSlice";

export const store = configureStore({
  reducer: {
    register: registerReducer,
    auth: authReducer,
    tickets: ticketReducer,
    comments: commentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
