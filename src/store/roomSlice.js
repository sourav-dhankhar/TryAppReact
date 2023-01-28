import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
    name: 'room',
    initialState: { userList: [], screenShare: false, screenShareReceived: false},
    reducers: {
        setUserList: (state, action) => {
            let screenShared = JSON.parse(JSON.stringify(state.screenShareReceived));
            if (screenShared) {
                let addingUser = action.payload.userList;
                let uList = JSON.parse(JSON.stringify(state.userList));
                console.log('uList ', state.userList);
                if (!uList.find(o => o.streamId == '101')) {
                    uList.unshift(addingUser);
                }
                state.userList = uList;
            } else {
                console.log('uList ', JSON.parse(JSON.stringify(state.userList)))
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