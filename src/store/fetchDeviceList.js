import { getDeviceActions } from "./getDeviceSlice"

export const fetchDeviceList = () => {
    return async (dispatch) => {
        const getDataFromEnxRtc = () => {
            return new Promise((resolve, reject) => {
                window.EnxRtc.getDevices((res) => {
                    if (res.result == 0) {
                        resolve(res.devices);
                    } else {
                        reject(null);
                    }
                })
              })
        }
        try {
            const getDataResponse = await getDataFromEnxRtc();
            const cameraList = getDataResponse.cam;
            const MicrophoneList = getDataResponse.mic;
            const devicesList = {'cam': cameraList, 'mic': MicrophoneList};
            dispatch(getDeviceActions.listDevices(devicesList));
        } catch (error) {
            console.log('error,', error );
            dispatch(getDeviceActions.listDevices(null));
        }
    }
}