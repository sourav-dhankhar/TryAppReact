import { createSlice } from "@reduxjs/toolkit";

const localStreamSlice = createSlice({
    name: 'localStream',
    initialState: {localStream : null},
    reducers: {
        setLocalStream: (state, action) => {
            state.localStream = action.payload;
        },
        changeCamera: (state,action) => {
            state.localStream.switchCamera(state.localStream, action.payload, (res) => {
                console.log('res of switchcamera ', res);
            })
        }
    }
})

export const localStreamActions = localStreamSlice.actions;
export default localStreamSlice;