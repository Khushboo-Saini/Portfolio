import { cn } from "../../lib/utils";

interface RadialGlowProps {
  className?: string;
  children?: React.ReactNode;
}

export function RadialGlowBackground({ className, children }: RadialGlowProps) {
  return (
    <div className={cn("absolute inset-0 z-0 overflow-hidden pointer-events-none", className)}>
      {/* Dark Radial Glow Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle 500px at 50% 200px, rgba(62, 62, 62, 0.15), transparent)`,
        }}
      />
      {children}
    </div>
  );
}
