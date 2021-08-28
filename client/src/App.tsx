import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { InitateRequest } from './proto/chat-service_pb';
import { ChatServiceClient } from './proto/Chat-serviceServiceClientPb';
import Greeting from './components/Greeting';

function App() {
    const handleUserSubmit = () => {};
    return (
        <div className='app'>
            <div className='app_container'>
                <Greeting onUsernameEnter={handleUserSubmit} />
            </div>
        </div>
    );
}

export default App;
