import { AUTH_FORMS } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    activeForm: AUTH_FORMS.LOGIN
};

const modalAuthSlice = createSlice({
    name: 'modalAuth',
    initialState: initialState,
    reducers: {
        setIsOpenModalAuth(state, action) {
            state.isOpen = action.payload
        },
        setActiveFormModalAuth(state, action) {
            state.activeForm = action.payload
        }
    }
});

export const { setIsOpenModalAuth, setActiveFormModalAuth } = modalAuthSlice.actions;

export default modalAuthSlice.reducer;