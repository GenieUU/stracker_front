import React from 'react';
import { useStopwatch } from 'react-timer-hook';

function Stopwatch({ onStart, onPause, onReset }) {
  const {
    seconds,
    minutes,
    hours,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });

  React.useEffect(() => {
    if (onStart) {
      onStart(start);
    }
    if (onPause) {
      onPause(pause);
    }
    if (onReset) {
      onReset(reset);
    }
  }, [onStart, onPause, onReset, start, pause, reset]);

  return (
    <div>
      <div style={{ fontSize: '100px' }}>
        <span>{hours.toString().padStart(2, '0')}</span>:<span>{minutes.toString().padStart(2, '0')}</span>:<span>{seconds.toString().padStart(2, '0')}</span>
      </div>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={() => reset(false)}>Reset</button>
    </div>
  );
}

export default Stopwatch;
