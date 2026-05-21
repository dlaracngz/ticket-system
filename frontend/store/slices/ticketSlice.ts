import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TicketType } from "@/types/type";

interface TicketState {
  tickets: TicketType[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: TicketState = {
  tickets: [],
  loading: false,
  error: null,
  success: false,
};

const TicketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    ticketStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    getTicketsSuccess: (state, action: PayloadAction<TicketType[]>) => {
      state.loading = false;
      state.tickets = action.payload;
      state.success = true;
    },
    addTicketSuccess: (state, action: PayloadAction<TicketType>) => {
      state.loading = false;
      state.tickets.unshift(action.payload);
      state.success = true;
    },
    updateTicketSuccess: (state, action: PayloadAction<TicketType>) => {
      state.loading = false;
      const index = state.tickets.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tickets[index] = action.payload;
      }
      state.success = true;
    },
    deleteTicketSuccess: (state, action: PayloadAction<number>) => {
      state.loading = false;
      state.tickets = state.tickets.filter((t) => t.id !== action.payload);
      state.success = true;
    },
    ticketFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export const {
  ticketStart,
  getTicketsSuccess,
  addTicketSuccess,
  updateTicketSuccess,
  deleteTicketSuccess,
  ticketFail,
} = TicketSlice.actions;

export default TicketSlice.reducer;
