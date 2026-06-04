import React, { useRef, useState, MouseEvent, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  glowColor?: string;
  backgroundColor?: string;
  textColor?: string;
  hoverTextColor?: string;
  href?: string;
  target?: string;
  download?: string | boolean;
  rel?: string;
}

const HoverButton: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  className = '', 
  disabled = false,
  glowColor = '#00ffc3',
  backgroundColor = '#111827', // gray-900 equivalent
  textColor = '#ffffff',
  hoverTextColor = '#67e8f9', // cyan-300 equivalent
  href,
  target,
  download,
  rel
}) => {
  const buttonRef = useRef<any>(null);
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setGlowPosition({ x, y });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const defaultClasses = "relative inline-flex items-center justify-center border-none cursor-pointer overflow-hidden transition-all duration-300 select-none z-10";
  const finalClassName = `${defaultClasses} ${className || "px-8 py-4 text-xl rounded-lg font-sans"} ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`;

  const buttonStyle = {
    backgroundColor: backgroundColor,
    color: isHovered ? hoverTextColor : textColor,
  };

  const glowEffect = (
    <div
      className={`
        absolute w-[200px] h-[200px] rounded-full opacity-50 pointer-events-none 
        transition-transform duration-400 ease-out -translate-x-1/2 -translate-y-1/2
        ${isHovered ? 'scale-120' : 'scale-0'}
      `}
      style={{
        left: `${glowPosition.x}px`,
        top: `${glowPosition.y}px`,
        background: `radial-gradient(circle, ${glowColor} 10%, transparent 70%)`,
        zIndex: 0,
      }}
    />
  );

  const contentElement = (
    <span className="relative z-10 flex items-center gap-1.5">{children}</span>
  );

  if (href) {
    return (
      <a
        ref={buttonRef}
        href={href}
        target={target}
        download={typeof download === 'string' ? download : (download ? '' : undefined)}
        rel={rel}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={finalClassName}
        style={buttonStyle}
      >
        {glowEffect}
        {contentElement}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={finalClassName}
      style={buttonStyle}
    >
      {glowEffect}
      {contentElement}
    </button>
  );
};

export { HoverButton }
