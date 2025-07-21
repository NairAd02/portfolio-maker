import React, { ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

export interface AccordionItemType {
  value: string;
  trigger: ReactNode;
  content: ReactNode;
  className?: string;
  classNameTrigger?: string;
  classNameContent?: string;
}

interface Props {
  items: AccordionItemType[];
}

export default function AccordionContainer({ items }: Props) {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      {items.map((item) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          className={item.className}
        >
          <AccordionTrigger className={item.classNameTrigger}>
            {item.trigger}
          </AccordionTrigger>
          <AccordionContent className={item.classNameContent}>
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
