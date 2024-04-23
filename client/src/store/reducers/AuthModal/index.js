import { AUTH_FORMS } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    activeForm: AUTH_FORMS.LOGIN
};

const authModalSlice = createSlice({
    name: 'authModal',
    initialState: initialState,
    reducers: {
        setIsOpenAuthModal(state, action) {
            state.isOpen = action.payload
        },
        setActiveFormAuthModal(state, action) {
            state.activeForm = action.payload
        }
    }
});

export const { setIsOpenAuthModal, setActiveFormAuthModal } = authModalSlice.actions;

export default authModalSlice.reducer;