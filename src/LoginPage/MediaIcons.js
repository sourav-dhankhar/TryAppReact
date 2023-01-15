import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { IoMdSettings } from "react-icons/io";
import { BsCameraVideo, BsCameraVideoOff } from "react-icons/bs";
import { AiOutlineAudio, AiOutlineAudioMuted } from "react-icons/ai";
import { getDeviceActions } from "../store/getDeviceSlice";
import { fetchDeviceList } from "../store/fetchDeviceList";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import localStream from "../localStream/localStream";
import { localStreamActions } from "../store/localStreamSlice";

const MediaIcons = () => {
    const dispatch = useDispatch();
    const [mutedVideo, setMutedVideo] = useState(false);
    const [muteDAudio, setMutedAudio] = useState(false);

    const muteAudio = () => {
        if (localStream.myStream.isAudioMuted()) {
            localStream.myStream.unmuteAudio((res) => {
                if (res.result === 0) {
                    setMutedAudio(false);
                    dispatch(localStreamActions.setAudioMutedLocalStream(false));
                }
            })
        } else {
            localStream.myStream.muteAudio((res) => {
                if (res.result === 0) {
                    setMutedAudio(true);
                    dispatch(localStreamActions.setAudioMutedLocalStream(true));
                }
            })
        }
    }

    const muteVideo = () => {
        if (localStream.myStream.isVideoMuted()) {
            localStream.myStream.unmuteVideo((res) => {
                if (res.result === 0) {
                    setMutedVideo(false);
                    dispatch(localStreamActions.setVideoMutedLocalStream(false));
                }
            })
        } else {
            localStream.myStream.muteVideo((res) => {
                if (res.result === 0) {
                    setMutedVideo(true);
                    dispatch(localStreamActions.setVideoMutedLocalStream(true));
                }
            })
        }
    }

    const openSettingsModal = () => {
        dispatch(fetchDeviceList());
    }

    return (
        <React.Fragment>
            <OverlayTrigger
                placement='bottom'
                overlay={
                    <Tooltip id={`tooltip-bottom`}>
                        {mutedVideo ? 'Unmute Video': 'Mute Video'}
                    </Tooltip>
                }
            >
                <a href="#" onClick={muteVideo} >
                    {!mutedVideo && <BsCameraVideo />}
                    {mutedVideo && <BsCameraVideoOff/>}
                    
                </a>
            </OverlayTrigger>

            <OverlayTrigger placement='bottom'
                overlay={
                    <Tooltip id={`tooltip-bottom`}>
                        {muteDAudio ? 'Unmute Audio': 'Muted Audio'}
                    </Tooltip>
                }>
                <a href="#" onClick={muteAudio}>
                    {!muteDAudio && <AiOutlineAudio/>}
                    {muteDAudio && <AiOutlineAudioMuted/>}
                </a>

            </OverlayTrigger>

            <OverlayTrigger placement='bottom'
                overlay={
                    <Tooltip id={`tooltip-bottom`}>
                        Open Settings
                    </Tooltip>
                }
            >
                <a href="#" onClick={openSettingsModal}>
                    <IoMdSettings />
                </a>
            </OverlayTrigger>

        </React.Fragment>
    );
}

export default MediaIcons;