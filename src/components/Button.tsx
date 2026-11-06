import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  busyLabel?: string;
  busy?: boolean;
}

export function Button({ children, busy = false, busyLabel = "Carregando", className = "", disabled, ...props }: ButtonProps) {
  return (
    <button {...props} className={`button button-primary ${className}`} disabled={disabled || busy}>
      {busy ? <><span>{busyLabel}</span><span className="spinner" aria-hidden="true">◌</span></> : children}
    </button>
  );
}
