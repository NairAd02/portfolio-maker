import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Props {
  sectionTitle: string;
  sectionDescription: string;
  variant?: "simple" | "complex";
}

export default function CertificationsSectionSkeleton({
  sectionTitle,
  sectionDescription,
  variant = "simple",
}: Props) {
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">{sectionTitle}</CardTitle>
            <CardDescription>{sectionDescription}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {/* Form skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-24 w-full" />
          <div className="flex gap-2">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>

        <Separator className="bg-primary" />

        {/* Stats skeleton */}
        {variant === "complex" && (
          <div className="flex flex-col gap-4 items-center justify-center">
            <div className="flex gap-4 items-center justify-center w-full">
              {/* First stat card skeleton */}
              <div className="flex-1 p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-8 h-8 rounded" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-6 w-8" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                </div>
              </div>

              {/* Second stat card skeleton */}
              <div className="flex-1 p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-8 h-8 rounded" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-6 w-8" />
                    <Skeleton className="h-3 w-36" />
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation buttons skeleton */}
            <div className="flex items-center justify-center gap-4">
              <Skeleton className="h-11 w-40" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
