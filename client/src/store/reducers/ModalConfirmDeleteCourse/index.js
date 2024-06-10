import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseId: 0,
    isOpen: false
};

const modalConfirmDeleteCourseSlice = createSlice({
    name: 'modalConfirmDeleteCourse',
    initialState: initialState,
    reducers: {
        setIsOpenModalConfirmDeleteCourse(state, action) {
            state.isOpen = action.payload
        },
        setDeleteCourseId(state, action) {
            state.courseId = action.payload
        }
    }
})

export const { setDeleteCourseId, setIsOpenModalConfirmDeleteCourse } = modalConfirmDeleteCourseSlice.actions

export default modalConfirmDeleteCourseSlice.reducer