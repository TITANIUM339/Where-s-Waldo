import clsx from "clsx";
import { type ButtonHTMLAttributes, type ComponentProps } from "react";
import { Link } from "react-router";

interface ButtonAsButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
    icon?: boolean;
    link?: false;
    children: React.ReactNode;
}

interface ButtonAsLink extends ComponentProps<typeof Link> {
    variant?: "primary" | "secondary";
    icon?: boolean;
    link: true;
    children: React.ReactNode;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button({
    variant = "primary",
    icon = false,
    link = false,
    children,
    ...props
}: ButtonProps) {
    const baseClasses = clsx(
        "block",
        "rounded-md",
        icon && "p-2",
        !icon && ["pt-2", "pr-4", "pb-2", "pl-4"],
        "transition",
        "font-medium",
        "text-center",
        "hover:not-disabled:cursor-pointer",
    );

    const classes = {
        primary: clsx(
            baseClasses,
            "bg-red-500",
            "text-gray-100",
            "shadow-md",
            "shadow-red-500/50",
            "hover:not-disabled:bg-red-600",
            "hover:not-disabled:shadow-red-600/50",
            "dark:hover:not-disabled:bg-red-400",
            "dark:hover:not-disabled:shadow-red-400/50",
        ),
        secondary: clsx(
            baseClasses,
            "border",
            "border-gray-300",
            "hover:not-disabled:bg-gray-200",
            "dark:border-gray-700",
            "dark:hover:not-disabled:bg-gray-800",
        ),
    }[variant];

    if (link) {
        const {
            variant: _v,
            icon: _i,
            link: _l,
            children: _c,
            ...linkProps
        } = props as ButtonAsLink;

        return (
            <Link className={classes} {...linkProps}>
                {children}
            </Link>
        );
    } else {
        const {
            variant: _v,
            icon: _i,
            link: _l,
            children: _c,
            ...buttonProps
        } = props as ButtonAsButton;

        return (
            <button type="button" className={classes} {...buttonProps}>
                {children}
            </button>
        );
    }
}
