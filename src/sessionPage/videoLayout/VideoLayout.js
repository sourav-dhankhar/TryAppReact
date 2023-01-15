import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import localStream from "../../localStream/localStream";
import { roomActions } from "../../store/roomSlice";
import room from "../../room/room";
import layoutShema from "../../layout/layoutSchema";
import classes from "./VideoLayout.module.css";

const VideoLayout = (props) => {
    const userList = useSelector((state) => state.roomSlice.userList);
    const [notOnlyMe, setNotOnlyMe] = useState(false);

    useEffect(() => {
        if (userList && userList.length > 0) {
            userList.forEach(element => {
                if (userList.length == 1) {
                    if (element.local) {
                        if (!document.querySelector(`#con_${element.clientId} #player_${element.streamId}`)) {
                            localStream.myStream.play(`con_${element.clientId}`, {
                                player: {
                                    'height': `${document.querySelector('#video-containers').clientHeight}px`,
                                    'width': `${document.querySelector('#video-containers').clientWidth}px`,
                                    'position': 'absolute'
                                }
                            });
                        }
                        setNotOnlyMe(false);
                    } else {
                        setNotOnlyMe(true);
                        if (!document.querySelector(`#con_${element.clientId} #player_${element.streamId}`)) {
                            room.myRoom.remoteStreams.get(element.streamId).play(`con_${element.clientId}`, {
                                player: {
                                    'height': `${document.querySelector('#video-containers').clientHeight}px`,
                                    'width': `${document.querySelector('#video-containers').clientWidth/userList.length}px`,
                                }
                            });
                        } else {
                            document.querySelector(`#con_${element.clientId}`).style.height = `${document.querySelector('#video-containers').clientHeight}px`;
                        document.querySelector(`#con_${element.clientId}`).style.width = `${document.querySelector('#video-containers').clientWidth/userList.length}px`;
                        }
                        if (!document.querySelector(`#con_${room.myRoom.me.clientId} #player_${localStream.myStream.getID()}`) && !document.querySelector(`#self_view #player_${localStream.myStream.getID()}`)) {
                            localStream.myStream.play(`self_view`, {
                                player: {
                                    'height': '200px',
                                    'width': '200px',
                                }
                            });
                        }
                    }
                } else {
                    setNotOnlyMe(true);
                    if (!document.querySelector(`#con_${element.clientId} #player_${element.streamId}`)) {
                        room.myRoom.remoteStreams.get(element.streamId).play(`con_${element.clientId}`, {
                            player: {
                                'height': `${document.querySelector('#video-containers').clientHeight}px`,
                                'width': `${document.querySelector('#video-containers').clientWidth/userList.length}px`,
                            }
                        });
                    } else {
                        document.querySelector(`#con_${element.clientId}`).style.height = `${document.querySelector('#video-containers').clientHeight}px`;
                        document.querySelector(`#con_${element.clientId}`).style.width = `${document.querySelector('#video-containers').clientWidth/userList.length}px`;
                    }
                    if (!document.querySelector(`#con_${room.myRoom.me.clientId} #player_${localStream.myStream.getID()}`) && !document.querySelector(`#self_view #player_${localStream.myStream.getID()}`)) {
                        localStream.myStream.play(`self_view`, {
                            player: {
                                'height': '200px',
                                'width': '200px',
                            }
                        });
                    }
                }
            });
        }

    }, [userList, notOnlyMe]);
    let divList = userList && userList.map((item) => <div key={'key_' + item.clientId} id={'con_' + item.clientId}></div>);
    let videoContainerStyle = {
        display: 'grid',
        gridTemplateColumns: layoutShema[userList.length]['col-template-columns']
    }
    return (
        <React.Fragment>
            <div className="video-stream-containers" style={videoContainerStyle}>
                {notOnlyMe && <div className={classes['self-view']} id="self_view" style={{position: 'absolute', zIndex: '10', left: '5%', top: '5%'}}></div>}
                {userList && divList}
            </div>
        </React.Fragment>
    )

}

export default VideoLayout;