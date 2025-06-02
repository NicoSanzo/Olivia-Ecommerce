import { useState, useEffect, useRef } from "react";

export function useHeaderB() {

  const [shrunk, setShrunk] = useState(false);
  
  const Logo = useRef(null);
  const NavBar = useRef(null);

  useEffect(() => {
    const handleScrollResize = () => {
      setShrunk(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScrollResize);
    window.addEventListener("resize", handleScrollResize);

    return () => {
      window.removeEventListener("scroll", handleScrollResize);
      window.removeEventListener("resize", handleScrollResize);
    };
  }, []);

  return { Logo, NavBar, shrunk };
}