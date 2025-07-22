import Link from "next/link";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  href: string;
  inAnotherTab?: boolean;
}

export default function NavigationComponent({
  children,
  href,
  inAnotherTab = false,
}: Props) {
  return (
    <Link
      href={href}
      {...(inAnotherTab && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
    >
      {children}
    </Link>
  );
}
