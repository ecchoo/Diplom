import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    id: 0,
    oldText: ''
}

const editMessageSlice = createSlice({
    name: 'editMessage',
    initialState: initialState,
    reducers: {
        setEditMessage(state, action) {
            state.isOpen = true
            state.id = action.payload.id
            state.text = action.payload.text
        },
        clearEditMessage(state, action) {
            state.isOpen = false
            state.id = 0
            state.text = ''
        }
    }
})

export const { setEditMessage, clearEditMessage } = editMessageSlice.actions;

export default editMessageSlice.reducer;