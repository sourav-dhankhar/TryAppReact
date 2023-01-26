import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import localStream from "../../localStream/localStream";
import { roomActions } from "../../store/roomSlice";
import room from "../../room/room";
import classes from "./VideoLayout.module.css";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { height } from "@mui/system";
import layoutSchema from "../../layout/layoutSchema";

function getWidthOfContainer(parentElement, value) {
    if (parentElement) {
        let paddingLeft = window.getComputedStyle(parentElement, null).getPropertyValue('padding-left');
        let paddingLeftValue = Number(paddingLeft.replace('px',''));
        let paddingRight = window.getComputedStyle(parentElement, null).getPropertyValue('padding-right');
        let paddingRightValue = Number(paddingRight.replace('px',''));

        let width = parentElement.clientWidth - paddingRightValue - paddingLeftValue;
        if (value == 'px') {
            return (`${width}px`);
        } else {
            return (width);
        }
    }
}

function getHeightOfContainer(parentElement, value) {
    if (parentElement) {
        let paddingTop = window.getComputedStyle(parentElement, null).getPropertyValue('padding-top');
        let paddingTopValue = Number(paddingTop.replace('px',''));
        let paddingBottom = window.getComputedStyle(parentElement, null).getPropertyValue('padding-top');
        let paddingBottomValue = Number(paddingBottom.replace('px',''));

        let height = parentElement.clientHeight - paddingBottomValue - paddingTopValue;
        if (value == 'px') {
            return (`${height}px`);
        } else {
            return (height);
        }
    }
}

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
                            document.querySelector(`#con_${element.clientId}`).style.height =  layoutSchema({ userList: userList, propertyName: 'height' });
                            document.querySelector(`#con_${element.clientId}`).style.width = layoutSchema({ userList: userList, propertyName: 'width' });
                            localStream.myStream.play(`cons_${element.clientId}`, {
                                player: {
                                    'height': '100%',
                                    'width': '100%',
                                    'position': 'absolute',
                                    'minHeight': 'inherit',
                                    'minWidth': 'inherit'
                                }
                            });
                        }
                        else {
                            document.querySelector(`#con_${element.clientId}`).style.height =  layoutSchema({ userList: userList, propertyName: 'height' });
                            document.querySelector(`#con_${element.clientId}`).style.width = layoutSchema({ userList: userList, propertyName: 'width' });
                        }
                        setNotOnlyMe(false);
                    } else {
                        setNotOnlyMe(true);
                        if (!document.querySelector(`#con_${element.clientId} #player_${element.streamId}`)) {
                            document.querySelector(`#con_${element.clientId}`).style.height =  layoutSchema({ userList: userList, propertyName: 'height' });
                            document.querySelector(`#con_${element.clientId}`).style.width = layoutSchema({ userList: userList, propertyName: 'width' });
                            room.myRoom.remoteStreams.get(element.streamId).play(`cons_${element.clientId}`, {
                                player: {
                                    'height': '100%',
                                    'width': '100%',
                                    'minHeight': 'inherit',
                                    'minWidth': 'inherit'
                                }
                            });
                        } else {
                            document.querySelector(`#con_${element.clientId}`).style.height =  layoutSchema({ userList: userList, propertyName: 'height' });
                            document.querySelector(`#con_${element.clientId}`).style.width = layoutSchema({ userList: userList, propertyName: 'width' });
                        }
                        if (!document.querySelector(`#con_${room.myRoom.me.clientId} #player_${localStream.myStream.getID()}`) && !document.querySelector(`#self_view #player_${localStream.myStream.getID()}`)) {
                            localStream.myStream.play(`self_view`, {
                                player: {
                                    'height': '100%',
                                    'width': '100%',
                                    'minHeight': 'inherit',
                                    'minWidth': 'inherit'
                                }
                            });
                        }
                    }
                } else {
                    setNotOnlyMe(true);
                    if (!document.querySelector(`#con_${element.clientId} #player_${element.streamId}`)) {
                        document.querySelector(`#con_${element.clientId}`).style.height = layoutSchema({ userList: userList, propertyName: 'height' });
                        document.querySelector(`#con_${element.clientId}`).style.width = layoutSchema({ userList: userList, propertyName: 'width' });
                        room.myRoom.remoteStreams.get(element.streamId).play(`cons_${element.clientId}`, {
                            player: {
                                'height': '100%',
                                'width': '100%',
                                'minHeight': 'inherit',
                                'minWidth': 'inherit'
                            }
                        });
                    } else {
                        document.querySelector(`#con_${element.clientId}`).style.height = layoutSchema({ userList: userList, propertyName: 'height' });
                        document.querySelector(`#con_${element.clientId}`).style.width = layoutSchema({ userList: userList, propertyName: 'width' });
                    }
                    if (!document.querySelector(`#con_${room.myRoom.me.clientId} #player_${localStream.myStream.getID()}`) && !document.querySelector(`#self_view #player_${localStream.myStream.getID()}`)) {
                        localStream.myStream.play(`self_view`, {
                            player: {
                                'height': '100%',
                                'width': '100%',
                                'minHeight': 'inherit',
                                'minWidth': 'inherit'
                            }
                        });
                    }
                }
            });
        }

    }, [userList, notOnlyMe]);
    let divList = userList && userList.map((item) => <div key={'key_' + item.clientId} id={'con_' + item.clientId}><div className={classes['avatar']} id={'avatar_' + item.clientId}>{item.name.length > 0 && (item.mediatype === 'audio' || item.mediatype === 'none') ? <Avatar {...stringAvatar(item.name)} /> : ''}</div><div className={classes['cons-div']} id={'cons_' + item.clientId}></div></div>);
    var videoContainerStyle = {
        display: 'grid',
        gridGap: '10px',
        gridTemplateColumns: layoutSchema({userList: userList, propertyName: 'col-template-columns'}),
        gridTemplateRows: layoutSchema({userList: userList, propertyName: 'col-template-rows'}),
        width: getWidthOfContainer(document.querySelector('#video-containers'), 'px'),
        height: getHeightOfContainer(document.querySelector('#video-containers'), 'px'),
    }
    let selfViewStyle = {};
    if (document.documentElement.clientWidth < 768) {
        selfViewStyle = { position: 'absolute', zIndex: '10', left: '5%', top: '5%', border: '2px solid red', height: '100px', width: '100px' };
    } else {
        selfViewStyle = { position: 'absolute', zIndex: '10', left: '5%', top: '5%', border: '2px solid red', height: '200px', width: '200px' };
    }


    return (
        <React.Fragment>
            <div className={classes["video-stream-containers"]} id="videosWrapper" style={videoContainerStyle}>
                {notOnlyMe && <div className={classes['self-view']} id="self_video_container" style={selfViewStyle}><div className={classes['avatar']} id={'avatar_' + room.myRoom.clientId}>{(room.myRoom.me.name.length > 0 && localVideoMuted) ? <Avatar {...stringAvatar(room.myRoom.me.name)} /> : ''}</div><div id="self_view"></div></div>}
                {userList && divList}
            </div>
        </React.Fragment>
    )

}

export default VideoLayout;