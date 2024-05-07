import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chatList: [],
    selectedChat: {
        id: null,
        title: null,
        subTitle: null,
        logo: null,
    },
};

const chatsSlice = createSlice({
    name: 'chats',
    initialState: initialState,
    reducers: {
        setChatList(state, action) {
            state.chatList = action.payload
        },
        setSelectedChat(state, action) {
            state.selectedChat.id = action.payload.id
            state.selectedChat.title = action.payload.title
            state.selectedChat.subTitle = action.payload.subTitle
            state.selectedChat.logo = action.payload.logo
        }
    }
});

export const { setChatList, setSelectedChat } = chatsSlice.actions;

export default chatsSlice.reducer;