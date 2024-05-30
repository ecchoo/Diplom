import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    moderationMessageId: 0,
    userId: 0,
    userName: null,
    messageId: 0
};

const modalLockUserSlice = createSlice({
    name: 'modalLockUser',
    initialState: initialState,
    reducers: {
        setIsOpenModalLockUser(state, action) {
            state.isOpen = action.payload
        },
        setBlockingInfo(state, action) {
            state.moderationMessageId = action.payload.moderationMessageId
            state.userId = action.payload.userId
            state.messageId = action.payload.messageId
            state.userName = action.payload.userName
        }
    }
})

export const { setIsOpenModalLockUser, setBlockingInfo } = modalLockUserSlice.actions

export default modalLockUserSlice.reducer