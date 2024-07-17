import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

function Home({ onStartClick, onCodeSubmit }) {
  const [code, setCode] = useState('');

  let navigate = useNavigate();
  function onStartClick() {
    navigate('/app');
  }

  return (
    <div>
      <h1>Welcome to the Value Identification Tool</h1>
      <button onClick={onStartClick}>Let's Start</button>
      <div>
        <input
          value={code}
          onChange={e => setCode(e.target.value)}
          placeholder="Enter your reference code"
        />
        <button onClick={() => onCodeSubmit(code)}>Revisit My Result</button>
      </div>
    </div>
  );
}

export default Home;
