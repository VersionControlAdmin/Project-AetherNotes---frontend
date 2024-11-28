"use client"

import { cn } from "@/lib/utils"

interface ShimmerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Shimmer({ className, ...props }: ShimmerProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 -inset-x-4 opacity-20",
        "bg-[length:200%_100%] animate-shimmer",
        "bg-gradient-to-r from-transparent via-[#66FFFF] to-transparent",
        className
      )}
      {...props}
    />
  )
}

