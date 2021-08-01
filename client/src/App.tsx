import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { InitateRequest } from './proto/chat-service_pb';
import { ChatServiceClient } from './proto/Chat-serviceServiceClientPb';

function App() {
  useEffect(() => {
    (async () => {
      const client = new ChatServiceClient('http://localhost:8080');
      const req = new InitateRequest();
      req.setName('Danish');
      req.setAvatarUrl('123');
      const response = await client.chatInitateRequest(req, {});
      console.log(response);
    })();
  }, []);
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
