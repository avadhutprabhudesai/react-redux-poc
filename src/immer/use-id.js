import { useRef } from 'react';

export default function useId() {
  const idRef = useRef(0);

  const next = () => {
    let current = idRef.current;
    idRef.current = idRef.current + 1;
    return current;
  };

  return next;
}
