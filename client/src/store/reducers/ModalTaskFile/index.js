import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    taskId: 0,
    courseId: 0,
    nextTaskId: 0
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
        },
        setNextTaskId(state, action) {
            state.nextTaskId = action.payload
        },
        setCourseIdModalTaskFile(state, action) {
            state.courseId = action.payload
        }
    }
})

export const { setIsOpenModalTaskFile, setTaskId, setCourseIdModalTaskFile, setNextTaskId } = modalTaskFileSlice.actions

export default modalTaskFileSlice.reducer