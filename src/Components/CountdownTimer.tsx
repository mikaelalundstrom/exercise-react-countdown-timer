import { useState, useEffect, useRef } from "react";

function CountdownTimer() {
  const initialNumber = 60;
  const [timeLeft, setTimeLeft] = useState<number>(initialNumber);
  const [isActive, setIsActive] = useState<boolean>(false);

  const timerRef = useRef<number>(); // ??

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
            clearInterval(timerRef.current);
            return 0;
            // else count down by 1
          } else {
            return prevTime - 1;
          }
        });
        // else (if timer is not active)
      } else {
        // stop timer
        clearInterval(timerRef.current);
      }
    }, 1000);

    timerRef.current = timerInterval;

    return () => clearInterval(timerRef.current); //cleanup
  }, [isActive]);

  return (
    <section>
      <h1>Countdown Timer</h1>
      <h2>{timeLeft === 0 ? "BOOM!" : timeLeft} </h2>
      <h3>{timeLeft === 0 ? "time's up." : "seconds left..."}</h3>
      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </section>
  );
}

export default CountdownTimer;
