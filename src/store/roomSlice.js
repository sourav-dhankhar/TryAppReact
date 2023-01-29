import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
    name: 'room',
    initialState: { userList: [], screenShare: false, screenShareReceived: false},
    reducers: {
        setUserList: (state, action) => {
            let screenShared = JSON.parse(JSON.stringify(state.screenShareReceived));
            if (screenShared) {
                console.log('uList in roomSlice ', JSON.parse(JSON.stringify(state.userList)));
                let screenShareObject = {
                    'name': 'Screen Share',
                    'audio': true,
                    'video': true,
                    'mediatype': 'audioVideo',
                    'streamId': 101,
                    'clientId': 'screenshare_101',
                }
                if (action.payload.add == 'yes') {
                    let uList = JSON.parse(JSON.stringify(state.userList));
                    if (!uList.find(o => o.streamId == '101')) {
                        uList.unshift(screenShareObject);
                    }
                    state.userList = uList;
                } else {
                    let uList = action.payload.userList;
                    if (!uList.find(o => o.streamId == '101')) {
                        uList.unshift(screenShareObject);
                    }
                    state.userList = uList;
                }
            } else {
                console.log('uList in roomSlice ', JSON.parse(JSON.stringify(state.userList)));
                if (action.payload.screenShare && action.payload.screenShare == 'remove') {
                    let uList = JSON.parse(JSON.stringify(state.userList));
                    uList.shift();
                    state.userList = uList;
                } else {
                    state.userList = action.payload.userList;
                }
            }
        },
        setScreenShare: (state, action) => {
            state.screenShare = action.payload;
        },
        setScreenShareReceived: (state, action) => {
            state.screenShareReceived = action.payload;
        }
    }
}
)

export const roomActions = roomSlice.actions;
export default roomSlice;