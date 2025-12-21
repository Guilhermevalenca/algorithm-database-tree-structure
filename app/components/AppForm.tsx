import type React from "react";

export function AppForm(props: React.FormHTMLAttributes<HTMLFormElement>) {
  return <form {...props}>{props.children}</form>;
}
