import { useEffect, useState } from "react";

export default function useDelay(keyword) {
  const [delayedKeyword, setDelayedKeyword] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDelayedKeyword(keyword);
    }, 500);
    return () => clearTimeout(timeout);
  }, [keyword]);
  return delayedKeyword;
}
