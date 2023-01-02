import { configureStore } from "@reduxjs/toolkit";
import getDeviceSlice from "./getDeviceSlice";
import localStreamSlice from "./localStreamSlice";
import loggedInSlice from "./loggedInSlice";

const store = configureStore({
    reducer: {
        getDevices: getDeviceSlice.reducer,
        localStream: localStreamSlice.reducer,
        loggedInSlice: loggedInSlice.reducer
    }
})

export default store;