import { COURSE_CREATE_UPDATE_TYPES } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    type: COURSE_CREATE_UPDATE_TYPES.CREATE,
    course: {
        id: 0,
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
        setTypeCourseCreateUpdate(state, action) {
            state.type = action.payload
        },
        setCourse(state, action) {
            state.course.id = action.payload.id
            state.course.name = action.payload.name
            state.course.description = action.payload.description
            state.course.logo = action.payload.logo
            state.course.teachers = action.payload.teachers
            state.course.modules = action.payload.modules
            state.course.partitions = action.payload.partitions
            state.course.leassons = action.payload.leassons
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
        },
        clearCourseInfo(state, action) {
            state.course.id = 0
            state.course.name = ''
            state.course.description = ''
            state.course.logo = ''
            state.course.teachers = []
            state.course.modules = []
            state.course.partitions = []
            state.course.leassons = []
        },

        deleteModule(state, action) {
            const moduleId = action.payload;

            state.course.modules = state.course.modules.filter(module => module.id !== moduleId);

            const partitionIdsToDelete = state.course.partitions
                .filter(partition => partition.moduleId === moduleId)
                .map(partition => partition.id);

            state.course.partitions = state.course.partitions.filter(partition => partition.moduleId !== moduleId);

            state.course.leassons = state.course.leassons.filter(lesson => !partitionIdsToDelete.includes(lesson.partitionId));
        },

        deletePartition(state, action) {
            const partitionId = action.payload;

            state.course.partitions = state.course.partitions.filter(partition => partition.id !== partitionId);

            state.course.leassons = state.course.leassons.filter(lesson => lesson.partitionId !== partitionId);
        },


        deleteLeasson(state, action) {
            state.course.leassons = state.course.leassons.filter(l => l.id !== action.payload)
        }
    }
});

export const {
    clearCourseInfo,
    setIsOpenCourseCreateUpdate,
    setCourse,
    setModules,
    setPartitions,
    setLeassons,
    setCourseTeachers,
    setCourseAuthors,
    deleteModule,
    deletePartition,
    deleteLeasson,
    setTypeCourseCreateUpdate
} = courseCreateUpdateSlice.actions;

export default courseCreateUpdateSlice.reducer;