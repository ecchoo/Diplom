import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    taskId: 0
};

const modalTaskFileSlice = createSlice({
    name: 'modalTaskFile',
    initialState: initialState,
    reducers: {
        setIsOpenModalTaskFile(state, action) {
            state.isOpen = action.payload
        },
        setTaskId(state, action) {
            state.taskId = action.payload
        }
    }
})

export const { setIsOpenModalTaskFile, setTaskId } = modalTaskFileSlice.actions

export default modalTaskFileSlice.reducer