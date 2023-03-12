import React, { useState, useEffect } from 'react'
import './App.css';

function App() {
  const [time, setTime] = useState(3666)
  const [isCounting, setIsCounting] = useState(false)

  let hours = Math.floor(time / (60 * 60));
  let divisorForMinutes = time % (60 * 60);
  let minutes = Math.floor(divisorForMinutes / 60);
  let divisorForSeconds = divisorForMinutes % 60;
  let seconds = Math.ceil(divisorForSeconds);

  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');

  useEffect(() => {
    const timer = setInterval(() => {
      isCounting && setTime(time => time >= 1 ? time - 1 : 0)
    }, 1000)
    if (time === 0) setIsCounting(false)
    if (!isCounting) clearInterval(timer)
    return () => {
      clearInterval(timer)
    }
  }, [isCounting, time])


  const handleStart = () => {
    setIsCounting(true)
    if (time === 0) setTime(3666)
  }
  const handleStop = () => {
    setIsCounting(false)
  }
  const handleReset = () => {
    setIsCounting(false)
    setTime(3666)
  }


  return (
    <div className="app">
      <div className="app__body">
        <div className='app__timer'>
          <span>{hours}</span>
          <span>:</span>
          <span>{minutes}</span>
          <span>:</span>
          <span>{seconds}</span>
        </div>
        <div className='app__buttons'>
          {
            isCounting
              ? <button onClick={handleStop}>Stop</button>
              : <button onClick={handleStart}>Start</button>
          }
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
