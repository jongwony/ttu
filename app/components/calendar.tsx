'use client'

import Image from 'next/image';
import React, { useState } from 'react';

export default function App() {
  const today = new Date();
  const [link, setLink] = useState('');
  const [year, setYear] = useState(today.getFullYear().toString());
  const [month, setMonth] = useState((today.getMonth() + 1).toString());
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
    <div className="flex justify-center items-center h-screen">
      <header>
        <Image width="300" height="300" src="/logo.svg" className="App-logo" alt="logo" />
        <h1 className="font-bold text-center">
          TTU GAENG CALENDAR MIGRATION
        </h1>
        <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow-md'>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              년도:
              <input
                type="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                disabled={isLoading}
                className={`w-full px-3 py-2 mt-1 border rounded ${
                  isLoading ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'border-gray-300'
                }`}
              />
            </label>
          </div>
          <div className='mb-4'>
            <label className="block mb-2 text-sm font-bold text-gray-700">
              월:
              <input
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                disabled={isLoading}
                className={`w-full px-3 py-2 mt-1 border rounded ${
                  isLoading ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'border-gray-300'
                }`}
              />
            </label>
          </div>
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">
              근무표 링크
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                disabled={isLoading}
                className={`w-full px-3 py-2 mt-1 border rounded ${
                  isLoading ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'border-gray-300'
                }`}
              />
            </label>
          </div>
          <button type="submit" disabled={isLoading}  className={`w-full px-4 py-2 font-bold text-white rounded bg-blue-500 hover:bg-blue-700 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}>동기화</button>
          {isLoading && <p className="text-center mt-4">동기화 중...</p>}
          {isFailed && <p className="text-center mt-4">재시도가 필요해요 😢</p>}
          {isSuccess && <p className="text-center mt-4">동기화 성공! 😎</p>}
        </form>
      </header>
    </div>
  );
}
