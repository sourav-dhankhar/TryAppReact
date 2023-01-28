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
    const userList = useSelector((state) => state.roomSlice.userList);
    const screenShare = useSelector((state) => state.roomSlice.screenShare);
    const screenShareReceived = useSelector((state) => state.roomSlice.screenShareReceived);


    useEffect(() => {
        if (room.myRoom && room.myRoom.activeTalkerList.size == 0) {
            dispatch(roomActions.setUserList(
                {
                    userList: [{
                        'name': room.myRoom.me.name,
                        'audio': localStream.myStream.isAudioMuted(),
                        'video': localStream.myStream.isVideoMuted(),
                        'mediatype': localStream.myStream.isAudioMuted() ? (localStream.myStream.isVideoMuted() ? 'none' : 'video') : (localStream.myStream.isVideoMuted() ? 'audio' : 'audioVideo'),
                        'streamId': localStream.myStream.getID(),
                        'clientId': room.myRoom.me.clientId,
                        'local': true
                    }],
                    add: 'yes'
                }))
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
                    console.log('userList ', userList);
                    let ATList = event.message.activeList;
                    if (ATList.length === 0) {
                        console.log('mediaTypre : ', localStream.myStream.isAudioMuted() ? (localStream.myStream.isVideoMuted() ? 'none' : 'video') : (localStream.myStream.isVideoMuted() ? 'audio' : 'audioVideo'));
                        dispatch(roomActions.setUserList(
                            {
                                userList: [{
                                    'name': room.myRoom.me.name,
                                    'audio': localStream.myStream.isAudioMuted(),
                                    'video': localStream.myStream.isVideoMuted(),
                                    'mediatype': localStream.myStream.isAudioMuted() ? (localStream.myStream.isVideoMuted() ? 'none' : 'video') : (localStream.myStream.isVideoMuted() ? 'audio' : 'audioVideo'),
                                    'streamId': localStream.myStream.getID(),
                                    'clientId': room.myRoom.me.clientId,
                                    'local': true
                                }],
                                add: 'no'
                            }))
                    } else {
                        if (screenShareReceived) {
                            let screenShareObject = {
                                'name': 'Screen Share',
                                'audio': true,
                                'video': true,
                                'mediatype': 'audioVideo',
                                'streamId': 101,
                                'clientId': 'screenshare_101',
                            }
                            dispatch(roomActions.setScreenShareReceived(true));
                            dispatch(roomActions.setUserList
                                (
                                    {
                                        userList: screenShareObject,
                                        add: 'yes',
                                    })
                            );
                        } else {
                            dispatch(roomActions.setUserList
                                (
                                    {
                                        userList: ATList,
                                        add: 'no',
                                    })
                            );
                        }
                    }
                });

                room.myRoom.addEventListener("share-started", (res) => {
                    let clientId = res.message.clientId;
                    if (clientId != room.myRoom.clientId) {
                        console.log('userList ', userList);
                        let screenShareObject = {
                            'name': 'Screen Share',
                            'audio': true,
                            'video': true,
                            'mediatype': 'audioVideo',
                            'streamId': 101,
                            'clientId': 'screenshare_101',
                        }
                        dispatch(roomActions.setScreenShareReceived(true));
                        dispatch(roomActions.setUserList
                            (
                                {
                                    userList: screenShareObject,
                                    add: 'yes',
                                })
                        );
                    }
                })

                room.myRoom.addEventListener("share-stopped", (res) => {
                    let clientId = res.message.clientId;
                    if (clientId != room.myRoom.clientId) {
                        dispatch(roomActions.setScreenShareReceived(false));
                        dispatch(roomActions.setUserList
                            (
                                {
                                    screenShare: 'remove',
                                })
                        );
                    }
                })
            }

        },
            reConnectOpt)
    }

    return (
        <React.Fragment>
            <div className="video-wrappers" id="video-containers" style={{ height: `${document.documentElement.clientHeight - 1}px`, width: `${document.documentElement.clientWidth - 1}px`, padding: '10px' }}>
                <VideoLayout />
                <Toolbar />
                {userList && userList[0] && userList[0]['name'] && <div>{userList[0]['name']}</div>}
            </div>
        </React.Fragment>
    )

}


export default Room;