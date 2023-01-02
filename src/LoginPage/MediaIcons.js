import React from "react";
import { useDispatch } from 'react-redux';
import {IoMdSettings} from "react-icons/io";
import { getDeviceActions } from "../store/getDeviceSlice";
import { fetchDeviceList } from "../store/fetchDeviceList";

const MediaIcons = () => {
    const dispatch = useDispatch();
    const openSettingsModal = () => {
        dispatch(fetchDeviceList());
    }

    return (
        <a href="#" onClick={openSettingsModal}>
            <IoMdSettings />
        </a>
    );
}

export default MediaIcons;