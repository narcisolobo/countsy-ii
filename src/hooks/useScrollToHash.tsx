import { useEffect } from "react";
import { useLocation } from "react-router";

function useScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const element = document.getElementById(hash.slice(1));
    element?.scrollIntoView({ behavior: "smooth" });
  }, [hash]);
}

export { useScrollToHash };
