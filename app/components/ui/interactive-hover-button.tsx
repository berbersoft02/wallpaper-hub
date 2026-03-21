import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  href?: string;
  target?: string;
  rel?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  InteractiveHoverButtonProps
>(({ text = "Button", className, href, target, rel, ...props }, ref) => {
  const content = (
    <>
      <span className="inline-block translate-x-0 transition-all duration-300 group-hover:translate-x-full group-hover:opacity-0">
        {text}
      </span>
      <div className="absolute inset-0 z-10 flex h-full w-full -translate-x-full items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        <span>{text}</span>
        <ArrowRight />
      </div>
      <div className="absolute left-[10%] top-[40%] h-2 w-2 scale-[1] rounded-lg bg-neon-pink transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8] group-hover:bg-neon-pink"></div>
    </>
  );

  const commonClasses = cn(
    "group relative w-auto min-w-[200px] cursor-pointer overflow-hidden rounded-full border border-neon-pink bg-dark-bg p-4 text-center font-pixel text-white transition-all duration-300 h-[70px] flex items-center justify-center",
    className,
  );

  if (href) {
    return (
      <a 
        href={href} 
        target={target}
        rel={rel}
        className={commonClasses} 
        {...(props as any)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={commonClasses}
      {...props}
    >
      {content}
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
