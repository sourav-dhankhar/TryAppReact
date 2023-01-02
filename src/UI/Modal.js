import React from "react";
import ReactDOM from 'react-dom';
import classes from "./Modal.module.css";
import MediaIconsListing from "../LoginPage/mediaDevices/MediaIconsListing";

const BackDrop = (props) => {
    return (
        <div className={classes.backdrop} onClick={props.closeModal} />
    )
}

const OverLay = (props) => {
    const message = props.title === 'Devices' ? <MediaIconsListing className={`${classes['content']}`} devices={props.message}></MediaIconsListing>: ''; 
    return (
        <div className={classes.modal}>
            <header className={classes.header}>
                <h2>{props.title}</h2>
            </header>
            {message}
            {props.title !== 'Devices' && <footer className={classes.actions}><button onClick={props.closeModal}>Okay</button></footer>}
        </div>
    )
}

const Modal = (props) => {
    const closeModal = () => {
        props.closeModal();
    }
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<BackDrop closeModal={closeModal}/>, document.getElementById('backDrop'))}
            {ReactDOM.createPortal(<OverLay title={props.title} message={props.message} closeModal={closeModal}/>, document.getElementById('overlay'))}
        </React.Fragment>
    );
}

export default Modal;