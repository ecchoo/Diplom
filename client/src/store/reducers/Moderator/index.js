import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    moderationMessages: []
}

const moderatorSlice = createSlice({
    name: 'moderator',
    initialState: initialState,
    reducers: {
        setModerationMessages(state, action) {
            state.moderationMessages = action.payload
        }
    }
})

export const { setModerationMessages } = moderatorSlice.actions

export default moderatorSlice.reducer