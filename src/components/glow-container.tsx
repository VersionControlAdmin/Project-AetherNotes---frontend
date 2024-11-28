"use client";

import { useEffect, useState } from "react";

interface GlowContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function GlowContainer({
  children,
  className = "",
}: GlowContainerProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      const container = document.querySelector('.relative');
      if (container) {
        const rect = container.getBoundingClientRect();
        const x = ev.clientX - rect.left;
        const y = ev.clientY - rect.top;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div
        className="pointer-events-none fixed inset-0 z-30 transition duration-300 lg:absolute"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.30), transparent 80%)`,
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-30 transition duration-300 lg:absolute"
        style={{
          background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(14, 165, 233, 0.30), transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
}
