import { cn } from "../../lib/utils";

interface ProjectGlowProps {
  className?: string;
  children?: React.ReactNode;
}

export default function ProjectGlowBackground({ className, children }: ProjectGlowProps) {
  return (
    <div className={cn("absolute inset-0 z-0 overflow-hidden pointer-events-none", className)}>
      {/* Lime Radial Glow Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle 500px at 50% 100px, rgba(132, 204, 22, 0.08), transparent)`,
        }}
      />
      {children}
    </div>
  );
}
