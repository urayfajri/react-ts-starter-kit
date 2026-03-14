import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold",
    "transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
    "active:scale-[0.98] cursor-pointer select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-md",
          "hover:from-primary/95 hover:to-primary/85 hover:shadow-lg hover:-translate-y-px",
          "active:shadow-sm active:translate-y-0",
        ].join(" "),
        outline: [
          "border-2 border-input bg-background text-foreground shadow-sm",
          "hover:bg-accent hover:text-accent-foreground hover:border-primary/40 hover:bg-primary/5",
          "active:bg-primary/10",
        ].join(" "),
        ghost: [
          "text-foreground",
          "hover:bg-accent/60 hover:text-accent-foreground",
          "active:bg-accent/80",
        ].join(" "),
        secondary: [
          "bg-secondary text-secondary-foreground shadow-sm",
          "hover:bg-secondary/80 hover:shadow",
          "active:bg-secondary/90",
        ].join(" "),
        destructive: [
          "bg-red-600 text-white shadow-md",
          "hover:bg-red-700 hover:shadow-lg hover:-translate-y-px",
          "active:bg-red-800 active:translate-y-0",
          "focus-visible:ring-red-500/50",
        ].join(" "),
      },
      size: {
        default: "h-10 min-h-10 px-4 py-2",
        sm: "h-8 min-h-8 rounded-md px-3 text-xs",
        lg: "h-12 min-h-12 rounded-lg px-6 text-base",
        icon: "h-10 w-10 min-h-10 min-w-10 rounded-lg p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  ),
);
Button.displayName = "Button";
