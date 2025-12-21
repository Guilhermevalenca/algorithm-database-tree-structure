import type React from "react";

export function AppButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return <button {...props}>{props.children}</button>;
}
