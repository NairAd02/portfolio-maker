import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

interface Props {
  image: string;
  fallback: string;
}

export default function AvatarContainer({ image, fallback }: Props) {
  return (
    <Avatar>
      <AvatarImage src={image} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
