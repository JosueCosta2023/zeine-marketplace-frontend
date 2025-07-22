import type React from "react"
import type { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode;
    asChildren?: boolean;
    variant?: "primary" | "outline" | "secondary";
    className?: string
}

const Button = ({className = "", children, variant = "outline", ...props}: ButtonProps) => {

    const base = "w-full py-2 rounded-[10px] font-medium flex items-center justify-center gap-2 transition";

    const style = variant === "primary" ? 
    "bg-primary text-white hover:bg-secondary":
    "border border-primary text-primary hover:bg-primary hover:text-white";

    const hasHeight = /\bh-\[?\d/.test(className);
    const height = hasHeight ? "" : "h-[56px]"

    return(
        <button className={`${base} ${style} ${height} justify-between px-4`} {...props}>
            {children}
        </button>
    )
}

export default Button