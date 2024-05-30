import React, { useEffect, useState } from "react";

const CountDown = (props) => {
  const [duration, setDuration] = useState(1800);
  const { onTimeUp } = props;
  useEffect(() => {
    if (duration === 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setDuration(duration - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [duration]);

  const toHHMMSS = (ss) => {
    const s_num = parseInt(ss, 10);
    const h = Math.floor(s_num / 3600);
    const m = Math.floor(s_num / 60) % 60;
    const s = s_num % 60;

    return [h, m, s]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  };

  return <div className="coutdown-container">{toHHMMSS(duration)}</div>;
};

export default CountDown;
