"use client";
import { useEffect, useState } from "react";
import "./highlighter.css"
export default function TorchEffect() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="mouse-light"
      style={{
        left: position.x,
        top: position.y,
      }}
    />
  );

}