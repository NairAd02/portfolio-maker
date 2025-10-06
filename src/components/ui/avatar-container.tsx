import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

interface Props {
  image?: string;
  fallback: string;
  className?: string;
  avatarFallbackClassName?: string;
}

export default function AvatarContainer({
  image,
  fallback,
  className,
  avatarFallbackClassName,
}: Props) {
  return (
    <Avatar className={className}>
      {image && <AvatarImage src={image} />}
      <AvatarFallback className={avatarFallbackClassName}>
        {fallback}
      </AvatarFallback>
    </Avatar>
  );
}
