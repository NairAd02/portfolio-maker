"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React from "react";

interface Props {
  filterName: string;
  filterValue: string;
  handleDeleteFilter: () => void;
}

export default function FilterBadge({
  filterName,
  filterValue,
  handleDeleteFilter,
}: Props) {
  return (
    <Badge variant="default" className="gap-1">
      {filterName + ": " + filterValue}
      <Button
        className="size-4 cursor-pointer"
        size={"icon"}
        variant={"destructive"}
        onClick={handleDeleteFilter}
      >
        <X className="size-3" />
      </Button>
    </Badge>
  );
}
