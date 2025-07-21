import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { fCurrency } from "@/lib/format-number";

export interface Plan {
  title: string;
  price: number;
  stage: string;
  startText: string;
  features: string[];
}

interface Props {
  plan: Plan;
}

export default function PlanCard({ plan }: Props) {
  return (
    <Card className="border-2 border-t-8 border-primary/40 hover:border-primary transition-colors">
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-2xl">{plan.title}</CardTitle>
        <div className="text-4xl font-bold text-slate-900">
          {fCurrency(plan.price)}
        </div>
        <p className="text-slate-600">{plan.stage}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3">
            <Check className="w-5 h-5 text-green-500" />
            <span>{feature}</span>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full bg-transparent">
          {plan.startText}
        </Button>
      </CardFooter>
    </Card>
  );
}
