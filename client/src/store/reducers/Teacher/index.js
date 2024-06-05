import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    teacherCourses: []
};

const teacherSlice = createSlice({
    name: 'teacher',
    initialState: initialState,
    reducers: {
        setTeacherCourses(state, action) {
            state.teacherCourses = action.payload
        }
    }
});

export const { setTeacherCourses } = teacherSlice.actions;

export default teacherSlice.reducer;