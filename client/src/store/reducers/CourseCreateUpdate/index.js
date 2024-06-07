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
        difficultyLevel: null,
        fieldStudy: null,
        teachers: [],
        authors: [],
        modules: [],
        partitions: [],
        leassons: [],
        practicalTasks: []
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
            state.course.practicalTasks = action.payload.practicalTasks
            state.course.difficultyLevel = action.payload.difficultyLevel
            state.course.fieldStudy = action.payload.fieldStudy
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
        setPracticalTasks(state, action) {
            state.course.practicalTasks = action.payload
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
            state.course.practicalTasks = []
            state.course.difficultyLevel = null
            state.course.fieldStudy = null
        },

        deleteModule(state, action) {
            const moduleId = action.payload;

            state.course.modules = state.course.modules.filter(module => module.id !== moduleId);

            const partitionIdsToDelete = state.course.partitions
                .filter(partition => partition.moduleId === moduleId)
                .map(partition => partition.id);

            state.course.partitions = state.course.partitions.filter(partition => partition.moduleId !== moduleId);

            const lessonIdsToDelete = state.course.leassons
                .filter(lesson => partitionIdsToDelete.includes(lesson.partitionId))
                .map(lesson => lesson.id);

            state.course.leassons = state.course.leassons.filter(lesson => !partitionIdsToDelete.includes(lesson.partitionId));

            state.course.practicalTasks = state.course.practicalTasks.filter(task => {
                return !partitionIdsToDelete.includes(task.partitionId) && !lessonIdsToDelete.includes(task.lessonId);
            });
        },

        deletePartition(state, action) {
            const partitionId = action.payload;

            state.course.partitions = state.course.partitions.filter(partition => partition.id !== partitionId);

            const lessonIdsToDelete = state.course.leassons
                .filter(lesson => lesson.partitionId === partitionId)
                .map(lesson => lesson.id);

            state.course.leassons = state.course.leassons.filter(lesson => lesson.partitionId !== partitionId);

            state.course.practicalTasks = state.course.practicalTasks.filter(task => {
                return task.partitionId !== partitionId && !lessonIdsToDelete.includes(task.lessonId);
            });
        },

        deleteLeasson(state, action) {
            const lessonId = action.payload;

            state.course.leassons = state.course.leassons.filter(lesson => lesson.id !== lessonId);

            state.course.practicalTasks = state.course.practicalTasks.filter(task => task.lessonId !== lessonId);
        },
        

        deletePracticalTask(state, action) {
            state.course.practicalTasks = state.course.practicalTasks.filter(p => p.id !== action.payload)
        },
    }
});

export const {
    clearCourseInfo,
    setIsOpenCourseCreateUpdate,
    setCourse,
    setModules,
    setPartitions,
    setPracticalTasks,
    setLeassons,
    setCourseTeachers,
    setCourseAuthors,
    deleteModule,
    deletePartition,
    deleteLeasson,
    setTypeCourseCreateUpdate,
    deletePracticalTask
} = courseCreateUpdateSlice.actions;

export default courseCreateUpdateSlice.reducer;