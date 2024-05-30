import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isOpen: false,
    selectedCourseId: 0
}

const modalCourseSlice = createSlice({
    name: 'modalCourse',
    initialState: initialState,
    reducers: {
        setIsOpenModalCourse(state, action) {
            state.isOpen = action.payload
        },
        setSelectedCourseId(state, action) {
            state.selectedCourseId = action.payload
        }
    }
})

export const { setIsOpenModalCourse, setSelectedCourseId } = modalCourseSlice.actions

export default modalCourseSlice.reducer