import { ReactElement } from "react";

  interface ButtonProps {
    variant: 'primary' | 'secondary';
    text: string;
    startIcon?: ReactElement;
    onClick?: () => void;
  }

  const variantClasses = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-200 text-purple-600"
  }
  const defaultStyles = "px-4 py-2 rounded-md font-normal flex gap-1 items-center shadow-md cursor-pointer"
  
  const Button = ({variant, text, startIcon, onClick}: ButtonProps) => {
  return (
    <button onClick={onClick} className={variantClasses[variant]+ " " +defaultStyles}>{startIcon}{text}</button>
  )
}

export default Button
