import { ThreeDot } from "react-loading-indicators"
export function LoadingFallback() {
  return (
    <div className="flex items-center justify-center flex-col h-96">
      <ThreeDot
        variant="pulsate"
        color="var(--primary)"
        size="medium"
        text=""
        textColor=""
      />
    </div>
  )
}
