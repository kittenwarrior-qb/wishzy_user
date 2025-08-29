import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import Link from "next/link"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[16px] text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "btn border",
        outline: "btn border border-base-content/30 bg-base-100 text-base-content hover:bg-base-300",
        ghost: "",
        threeD: "btn-shadow-primary hidden md:flex px-4 py-2 rounded-lg bg-primary text-primary-content shadow-[0_3px_0_#b56e04] transition duration-100 will-change-transform active:translate-y-[3px] active:shadow-none",
        threeDoutline: "hidden md:flex px-4 py-2 rounded-lg bg-transparent text-primary border border-primary shadow-[0_3px_0_#d48002] transition duration-100 will-change-transform active:translate-y-[3px] active:shadow-none",
        
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    href?: string
  }

function Button({
  className,
  variant,
  size,
  asChild = false,
  href,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  if (href) {
    if (asChild) {
      return (
        <Link href={href}>
          <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
          />
        </Link>
      )
    } else {
      return (
        <Link
          href={href}
          className={cn(buttonVariants({ variant, size, className }))}
        >
          {children}
        </Link>
      )
    }
  }

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </Comp>
  )
}

export { Button, buttonVariants }
