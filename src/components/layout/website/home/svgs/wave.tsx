import { cn } from "@/lib/utils";

interface WaveProps {
  className?: string;
  up?: boolean;
}

export default function Wave({ className, up = false }: WaveProps) {
  return (
    <svg
      role="img"
      aria-hidden="true"
      className={cn(
        className,
        up && "rotate-180 transition-transform duration-300"
      )}
      id="wave"
      viewBox="0 0 1440 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
          <stop stopColor="rgba(97, 74, 252, 1)" offset="0%" />
          <stop stopColor="rgba(97, 74, 252, 1)" offset="100%" />
        </linearGradient>
      </defs>
      <path
        fill="url(#sw-gradient-0)"
        d="M0,70L10,71.7C20,73,40,77,60,71.7C80,67,100,53,120,43.3C140,33,160,27,180,35C200,43,220,67,240,63.3C260,60,280,30,300,25C320,20,340,40,360,51.7C380,63,400,67,420,66.7C440,67,460,63,480,56.7C500,50,520,40,540,31.7C560,23,580,17,600,15C620,13,640,17,660,23.3C680,30,700,40,720,46.7C740,53,760,57,780,50C800,43,820,27,840,16.7C860,7,880,3,900,3.3C920,3,940,7,960,8.3C980,10,1000,10,1020,11.7C1040,13,1060,17,1080,25C1100,33,1120,47,1140,55C1160,63,1180,67,1200,63.3C1220,60,1240,50,1260,51.7C1280,53,1300,67,1320,75C1340,83,1360,87,1380,76.7C1400,67,1420,43,1430,31.7L1440,20V100H0Z"
      />
    </svg>
  );
}
