import Link from "next/link";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  href: string;
  inAnotherTab?: boolean;
  className?: string;
}

export default function NavigationComponent({
  children,
  href,
  inAnotherTab = false,
  className,
}: Props) {
  return (
    <Link
      href={href}
      {...(inAnotherTab && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
      className={className}
    >
      {children}
    </Link>
  );
}
