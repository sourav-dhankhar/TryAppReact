import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { localStreamActions } from "../../store/localStreamSlice";
import localStream from "../localStream/localStream";


const MediaIconsListing = (props) => {
    let stream = localStream.myStream;
    const camSelectHref = useRef();
    const micSelectHref = useRef();
    const dispatch = useDispatch();
    // const localStream = useSelector(state => state.localStream);

    useEffect(() => {
        let videoSelectedId = stream.config.video.deviceId;
        let micSelectedId = stream.config.audio.deviceId;
        camSelectHref.current.childNodes.forEach(element => {
            if (element.id == videoSelectedId) {
                element.selected = true;
            }
        });
        micSelectHref.current.childNodes.forEach(element => {
            if (element.id == micSelectedId) {
                element.selected = true;
            }
        });
    },[]);

    const changeCamera = (event) => {
        console.log('changeCamera event ', event);
        let select = document.querySelector('#camFormControlSelect');
        let options = select.options;
        let camDeviceId = options[options.selectedIndex].id;
        localStream.switchCamera(camDeviceId);
    }

    return (
        <div className={props.className}>
            <form>
                <div className="form-group">
                    <label htmlFor="camFormControlSelect">Camera</label>
                    <select ref={camSelectHref} className="form-control" id="camFormControlSelect" onChange={changeCamera}>
                        {props.devices.cam.map((res) => <option key={res.deviceId} id={res.deviceId}>{res.label}</option>)}
                    </select>
                </div>
                {props.devices.mic && <div className="form-group">
                    <label htmlFor="micFormControlSelect">Mic</label>
                    <select ref={micSelectHref} className="form-control" id="micFormControlSelect" onChange={changeCamera}>
                        {props.devices.mic.map((res) => <option key={res.deviceId} id={res.deviceId}>{res.label}</option>)}
                    </select>
                </div>}
            </form>
        </div>
    )
}

export default MediaIconsListing;