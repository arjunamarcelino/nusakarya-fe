import { cn } from "../../_libs/utils";
import React from "react";

type TPrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  textClassName?: string;
  disabled?: boolean;
  isLoading?: boolean;
  loadingMessage?: string;
};

export const PrimaryButton = React.forwardRef<
  HTMLButtonElement,
  TPrimaryButtonProps
>(function PrimaryButton(
  {
    className,
    children,
    disabled = false,
    isLoading = false,
    loadingMessage = "Please Wait",
    textClassName,
    ...props
  },
  ref
) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-full cursor-pointer font-SourceSans3SemiBold uppercase w-fit h-fit outline-0 relative transition-all duration-500 bg-gradient-to-r",
        disabled
          ? "from-[#aab3b6] to-[#606364] cursor-not-allowed"
          : "from-[var(--color-nusa-blue)] via-[var(--color-deep-navy)] to-[var(--color-nusa-blue)] bg-[length:200%_200%] bg-[position:100%_100%] hover:bg-[position:0%_0%]",
        className
      )}
      ref={ref}
      disabled={disabled}
      {...props}
    >
      {isLoading ? (
        <p className="text-white">{loadingMessage}</p>
      ) : (
        <span
          className={cn(
            "flex items-center gap-[10px]",
            disabled ? "text-muted" : "text-white",
            textClassName
          )}
        >
          {children}
        </span>
      )}
    </button>
  );
});
