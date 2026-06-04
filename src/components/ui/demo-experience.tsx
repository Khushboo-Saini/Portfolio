import { GradientBackground } from "./dark-gradient-background"

export default function DemoExperience() {
  return (
    <GradientBackground>
      <div className="flex items-center justify-center min-h-screen w-full">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4 heading-font">Beautiful Gradient Background</h1>
          <p className="text-xl opacity-90 font-light body-font">Your content goes here</p>
        </div>
      </div>
    </GradientBackground>
  )
}
