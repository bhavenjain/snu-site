import React, { useState, useEffect } from "react";

const Timer = (props) => {
  const {
    initialMinute = 0,
    initialSeconds = 0,
    setTimerOver,
    minutes,
    setMinutes,
    seconds,
    setSeconds,
  } = props;

  useEffect(() => {
    setMinutes(initialMinute);
    setSeconds(initialSeconds);
  }, [])

  // UseEffects
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
          setTimerOver(true);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div>
      {minutes === 0 && seconds === 0 ? null : (
        <h5>
          {" "}
          Time Left : {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h5>
      )}
    </div>
  );
};

export default Timer;
