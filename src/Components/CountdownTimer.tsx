import { useState, useEffect, useRef } from "react";

function CountdownTimer() {
  const initialNumber = 20;
  const [timeLeft, setTimeLeft] = useState<number>(initialNumber);
  const [isActive, setIsActive] = useState<boolean>(false);

  const timerRef = useRef(null); // ??

  const handleStart = () => {
    setIsActive(true);
  };
  const handlePause = () => {
    setIsActive(false);
  };
  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(initialNumber);
  };

  useEffect(() => {
    // set an interval of 1s
    const timerInterval = setInterval(() => {
      // do if timer is active
      if (isActive) {
        // update time left
        setTimeLeft((prevTime) => {
          // if time left is 0
          if (prevTime === 0) {
            // set is active to false
            setIsActive(false);
            // clear interval (stop timer)
            clearInterval(timerInterval);
            return 0;
            // else count down by 1
          } else {
            return prevTime - 1;
          }
        });
        // else (if timer is not active)
      } else {
        // stop timer
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => clearInterval(timerInterval); //cleanup
  });

  return (
    <div>
      <h1>Countdown Timer</h1>
      <h2>{timeLeft} seconds left</h2>
      <button onClick={handleStart}>Start</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default CountdownTimer;
