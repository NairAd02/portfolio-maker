import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

interface Props {
  image?: string;
  fallback: string;
  className?: string;
}

export default function AvatarContainer({ image, fallback, className }: Props) {
  return (
    <Avatar className={className}>
      {image && <AvatarImage src={image} />}
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
