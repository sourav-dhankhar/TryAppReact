import React, { useState } from 'react';
import Measure from 'react-measure';
import noConnectedCamera from "../assets/no-connected-camera.jpg";
import GenerateStream from './GenerateStream';
import LoginForm from './LoginForm';

import "./Login.css";

function Login() {
    const [isVideoLoaded, setVideoLoaded] = useState(false);

    const videoLoadHandler = (videoLoadState) => {
        if (videoLoadState === true) {
            setVideoLoaded(true);
        } else {
            setVideoLoaded(false);
        }
    }

    const streamWrapperStyle = isVideoLoaded ? '' : { display: 'flex', alignItems: 'center', position: 'absolute', left: 0, top: 0 };

    return (
        <div className='vh-100'>
            <div className='login-wrapper'>
                <LoginForm />
                <div className='stream-wrapper'>
                    <GenerateStream onMediaAccess={videoLoadHandler} />
                    {!isVideoLoaded && <div className='cameraOffImages' style={streamWrapperStyle}><img src={noConnectedCamera} alt="No"></img></div>}
                </div>
            </div>
        </div>
    )
}

export default Login;