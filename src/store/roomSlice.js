import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
    name: 'room',
    initialState: { userList: []},
    reducers: {
        setUserList: (state, action) => {
            state.userList = action.payload;
        }
    }
}
)

export const roomActions = roomSlice.actions;
export default roomSlice;