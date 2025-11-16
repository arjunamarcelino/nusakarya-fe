"use client";
import { motion, MotionProps } from "framer-motion";
import { cn } from "@/app/_libs/utils";

export function Badge({
  className,
  children,
  ...props
}: { className?: string; children?: React.ReactNode } & MotionProps) {
  return (
    <motion.div
      className={cn(
        "bg-primary/10 font-semibold text-lg uppercase text-primary flex items-center w-fit justify-center gap-2 px-4.5 py-1.4 text-nowrap",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
