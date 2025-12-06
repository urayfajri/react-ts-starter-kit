import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-md hover:shadow-lg hover:from-primary/95 hover:to-primary/85 active:shadow-sm",
        outline:
          "border-2 border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground hover:border-primary/50 shadow-sm transition-all",
        ghost: "text-foreground hover:bg-accent/50 hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm hover:shadow-md",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg active:bg-red-800",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-6 text-base",
        icon: "h-10 w-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
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
