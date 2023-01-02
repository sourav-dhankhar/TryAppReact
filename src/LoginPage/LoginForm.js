import { useEffect, useState } from 'react';
import classes from './LoginForm.module.css';
import MediaIcons from './MediaIcons';
import axios from 'axios';
import { loggedInActions } from '../store/loggedInSlice';
import { useDispatch } from 'react-redux';
import localStream from './localStream/localStream';

const LoginForm = () => {
    const dispatch = useDispatch();

    const [name, setname] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    function updateName(event) {
        setname(event.target.value);
    }

    async function createRoom(event) {
        console.log('event ', event);
        event.preventDefault();
        var data = JSON.stringify({
            "name": name
          });
        var config = {
            method: 'post',
            url: 'http://localhost:3001/createRoom/',
            headers: { 
                'Content-Type': 'application/json'
              },
            data: data
        };

        try {
            const tokenData = await axios(config);
            console.log('tokenData ', tokenData);
            localStream.myStream.close();
            localStream.setMyStream(null);
            dispatch(loggedInActions.setLogIn(true));
        } catch (error) {
            console.log('error ', error);
        }
    }

    return (
        <div className={'d-flex flex-column justify-content-center align-items-center ' + classes['left-section']}>
            <form className='d-flex flex-column w-50' onSubmit={createRoom}>
                <div className='my-4'>
                    <input className='w-100' type="text" value={name} id="fname" name="fname" placeholder='Enter Your Name' onChange={updateName} required /><br />
                </div>
                <div>
                    <button className='w-100'>Enter</button>
                </div>
            </form>
            <div className={classes['mediaIcons']}>
                <MediaIcons />
            </div>
        </div>
    )
}

export default LoginForm;