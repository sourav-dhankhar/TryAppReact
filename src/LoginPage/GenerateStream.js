import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import "./GenerateStream.css";
import { localStreamActions } from "../store/localStreamSlice";
import localStream from "../localStream/localStream";


const GenerateStream = (props) => {
    const dispatch = useDispatch();
    const streamRef = useRef(null);
    let myStream = localStream.myStream;

    useEffect(() => {
        myStream = window.EnxRtc.EnxStream({ 'video': true, 'audio': true });
        localStream.setMyStream(myStream);
        console.log('EnxRtc ,', window.EnxRtc);
        myStream.init();

        myStream.addEventListener('media-access-allowed', (event) => {
            myStream.play(streamRef.current.id, {
                resize: false,
                player: {
                    height: "100%",
                    width: "100%",
                    maxHeight: "100%",
                    minHeight: "100%",
                    minWidth: "100%",
                },
                toolbar: {
                    displayMode: false,
                    branding: {
                        display: false,
                    },
                },
            });
            if (myStream && myStream.stream && myStream.stream.getVideoTracks().length === 0) {
                props.onMediaAccess(false);
            } else {
                props.onMediaAccess(true);
            }
        })
        myStream.addEventListener('media-access-denied', (event) => {
            props.onMediaAccess(false);
        })

    }, []);

    return (
        <div ref={streamRef} id="self_stream"></div>
    )
}

export default GenerateStream;