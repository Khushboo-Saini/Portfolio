import React, { useState, useEffect } from 'react';

interface DotCardProps {
  target?: number;
  duration?: number;
  children?: React.ReactNode;
  className?: string;
  title?: string;
  label?: string;
  showViews?: boolean;
}

export default function DotCard({ 
  target = 777000, 
  duration = 2000, 
  children,
  className = "",
  title,
  label = "Views",
  showViews = false
}: DotCardProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    const range = end - start;
    if (range <= 0) return;
    const increment = Math.ceil(end / (duration / 50));
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, 50);
    return () => clearInterval(timer);
  }, [target, duration]);

  const display = count < 1000 ? count : `${Math.floor(count / 1000)}k`;

  return (
    <div className={`outer ${className}`}>
      <div className="dot"></div>
      <div className="card relative overflow-hidden">
        <div className="ray"></div>
        {children ? (
          children
        ) : (
          <>
            {title && <div className="card-title font-bold text-white mb-2">{title}</div>}
            <div className="text">{display}</div>
            <div className="label">{label}</div>
          </>
        )}
        {showViews && !children && (
          <>
            <div className="text">{display}</div>
            <div className="label">{label}</div>
          </>
        )}
        <div className="line topl"></div>
        <div className="line leftl"></div>
        <div className="line bottoml"></div>
        <div className="line rightl"></div>
      </div>
    </div>
  );
}
