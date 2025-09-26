import Link from "next/link";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  href: string;
  inAnotherTab?: boolean;
  className?: string;
  scroll?: boolean;
}

export default function NavigationComponent({
  children,
  href,
  inAnotherTab = false,
  className,
  scroll = true,
}: Props) {
  return (
    <Link
      href={href}
      scroll={scroll}
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
