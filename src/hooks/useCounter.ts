'use client'

import { useState } from 'react';

export function useCounter(initialValue: number = 0) {
  
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const resetCounter = () => setCount(initialValue);

  return {
    count,
    increment,
    decrement,
    resetCounter
  };
}
