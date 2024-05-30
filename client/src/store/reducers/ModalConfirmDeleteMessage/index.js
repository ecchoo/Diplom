import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messageId: 0,
    isOpen: false
};

const modalConfirmDeleteMessageSlice = createSlice({
    name: 'modalConfirmDeleteMessage',
    initialState: initialState,
    reducers: {
        setIsOpenModalConfirmDeleteMessage(state, action) {
            state.isOpen = action.payload
        },
        setDeleteMessageId(state, action) {
            state.messageId = action.payload
        }
    }
})

export const { setDeleteMessageId, setIsOpenModalConfirmDeleteMessage } = modalConfirmDeleteMessageSlice.actions

export default modalConfirmDeleteMessageSlice.reducer