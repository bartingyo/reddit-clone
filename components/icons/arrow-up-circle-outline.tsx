import { cn } from "@/lib/utils";
import { IconProps } from "@/types/icons";

export default function ArrowUpCircleOutline({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn("size-6", className)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}
