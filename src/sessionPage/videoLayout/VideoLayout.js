import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import localStream from "../../localStream/localStream";
import { roomActions } from "../../store/roomSlice";
import room from "../../room/room";
import layoutShema from "../../layout/layoutSchema";
import classes from "./VideoLayout.module.css";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { height } from "@mui/system";

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1] ? name.split(' ')[1][0] : ''}`,
    };
}

const VideoLayout = (props) => {
    const userList = useSelector((state) => state.roomSlice.userList);
    const localVideoMuted = useSelector((state) => state.localStream.localStreamVideoMuted);
    const [notOnlyMe, setNotOnlyMe] = useState(false);
    
    useEffect(() => {
        if (userList && userList.length > 0) {
            userList.forEach(element => {
                if (userList.length == 1) {
                    if (element.local) {
                        if (!document.querySelector(`#con_${element.clientId} #player_${element.streamId}`)) {
                            localStream.myStream.play(`cons_${element.clientId}`, {
                                player: {
                                    'height': `${document.querySelector('#video-containers').clientHeight - 5}px`,
                                    'width': `${document.querySelector('#video-containers').clientWidth - 5}px`,
                                    'position': 'absolute'
                                }
                            });
                        }

                        setNotOnlyMe(false);
                    } else {
                        setNotOnlyMe(true);
                        if (!document.querySelector(`#con_${element.clientId} #player_${element.streamId}`)) {
                            room.myRoom.remoteStreams.get(element.streamId).play(`cons_${element.clientId}`, {
                                player: {
                                    'height': `${document.querySelector('#video-containers').clientHeight - 5}px`,
                                    'width': `${document.querySelector('#video-containers').clientWidth / userList.length - 5}px`,
                                }
                            });
                        } else {
                            document.querySelector(`#con_${element.clientId}`).style.height = `${document.querySelector('#video-containers').clientHeight - 5}px`;
                            document.querySelector(`#con_${element.clientId}`).style.width = `${document.querySelector('#video-containers').clientWidth / userList.length - 5}px`;
                            document.querySelector(`#cons_${element.clientId}`).style.height = `${document.querySelector('#video-containers').clientHeight - 5}px`;
                            document.querySelector(`#cons_${element.clientId}`).style.width = `${document.querySelector('#video-containers').clientWidth / userList.length - 5}px`;
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
                        if (document.documentElement.clientWidth < 768) { 
                            room.myRoom.remoteStreams.get(element.streamId).play(`cons_${element.clientId}`, {
                                player: {
                                    'height': `${document.querySelector('#video-containers').clientHeight / userList.length - 10}px`,
                                    'width': `${document.querySelector('#video-containers').clientWidth - 10}px`,
                                }
                            });
                        } else {
                            room.myRoom.remoteStreams.get(element.streamId).play(`cons_${element.clientId}`, {
                                player: {
                                    'height': `${document.querySelector('#video-containers').clientHeight - 10}px`,
                                    'width': `${document.querySelector('#video-containers').clientWidth / userList.length - 10}px`,
                                }
                            });
                        }
                    } else {
                        if (document.documentElement.clientWidth < 768) { 
                            document.querySelector(`#con_${element.clientId}`).style.height = `${document.querySelector('#video-containers').clientHeight / userList.length - 5}px`;
                            document.querySelector(`#con_${element.clientId}`).style.width = `${document.querySelector('#video-containers').clientWidth - 5}px`;
                            document.querySelector(`#cons_${element.clientId}`).style.height = `${document.querySelector('#video-containers').clientHeight / userList.length - 5}px`;
                            document.querySelector(`#cons_${element.clientId}`).style.width = `${document.querySelector('#video-containers').clientWidth - 5}px`;
                        } else {
                            document.querySelector(`#con_${element.clientId}`).style.height = `${document.querySelector('#video-containers').clientHeight - 5}px`;
                            document.querySelector(`#con_${element.clientId}`).style.width = `${document.querySelector('#video-containers').clientWidth / userList.length - 5}px`;
                            document.querySelector(`#cons_${element.clientId}`).style.height = `${document.querySelector('#video-containers').clientHeight - 5}px`;
                            document.querySelector(`#cons_${element.clientId}`).style.width = `${document.querySelector('#video-containers').clientWidth / userList.length - 5}px`;
                        }
                    }
                    if (!document.querySelector(`#con_${room.myRoom.me.clientId} #player_${localStream.myStream.getID()}`) && !document.querySelector(`#self_view #player_${localStream.myStream.getID()}`)) {
                        // documen
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
    let divList = userList && userList.map((item) => <div key={'key_' + item.clientId} id={'con_' + item.clientId}><div className={classes['avatar']} id={'avatar_' + item.clientId}>{item.name.length > 0 && ( item.mediatype === 'audio' || item.mediatype === 'none' ) ? <Avatar {...stringAvatar(item.name)} /> : ''}</div><div id={'cons_' + item.clientId}></div></div>);
    if (document.documentElement.clientWidth < 768) {
        var videoContainerStyle = {
            display: 'grid',
            gridTemplateRows: layoutShema[`${userList.length}M`]['col-template-rows'],
            gridTemplateColumns: layoutShema[`${userList.length}M`]['col-template-columns'],
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
    
        }
    } else {
        var videoContainerStyle = {
            display: 'grid',
            gridTemplateColumns: layoutShema[userList.length]['col-template-columns'],
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }
    return (
        <React.Fragment>
            <div className={classes["video-stream-containers"]} style={videoContainerStyle}>
                {notOnlyMe && <div className={classes['self-view']} id="self_video_container" style={{ position: 'absolute', zIndex: '10', left: '5%', top: '5%', border: '2px solid red' }}><div className={classes['avatar']} id={'avatar_' + room.myRoom.clientId}>{(room.myRoom.me.name.length > 0 &&  localVideoMuted)  ? <Avatar {...stringAvatar(room.myRoom.me.name)} /> : ''}</div><div id="self_view"></div></div>}
                {userList && divList}
            </div>
        </React.Fragment>
    )

}

export default VideoLayout;