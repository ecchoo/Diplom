import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    course: {
        name: '',
        description: '',
        logo: '',
        teachers: [],
        authors: [],
        modules: [],
        partitions: [],
        leassons: []
    }
};

const courseCreateUpdateSlice = createSlice({
    name: 'courseCreateUpdate',
    initialState: initialState,
    reducers: {
        setIsOpenCourseCreateUpdate(state, action) {
            state.isOpen = action.payload
        },
        setCourse(state, action) {
            state.course.name = action.payload.name
            state.course.description = action.payload.description
            state.course.logo = action.payload.logo
            state.course.teachers = action.payload.teachers
            state.course.modules = action.payload.modules
        },
        setCourseTeachers(state, action) {
            state.course.teachers = action.payload
        },
        setCourseAuthors(state, action) {
            state.course.authors = action.payload
        },
        setModules(state, action) {
            state.course.modules = action.payload
        },
        setPartitions(state, action) {
            state.course.partitions = action.payload
        },
        setLeassons(state, action) {
            state.course.leassons = action.payload
        }
    }
});

export const { setIsOpenCourseCreateUpdate, setCourse, setModules, setPartitions, setLeassons, setCourseTeachers, setCourseAuthors } = courseCreateUpdateSlice.actions;

export default courseCreateUpdateSlice.reducer;