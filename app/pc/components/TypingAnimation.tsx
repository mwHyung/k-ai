import { useEffect, useState } from "react";

type TypingAnimationProps = {
  text: string;
  speed?: number;
  onDone?: () => void;
};

export const TypingAnimation = ({ text, speed = 40, onDone }: TypingAnimationProps) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    if (!text) return;
    let i = 0;
    let cancelled = false;

    function typeNext() {
      setDisplayed(text.slice(0, i + 1));
      if (i < text.length - 1 && !cancelled) {
        i++;
        setTimeout(typeNext, speed);
      } else if (!cancelled && onDone) {
        onDone();
      }
    }

    typeNext();

    return () => {
      cancelled = true;
    };
  }, [text, speed, onDone]);

  return (
    <span aria-live="polite" className="flex items-center whitespace-pre-line pt-2 pr-3 pb-4">
      {displayed}
      <span className="inline-block w-[1px] h-4.5 text-base align-bottom animate-blink bg-black ml-1 rounded" />
    </span>
  );
};
