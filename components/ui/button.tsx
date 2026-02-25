import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap text-[11px] font-medium uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40",
    {
        variants: {
            variant: {
                default:
                    "border border-accent bg-accent/10 text-accent hover:bg-accent/20",
                destructive:
                    "border border-destructive bg-destructive/10 text-destructive hover:bg-destructive/20",
                outline:
                    "border border-border bg-transparent text-muted-foreground hover:border-foreground hover:text-foreground",
                secondary:
                    "border border-border bg-secondary text-secondary-foreground hover:bg-secondary/70",
                ghost: "text-muted-foreground hover:bg-secondary hover:text-foreground",
                link: "text-accent underline-offset-4 hover:underline",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 px-3 text-[10px]",
                lg: "h-10 px-6",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
