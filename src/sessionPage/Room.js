import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import localStream from "../localStream/localStream";
import { roomActions } from "../store/roomSlice";
import VideoLayout from "./videoLayout/VideoLayout";
import room from "../room/room";
import Toolbar from "./toolbar/Toolbar";

const Room = (props) => {
    const videoMuted = useSelector((state) => state.localStream.localStreamVideoMuted);
    const audioMuted = useSelector((state) => state.localStream.localStreamAudioMuted);

    useEffect(() => {
        if (room.myRoom && room.myRoom.activeTalkerList.size == 0) {
            dispatch(roomActions.setUserList([{
                'name': room.myRoom.me.name,
                'audio': localStream.myStream.isAudioMuted(),
                'video': localStream.myStream.isVideoMuted(),
                'mediatype' : localStream.myStream.isAudioMuted() ? localStream.myStream.isVideoMuted() ? 'none' : 'audio' : localStream.myStream.isVideoMuted() ? 'none' : 'audioVideo',
                'streamId': localStream.myStream.getID(),
                'clientId': room.myRoom.me.clientId,
                'local': true
            }]))
        }
    }, [videoMuted, audioMuted])

    useEffect(() => {
        joinRoom(props.token);
    }, [])

    const dispatch = useDispatch();

    var VideoSize = {
        "HD": [320, 180, 1280, 720],
        "SD": [320, 180, 640, 480],
        "LD": [80, 45, 640, 360]
    };

    var StreamOpt = {
        video: true,
        audio: true,
        videoMuted: videoMuted,
        audioMuted: audioMuted,
        data: true,
        videoSize: VideoSize.SD,
        attributes: { name: "XX" }
    };

    var remoteStreams = null;

    var reConnectOpt = {
        "allow_recnnect": true,
        "number_of_attempts": 3,
        "timeout_interval": 10000
    };

    var subsOptiions = {
        audio: true,
        video: true,
        data: true
    };

    var userList = [];

    function joinRoom(token) {
        localStream.myStream = window.EnxRtc.joinRoom(token, StreamOpt, function (success, error) {
            if (error && error != null) {
                // Look for error.type and error.msg.name to handle Exception
                if (error.type === "media-access-denied") {
                    // Media Media Inaccessibility
                }
            }

            if (success && success != null) {
                room.setroom(success.room);
                if (room.myRoom.waitRoom && room.myRoom.me.role != "moderator") {
                    // Wait for Moderator
                } else {
                    remoteStreams = success.room.streams;
                }
                // Subscribe to all Streams in Room Metaa
                for (var i = 0; i < success.streams.length; i++) {
                    room.myRoom.subscribe(success.streams[i], subsOptiions);
                }

                room.myRoom.addEventListener("active-talkers-updated", function (event) {
                    // List of talkers in the Room
                    // Received after room-connected
                    console.log('active-talker-event ', event);
                    let ATList = event.message.activeList;
                    if (ATList.length === 0) {
                        dispatch(roomActions.setUserList([{
                            'name': room.myRoom.me.name,
                            'audio': localStream.myStream.isAudioMuted(),
                            'video': localStream.myStream.isVideoMuted(),
                            'mediatype' : localStream.myStream.isAudioMuted() ? localStream.myStream.isVideoMuted() ? 'none' : 'audio' : localStream.myStream.isVideoMuted() ? 'none' : 'audioVideo',
                            'streamId': localStream.myStream.getID(),
                            'clientId': room.myRoom.me.clientId,
                            'local': true
                        }]))
                    } else {
                        dispatch(roomActions.setUserList(ATList));
                    }
                });
            }

        },
            reConnectOpt)
    }

    return (
        <React.Fragment>
            <div className="video-wrappers" id="video-containers" style={{ height: '100vh', width: '100vw' }}>
                <VideoLayout />
                <Toolbar/>
            </div>
        </React.Fragment>
    )

}


export default Room;