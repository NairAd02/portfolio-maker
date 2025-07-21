import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

export interface Example {
  title: string;
  description: string;
  image: string;
}

interface Props {
  example: Example;
}

export default function ExampleCard({ example }: Props) {
  return (
    <Card className="overflow-hidden hover:scale-105 transition-transform duration-300 border-t-4 border-t-primary/40 hover:border-t-primary">
      <Image
        src={example.image}
        alt={example.title}
        width={400}
        height={300}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-4">
        <h3 className="font-semibold text-slate-900">{example.title}</h3>
        <p className="text-sm text-slate-600">{example.description}</p>
      </CardContent>
    </Card>
  );
}
