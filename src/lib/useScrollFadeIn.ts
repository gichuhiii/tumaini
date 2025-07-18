import { useEffect, useRef, useState } from "react";

export function useScrollFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return {
    ref,
    className: visible
      ? "opacity-100 translate-y-0 transition-all duration-700 ease-out"
      : "opacity-0 translate-y-8",
  };
} 