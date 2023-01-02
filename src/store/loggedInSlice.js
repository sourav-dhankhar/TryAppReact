import { createSlice } from "@reduxjs/toolkit";

const loggedInSlice = createSlice({
    name: 'loggedIn',
    initialState: { isLoggedIn: false },
    reducers: {
        setLogIn: (state, action) => {
            state.isLoggedIn = action.payload;
        }
    }
}
)

export const loggedInActions = loggedInSlice.actions;
export default loggedInSlice;