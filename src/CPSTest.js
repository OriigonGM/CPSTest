import React, { useState, useEffect } from 'react';
import './App.css';

const CpsTest = () => {
  const [clicks, setClicks] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        const timeElapsed = (Date.now() - startTime) / 1000;
        setElapsedTime(timeElapsed.toFixed(2));
      }, 10);
    }
    return () => clearInterval(interval);
  }, [clicks, startTime, isRunning]);

  useEffect(() => {
    let timeout;
    if (isRunning) {
      timeout = setTimeout(() => {
        setIsRunning(false);
        const timeElapsed = 5;
        console.log('Time Elapsed: ', timeElapsed);
        console.log('Clicks: ', clicks);
        setElapsedTime(timeElapsed.toFixed(2));
      }, 5000); // Stop after 5 seconds
    }
    return () => clearTimeout(timeout);
  }, [isRunning, startTime]);

  const handleClick = () => {
    if (!isRunning) {
      setStartTime(Date.now());
      setIsRunning(true);
      setClicks(0); // Reset clicks when the test starts
      setElapsedTime(0); // Reset elapsed time when the test starts
    }
    setClicks(clicks + 1);
  };

  const handleReset = () => {
    setClicks(0);
    setStartTime(null);
    setIsRunning(false);
    setElapsedTime(0);
  };

  return (
    <div className="container">
      <h1>CPS Test</h1>
      <p>Click the button as fast as you can for 5 seconds!</p>
      <button onClick={handleClick} className='button-click' disabled={isRunning === false && clicks > 0}>
        Click me!
      </button>
      <p>Clicks: {clicks}</p>
      <p>CPS: {(clicks/elapsedTime).toFixed(2)}</p>
      <p>Time Elapsed: {elapsedTime} seconds</p>
      <button onClick={handleReset} className='button'>
        Reset
      </button>
    </div>
  );
};

export default CpsTest;