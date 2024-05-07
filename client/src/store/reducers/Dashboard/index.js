import { DASHBOARD_SECTIONS } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeSection: DASHBOARD_SECTIONS.CHATS
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: initialState,
    reducers: {
        setActiveDashboardSection(state, action) {
            state.activeSection = action.payload
        }
    }
});

export const { setActiveDashboardSection } = dashboardSlice.actions;

export default dashboardSlice.reducer;