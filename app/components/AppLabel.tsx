import type React from "react";


export default function AppLabel(
  props: React.LabelHTMLAttributes<HTMLLabelElement>
) {
  return <label {...props}>{props.children}</label>;
}
