import { createSlice } from "@reduxjs/toolkit";

const getDeviceSlice = createSlice({
    name: 'getDevices',
    initialState: { showDevices: false, devicesList: null },
    reducers: {
        hideDeviceModal: (state) => {
            state.showDevices = !state.showDevices;
        },
        listDevices: (state, action) => {
            state.showDevices = true;
            state.devicesList = action.payload;
        }   
    }
})

export const getDeviceActions = getDeviceSlice.actions;
export default getDeviceSlice;