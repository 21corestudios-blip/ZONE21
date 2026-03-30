import React from "react";

interface SectionTitleProps {
  subtitle?: string; // Le petit texte en majuscule au-dessus (ex: "Le Manifeste")
  title: string;     // Le titre principal
  align?: "left" | "center" | "right";
  className?: string;
}

export default function SectionTitle({
  subtitle,
  title,
  align = "left",
  className = "",
}: SectionTitleProps) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  return (
    <div className={`flex flex-col gap-3 ${alignmentClasses[align]} ${className}`}>
      {subtitle && (
        <span className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-[#EAE8E3]/60 font-medium">
          {subtitle}
        </span>
      )}
      <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#EAE8E3] leading-tight">
        {title}
      </h2>
    </div>
  );
}