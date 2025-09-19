"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpenText, Calendar, ExternalLink } from "lucide-react";
import { BlogDetails } from "@/lib/types/blogs";
import { formatDate } from "@/lib/format-date";
import NavigationComponent from "@/components/navigation-component/navigation-component";

interface Props {
  blog: BlogDetails;
}

export function BlogDetailsContainer({ blog }: Props) {
  return (
    <div className="">
      <div className="space-y-4 pb-6">
        <div className="flex items-center gap-4">
          <BookOpenText className=" w-10 h-10 text-primary" />
          <p className="text-2xl font-bold text-card-foreground leading-tight text-balance pr-8">
            {blog.name}
          </p>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <time dateTime={blog.date} className="text-sm font-medium">
            {formatDate(blog.date)}
          </time>
          <Badge variant="default" className="ml-2 ">
            ID: {blog.id}
          </Badge>
        </div>
      </div>

      <div className="space-y-6">
        <div className="prose prose-sm max-w-none">
          <h3 className="text-lg font-semibold text-card-foreground mb-3">
            Descripción
          </h3>
          <p className="text-card-foreground leading-relaxed text-pretty">
            {blog.description}
          </p>
        </div>

        {blog.link && (
          <div className="pt-4 border-t border-border">
            <NavigationComponent href={blog.link}>
              <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                <ExternalLink className="h-4 w-4" />
                Ver publicación completa
              </Button>
            </NavigationComponent>
          </div>
        )}
      </div>
    </div>
  );
}
