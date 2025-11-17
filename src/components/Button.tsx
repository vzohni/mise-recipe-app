import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tan";
}

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "px-6 py-2 rounded-lg font-medium transition-all duration-300 ease-in-out cursor-pointer shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-(--primary) text-white hover:bg-(--hover) hover:bg-opacity-80",
    secondary:
      "bg-white text-[#2E4442] border-2 border-[#2E4442] hover:bg-(--hover) hover:text-white",
    tan: "bg-[#D4A574] text-white hover:bg-[#C49464]",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
