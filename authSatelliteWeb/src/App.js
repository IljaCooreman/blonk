import React, { useEffect, useState } from 'react';
import uuid from 'uuid';
import './App.css';

import { GROUP, SERVER_HOST, SERVER_PORT } from './config';
import { createSocket, error, handshake } from './lib/createSocket';

export function App() {
  const [code, setCode] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    const ws = createSocket();
    ws.onmessage = message => {
      try {
        console.log(typeof message.data, message.data)
        const data = JSON.parse(message.data);
        setCode(data.body)
      }
      catch (e) {
        console.log(e)
      }
    }
  }, []);
  return (
    <div className="code-container">
      {
        code.map(bool => {
          return (
            <div className={`code-circle ${bool && 'black-fill'}`} />
          )
        })
      }
    </div>
  );
}

export default App;
