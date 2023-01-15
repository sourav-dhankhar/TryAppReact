import React, { useEffect } from "react";
import ToolbarButtonCover from "./ToolbarButtonCover";
import { BsCameraVideo, BsCameraVideoOff } from "react-icons/bs";
import { AiOutlineAudio, AiOutlineAudioMuted } from "react-icons/ai";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import localStream from "../../localStream/localStream";
import { localStreamActions } from "../../store/localStreamSlice";
import classes from "./Tollbar.module.css";
import { useDispatch, useSelector } from "react-redux";

const Toolbar = () => {
    const dispatch = useDispatch();
    const mutedVideo = useSelector((state) => state.localStream.localStreamVideoMuted);

    const muteVideo = () => {
        if (localStream.myStream.isVideoMuted()) {
            localStream.myStream.unmuteVideo((res) => {
                if (res.result === 0) {
                    dispatch(localStreamActions.setVideoMutedLocalStream(false));
                }
            })
        } else {
            localStream.myStream.muteVideo((res) => {
                if (res.result === 0) {
                    dispatch(localStreamActions.setVideoMutedLocalStream(true));
                }
            })
        }
    }

    return (
        <React.Fragment>
            <div className={classes['toolbar']}>
                <ToolbarButtonCover>
                    <OverlayTrigger
                        placement='bottom'
                        overlay={
                            <Tooltip id={`tooltip-bottom`}>
                                {mutedVideo ? 'Unmute Video' : 'Mute Video'}
                            </Tooltip>
                        }
                    >
                        <a href="#" onClick={muteVideo} >
                            {!mutedVideo && <BsCameraVideo />}
                            {mutedVideo && <BsCameraVideoOff />}

                        </a>
                    </OverlayTrigger>
                </ToolbarButtonCover>
            </div>
        </React.Fragment>
    )
}

export default Toolbar;