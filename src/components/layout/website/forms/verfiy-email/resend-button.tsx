// components/resend-button.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";

interface ResendButtonProps {
  /** Visible label when enabled (default: "Resend") */
  label?: string;
  /** Cooldown in seconds (default: 60) */
  cooldownSeconds?: number;
  /** Optional callback when user clicks (e.g., call resend API) */
  onClick?: () => void;
  className?: string;
}

export default function ResendButton({
  label = "Resend",
  cooldownSeconds = 60,
  onClick,
  className,
}: ResendButtonProps) {
  const [remaining, setRemaining] = useState<number>(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (remaining <= 0) {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          if (timerRef.current) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
          }
          return 0;
        }
        return r - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [remaining]);

  function handleClick() {
    console.log("clicked");
    onClick?.();
    setRemaining(cooldownSeconds);
  }

  const disabled = remaining > 0;

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={className}
      aria-disabled={disabled}
    >
      {disabled ? `${label} (${remaining}s)` : label}
    </button>
  );
}
