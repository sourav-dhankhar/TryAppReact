import { createSlice } from "@reduxjs/toolkit";

const localStreamSlice = createSlice({
    name: 'localStream',
    initialState: {localStreamVideoMuted : false, localStreamAudioMuted: false},
    reducers: {
        setAudioMutedLocalStream: (state,action) => {
            state.localStreamAudioMuted = action.payload;
        },
        setVideoMutedLocalStream: (state, action) => {
            state.localStreamVideoMuted = action.payload;
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