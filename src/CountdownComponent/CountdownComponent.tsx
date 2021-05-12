import React, { MutableRefObject, useEffect, useState } from "react";
import "../css/TestComponent.css";

export interface CountdownComponentProps {
  nb: number;
  onDone: () => void;
}

const CountdownComponent: React.FC<CountdownComponentProps> = ({
  nb,
  onDone,
}: CountdownComponentProps) => {
  const counterRef: MutableRefObject<NodeJS.Timeout> = React.useRef(
    0 as unknown as NodeJS.Timeout
  );
  const initialCountDown = 30;
  const [count, setCount] = useState<number>(initialCountDown);
  const currentCount = React.useRef(initialCountDown)

  const resetCounter = (initial: number) => {
    clearInterval(counterRef.current);
    setCount(() => initial);
  };

  const countdownFunc = () => {
    if (currentCount.current <= 0) {
      resetCounter(0);
      onDone();
    } else {
      setCount((c:number) => {
        currentCount.current = c - 1
        return currentCount.current
      });
    }
  };
  const startTimer = () => {
    counterRef.current = setInterval(countdownFunc, 1000);
  };
  useEffect(() => {
    resetCounter(initialCountDown);
    startTimer();
    return () => clearInterval(counterRef.current)
  }, [nb]);

  return <p id="count_id" className="value">{count}s</p>;
};

export default CountdownComponent;
