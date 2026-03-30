import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  // Définition des styles selon la variante
  const baseStyles = "inline-flex items-center justify-center transition-all duration-500 font-sans uppercase font-bold tracking-[0.25em]";
  
  const variants = {
    primary: "bg-[#EAE8E3] text-[#121110] hover:bg-white",
    outline: "border border-[#EAE8E3]/30 text-[#EAE8E3] hover:border-[#EAE8E3] bg-transparent",
    ghost: "text-[#EAE8E3]/70 hover:text-[#EAE8E3] bg-transparent",
    gold: "bg-[#C5B39B] text-[#121110] hover:bg-[#d6c4ac]", // Pour des actions premium
  };

  const sizes = {
    sm: "px-6 py-3 text-[0.55rem]",
    md: "px-8 py-4 text-[0.65rem]",
    lg: "px-10 py-5 text-[0.75rem]",
  };

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "";

  const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`;

  // Si un lien est fourni, on retourne un composant Link de Next.js
  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  // Sinon, on retourne un bouton classique (pour les formulaires ou actions JS)
  return (
    <button className={combinedClasses} disabled={disabled} {...props}>
      {children}
    </button>
  );
}