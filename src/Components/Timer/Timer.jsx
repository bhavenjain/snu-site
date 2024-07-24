import React, { useEffect } from "react";
import Cookies from "js-cookie";

import styles from "./Timer.module.css"

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
    const mins = Cookies.get("minutes");
    const secs = Cookies.get("seconds");
    setMinutes(mins ? mins : initialMinute);
    setSeconds(secs ? secs : initialSeconds);
  }, [])

  // UseEffects
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
        Cookies.set("seconds", seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
          setTimerOver(true);
          Cookies.remove("minutes");
          Cookies.remove("seconds");
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
          Cookies.set("minutes", minutes - 1);
        }
      }
      console.log("....hello")
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div>
      {minutes === 0 && seconds === 0 ? null : (
        <h5 className={styles.time}>
          Time Left : {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h5>
      )}
    </div>
  );
};

export default Timer;
