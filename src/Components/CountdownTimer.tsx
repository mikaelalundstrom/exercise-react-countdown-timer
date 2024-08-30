import { useState, useEffect, useRef, ChangeEvent } from "react";

function CountdownTimer() {
  // default time. set as timeLeft on mount and will default back to this number if user input is invalid
  const defaultTime = 60;
  // used to remember latest starttime when clicking reset (instead of going back to default)
  const startTimeRef = useRef<number>(defaultTime);
  // ref to timer so interval can be cleared wherever in the code
  const timerRef = useRef<number>();

  // to set time left on timer
  const [timeLeft, setTimeLeft] = useState<number>(defaultTime);
  // to set if timer is ongoing or not
  const [isActive, setIsActive] = useState<boolean>(false);

  // start button
  const handleStart = () => {
    setIsActive(true);
  };

  // pause button
  const handlePause = () => {
    setIsActive(false);
    // stop timer
    clearInterval(timerRef.current);
  };

  // reset button
  const handleReset = () => {
    setIsActive(false);
    // stop timer
    clearInterval(timerRef.current);
    // set time left to current startTime
    setTimeLeft(startTimeRef.current);
  };

  // user input
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    // change value with type string to type number
    let userNumber = Number(event.target.value);

    // (don't have to check for NaN since input only takes numbers)

    // input can't be less than 1
    if (userNumber < 1) {
      // set time left to the default time
      setTimeLeft(defaultTime);
      // update starttime ref
      startTimeRef.current = defaultTime;
      // valid user input
    } else {
      // to make sure userNumber is a whole number
      userNumber = Math.round(userNumber);
      // set time left to usernumber
      setTimeLeft(userNumber);
      // update starttime ref
      startTimeRef.current = userNumber;
    }
  };

  useEffect(() => {
    // do if is active
    if (isActive) {
      // set an interval of 1s to timerRef
      timerRef.current = setInterval(() => {
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
      }, 1000);
    }
    // only "listens" to isActive
  }, [isActive]);

  return (
    <section className={`timer ${!isActive && timeLeft !== 0 ? "inactive" : null}`}>
      <h1>Countdown Timer</h1>
      <h2>{timeLeft === 0 ? "BOOM" : timeLeft} </h2>
      <h3>
        {timeLeft === 0
          ? "time's up."
          : isActive
          ? "seconds left..."
          : startTimeRef.current === timeLeft
          ? "seconds. waiting to start"
          : "seconds left. paused"}
      </h3>
      <div className="buttons">
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div className="user-input">
        <label htmlFor="inputTime">Start time (seconds): </label>
        <input
          onChange={handleOnChange}
          id="inputTime"
          type="number"
          placeholder={startTimeRef.current.toString()}
        />
      </div>
    </section>
  );
}

export default CountdownTimer;
