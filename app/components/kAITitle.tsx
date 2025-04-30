interface KAITitleProps {
  title: string;
  subtitle: string;
  description?: string;
  direction?: "left" | "right" | "center";
  className?: string;
  color?: "black" | "white";
}

export default function KAITitle({
  title,
  subtitle,
  description,
  direction = "center",
  className,
  color = "black",
}: KAITitleProps) {
  return (
    <div className={`text-${direction} ${className}`}>
      <h2
        className={`inline-flex items-center justify-center gap-1 text-base font-semibold opacity-0 translate-y-8 ${
          color === "white" ? "text-white" : "text-black"
        }`}
        data-title-animation
      >
        {title}
        <span className="w-3 h-[3px] bg-[#F82929] -mt-0.5" />
        {subtitle}
      </h2>
      {description && (
        <p
          className={`mt-8 text-[1.625rem] font-medium leading-11 tracking-tight text-center mx-auto opacity-0 translate-y-8 ${
            color === "white" ? "text-white" : "text-black"
          }`}
          data-description-animation
        >
          {description}
        </p>
      )}
    </div>
  );
}
