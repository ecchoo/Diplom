import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: 0,
    token: null,
    name: null,
    email: null,
    role: null,
    verified: false,
    photo: null
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser(state, action) {
            state.id = action.payload.id
            state.name = action.payload.name
            state.email = action.payload.email
            state.token = action.payload.token
            state.verified = action.payload.verified
            state.photo = action.payload.photo
        },
        setPersonalDataUser(state, action) {
            state.name = action.payload.name
            state.email = action.payload.email
        },
        logoutUser(state) {
            state.id = 0
            state.name = null
            state.email = null
            state.token = null
            state.role = null
            state.verified = false
            state.photo = null
        }
    }
});

export const { setUser, setPersonalDataUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;