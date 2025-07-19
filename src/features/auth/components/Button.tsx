import type React from "react"
import type { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode;
    asChildren?: boolean;
    variant?: "primary" | "outline" | "secondary"
}

const Button = ({children, variant = "outline", ...props}: ButtonProps) => {

    const base = "w-full h-[56px] py-2 rounded-[10px] font-medium flex items-center justify-center gap-2 transition";

    const style = variant === "primary" ? 
    "bg-primary text-white hover:bg-secondary":
    "border border-primary text-primary hover:bg-primary hover:text-white";

    return(
        <button className={`${base} ${style} justify-between px-4`} {...props}>
            {children}
        </button>
    )
}

export default Button