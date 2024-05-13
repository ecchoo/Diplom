import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isOpen: false,
    selectedCourseId: 0
}

const courseModalSlice = createSlice({
    name: 'courseModal',
    initialState: initialState,
    reducers: {
        setIsOpenCourseModal(state, action) {
            state.isOpen = action.payload
        },
        setSelectedCourseId(state, action) {
            state.selectedCourseId = action.payload
        }
    }
})

export const { setIsOpenCourseModal, setSelectedCourseId } = courseModalSlice.actions

export default courseModalSlice.reducer