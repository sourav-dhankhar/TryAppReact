import { createSlice } from "@reduxjs/toolkit";

const loggedInSlice = createSlice({
    name: 'loggedIn',
    initialState: { isLoggedIn: false , token: null},
    reducers: {
        setLogIn: (state, action) => {
            state.isLoggedIn = action.payload.loggedIn;
            state.token = action.payload.token;
        }
    }
}
)

export const loggedInActions = loggedInSlice.actions;
export default loggedInSlice;