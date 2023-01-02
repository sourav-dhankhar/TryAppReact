import React from "react";
import Login from "./LoginPage/Login";
import Modal from "../src/UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getDeviceActions } from "./store/getDeviceSlice";

const App = () => {
    const dispatch = useDispatch();

    const showDevices = useSelector((state) => state.getDevices.showDevices);
    const devicesList = useSelector((state) => state.getDevices.devicesList)
    const isLoggedIn = useSelector((state) => state.loggedInSlice.isLoggedIn);

    const hideSettingsHandler = () => {
        dispatch(getDeviceActions.hideDeviceModal());
    }

    return (
        <React.Fragment>
            {showDevices && <Modal title="Devices" message={devicesList} closeModal={hideSettingsHandler}/>}
            {!isLoggedIn && <Login/>}
            {/* <Session/> */}
        </React.Fragment>
    )
}

export default App;