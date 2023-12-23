import logo from './logo.svg';
import React, { useState } from 'react';

import './App.css';

function App() {
  const today = new Date();
  const [link, setLink] = useState('');
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true); // Start loading
    setIsSuccess(false);
    setIsFailed(false);
    // Replace with your server endpoint
    fetch('https://9e240d7v0k.execute-api.ap-northeast-2.amazonaws.com/api/ttu_gaeng/duty', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'year': year, 'month': month, 'website': link }),
    })
      .then(response => {
        setIsSuccess(response.ok);
        setIsFailed(!response.ok);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsFailed(true);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="app">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          TTU GAENG CALENDAR MIGRATION
        </p>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              년도:
              <input
                type="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                disabled={isLoading}
              />
            </label>
          </div>
          <div>
            <label>
              월:
              <input
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                disabled={isLoading}
              />
            </label>
          </div>
          <div>
            <label>
              근무표 링크
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                disabled={isLoading}
              />
            </label>
          </div>
          <button type="submit" disabled={isLoading}>Submit</button>
          {isLoading && <p>동기화 중...</p>}
          {isFailed && <p>재시도가 필요해요 😢</p>}
          {isSuccess && <p>동기화 성공! 😎</p>}
        </form>
      </header>
    </div>
  );
}

export default App;
