"use client";

import React from "react";

interface ButtonProps {
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button = ({ text, icon, onClick, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex w-30 justify-center items-center gap-1 rounded-xl bg-[#2F4698] px-3 py-2 text-white transition-all hover:bg-[#3654b3] cursor-pointer ${className}`}
    >
      {icon}
      <span className="whitespace-nowrap text-sm">{text}</span>
    </button>
  );
};

export default Button;
