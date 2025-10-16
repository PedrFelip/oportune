import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        green:
          "border-transparent bg-green-500 hover:bg-green-600 font-bold text-white",
        yellow:
          "border-transparent bg-yellow-500 hover:bg-yellow-600 font-bold text-white",
        red: "border-transparent bg-red-500 hover:bg-red-600 font-bold text-white",
        blue: "border-transparent bg-blue-500 hover:bg-blue-600 font-bold text-white",
        pink: "border-transparent bg-pink-500 hover:bg-pink-600 font-bold text-white",
        purple:
          "border-transparent bg-purple-500 hover:bg-purple-600 font-bold text-white",
        orange:
          "border-transparent bg-orange-500 hover:bg-orange-600 font-bold text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// ✨ 1. ADIÇÃO: Defina manualmente as variantes que podem ser sorteadas
// TypeScript vai garantir que você só coloque nomes que existem em 'badgeVariants'
const randomizableVariants: VariantProps<typeof badgeVariants>["variant"][] = [
  "default",
  "secondary",
  "destructive",
  "green",
  "yellow",
  "red",
  "blue",
  "pink",
  "purple",
  "orange",
];

// ✨ 2. ADIÇÃO: Defina a interface de props para incluir a opção "random"
interface BadgeProps
  extends React.ComponentProps<"span">,
    Omit<VariantProps<typeof badgeVariants>, "variant"> {
  asChild?: boolean;
  variant?: VariantProps<typeof badgeVariants>["variant"] | "random";
}

function Badge({ className, variant, asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : "span";

  const [finalVariant] = React.useState(() => {
    if (variant === "random") {
      const randomIndex = Math.floor(
        Math.random() * randomizableVariants.length
      );
      return randomizableVariants[randomIndex];
    }
    // Se não for "random", usa a variante passada ou o padrão do cva
    return variant;
  });

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant: finalVariant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
