import { configureStore } from "@reduxjs/toolkit";
import getDeviceSlice from "./getDeviceSlice";
import localStreamSlice from "./localStreamSlice";
import loggedInSlice from "./loggedInSlice";
import roomSlice from "./roomSlice";

const store = configureStore({
    reducer: {
        getDevices: getDeviceSlice.reducer,
        localStream: localStreamSlice.reducer,
        loggedInSlice: loggedInSlice.reducer,
        roomSlice: roomSlice.reducer
    }
})

export default store;