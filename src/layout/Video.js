import React, { useEffect } from "react";
// import classes from './Video.module.css';
import logo from '../assets/logo512.png';
import imagesForTesting from "../images/Images";

const Video = () => {

    // console.log('EnxRtc', EnxRtc);
    const totalImages = imagesForTesting.length;
    let layoutManagerStyle = {
        display: 'grid',
        height: window.innerHeight,
        width: window.innerWidth,
        border: '2px solid red',
        padding: '10px'
    }

    let width = 0;
    let height = 0;

    if (totalImages == 1) {
        layoutManagerStyle.gridTemplateColumns = `1fr`;
        width = layoutManagerStyle.height;
        height = layoutManagerStyle.width;
    }

    if (totalImages == 2) {
        layoutManagerStyle.gridTemplateColumns = `1fr 1fr`;
        width = layoutManagerStyle.height / 2;
        height = layoutManagerStyle.width / 2;
    }


    const layoutChildren = imagesForTesting.map((item, index) => <div key={item['id']}><img src={logo} alt="No image" height={height} width={width} /></div>)



    return (
        <React.Fragment>
            <div style={layoutManagerStyle}>
                {layoutChildren}
            </div>
        </React.Fragment>
    )
}

export default Video;