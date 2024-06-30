import { useEffect, useState } from "react";

interface PlayIconProps {
  fillPercent: number;
}
export default function PlayIcon({ fillPercent }: PlayIconProps) {
  const [currentPercent, setCurrentPercent] = useState<number>(0);

  useEffect(() => {
    let start: any;
    const duration = 50000; // Duration of the animation in milliseconds

    const step = (timestamp: any) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const newPercent = Math.min(
        (progress / duration) * fillPercent,
        fillPercent
      );
      setCurrentPercent(newPercent);
      if (progress < duration) {
        requestAnimationFrame(step);
      } else {
        setCurrentPercent(fillPercent);
      }
    };

    requestAnimationFrame(step);
  }, [fillPercent]);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 transition-all duration-300"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <defs>
        <linearGradient
          id="gradient"
          x1="0%"
          y1="0%"
          x2={fillPercent + "%"}
          y2="0%"
          className="transition-all duration-300"
        >
          <stop
            offset={currentPercent}
            className=""
            style={{ stopColor: "#c3f05d", transition: "all 0.3s" }}
          />
          <stop
            offset={currentPercent}
            style={{ stopColor: "transparent", transition: "all 0.3s" }}
          />
        </linearGradient>
      </defs>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M5 3l14 9-14 9V3"
        fill="url(#gradient)"
      />
    </svg>
  );
}
