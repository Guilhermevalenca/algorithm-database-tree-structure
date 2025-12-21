import type React from "react";

export function AppSelect(
  props: React.SelectHTMLAttributes<HTMLSelectElement>
) {
  return <select {...props}>{props.children}</select>;
}

export function AppOption(
  props: React.OptionHTMLAttributes<HTMLOptionElement>
) {
  return <option {...props}>{props.children}</option>;
}
