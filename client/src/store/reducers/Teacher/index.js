import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    teacherCourses: [],
    selectedCourseId: 0
};

const teacherSlice = createSlice({
    name: 'teacher',
    initialState: initialState,
    reducers: {
        setTeacherCourses(state, action) {
            state.teacherCourses = action.payload
        },
        setSelectedTeacherCourseId(state, action) {
            state.selectedCourseId = action.payload
        }
    }
});

export const { setTeacherCourses, setSelectedTeacherCourseId } = teacherSlice.actions;

export default teacherSlice.reducer;