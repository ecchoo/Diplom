import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messageId: 0,
    isOpen: false
};

const confirmDeleteMessageSlice = createSlice({
    name: 'confirmDeleteMessage',
    initialState: initialState,
    reducers: {
        setIsOpenConfirmDeleteMessage(state, action){
            state.isOpen = action.payload
        },
        setDeleteMessageId(state, action) {
            state.messageId = action.payload
        }
    }
})

export const { setDeleteMessageId, setIsOpenConfirmDeleteMessage } = confirmDeleteMessageSlice.actions

export default confirmDeleteMessageSlice.reducer