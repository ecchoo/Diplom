import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    title: null,
    subTitle: null,
    logo: null, 
};

const selectedChatSlice = createSlice({
    name: 'selectedChat',
    initialState: initialState,
    reducers: {
        setSelectedChat(state, action){
            state.id = action.payload.id
            state.title = action.payload.title
            state.subTitle = action.payload.subTitle
            state.logo = action.payload.logo
        }
    }
});

export const { setSelectedChat } = selectedChatSlice.actions;

export default selectedChatSlice.reducer;