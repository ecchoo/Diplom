import { TEST_CREATE_UPDATE_TYPES } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    type: TEST_CREATE_UPDATE_TYPES.CREATE,
    test: {
        id: 0,
        name: '',
        courseId: null,
        questions: [],
    }
};

const testCreateUpdateSlice = createSlice({
    name: 'testCreateUpdate',
    initialState: initialState,
    reducers: {
        setIsOpenTestCreateUpdate(state, action) {
            state.isOpen = action.payload
        },
        setTypeTestCreateUpdate(state, action) {
            state.type = action.payload
        },
        setTest(state, action) {
            state.test.id = action.payload.id
            state.test.name = action.payload.name
            state.test.courseId = action.payload.courseId
            state.test.questions = action.payload.questions
        },
        clearTestInfo(state, action) {
            state.test.id = 0
            state.test.name = ''
            state.test.courseId = null
            state.test.questions = []
        },

        addQuestion(state, action) {
            state.test.questions.push(action.payload);
        },

        updateQuestion(state, action) {
            const { id, ...updatedQuestion } = action.payload;
            const index = state.test.questions.findIndex(question => question.id === id);
            if (index !== -1) {
                state.test.questions[index] = { ...state.test.questions[index], ...updatedQuestion };
            }
        },

        deleteQuestion(state, action) {
            const questionId = action.payload;
            state.test.questions = state.test.questions.filter(question => question.id !== questionId);
        },

        addAnswer(state, action) {
            const { questionId, answer } = action.payload;
            const questionIndex = state.test.questions.findIndex(question => question.id === questionId);
            if (questionIndex !== -1) {
                state.test.questions[questionIndex].answers.push(answer);
            }
        },

        updateAnswer(state, action) {
            const { questionId, answerId, ...updatedAnswer } = action.payload;
            const questionIndex = state.test.questions.findIndex(question => question.id === questionId);
            if (questionIndex !== -1) {
                const answerIndex = state.test.questions[questionIndex].answers.findIndex(answer => answer.id === answerId);
                if (answerIndex !== -1) {
                    state.test.questions[questionIndex].answers[answerIndex] = { ...state.test.questions[questionIndex].answers[answerIndex], ...updatedAnswer };
                }
            }
        },

        deleteAnswer(state, action) {
            const { questionId, answerId } = action.payload;
            const questionIndex = state.test.questions.findIndex(question => question.id === questionId);
            if (questionIndex !== -1) {
                state.test.questions[questionIndex].answers = state.test.questions[questionIndex].answers.filter(answer => answer.id !== answerId);
            }
        },
    }
});

export const {
    clearTestInfo,
    setIsOpenTestCreateUpdate,
    setTest,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    addAnswer,
    updateAnswer,
    deleteAnswer,
    setTypeTestCreateUpdate
} = testCreateUpdateSlice.actions;

export default testCreateUpdateSlice.reducer;
