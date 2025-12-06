import { useEffect, useRef, useState } from "react";

function App() {
  const timerRef = useRef();
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState({
    hr: 0,
    min: 0,
    sec: 0,
  });

  const pauseTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = null;
    setIsRunning(false);
  };

  const startTimer = () => {
    if (timerRef.current) return;

    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        let sec = prev.sec;
        let min = prev.min;
        let hr = prev.hr;

        sec++;

        if (sec >= 60) {
          min = min + 1;
          sec = 0;
        }
        if (min >= 60) {
          hr = hr + 1;
          min = 0;
        }

        return {
          sec,
          min,
          hr,
        };
      });
    }, 1000);

    setIsRunning(true);
  };

  const resetTimer = () => {
    setTimer({
      hr: 0,
      min: 0,
      sec: 0,
    });
    pauseTimer();
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const isStarted = timer.hr != 0 || timer.min != 0 || timer.sec != 0;

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "15px",
        }}
      >
        <div>{timer.hr}</div>
        <div>{timer.min}</div>
        <div>{timer.sec}</div>
      </div>
      <div>
        {!isStarted && <button onClick={() => startTimer()}>Start</button>}

        {isStarted && (
          <button
            onClick={() => {
              if (isRunning) {
                pauseTimer();
              } else {
                startTimer();
              }
            }}
          >
            {isRunning ? "Pause" : "Resume"}
          </button>
        )}

        {isStarted && <button onClick={() => resetTimer()}>Reset</button>}
      </div>
    </div>
  );
}

export default App;
