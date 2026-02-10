import * as React from "react";

const FINE_POINTER_QUERY = "(pointer: fine) and (hover: hover)";

export function useHasFinePointer() {
  const [hasFinePointer, setHasFinePointer] = React.useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(FINE_POINTER_QUERY).matches;
  });

  React.useEffect(() => {
    const mql = window.matchMedia(FINE_POINTER_QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      setHasFinePointer(event.matches);
    };

    mql.addEventListener("change", onChange);
    setHasFinePointer(mql.matches);

    return () => mql.removeEventListener("change", onChange);
  }, []);

  return hasFinePointer;
}
