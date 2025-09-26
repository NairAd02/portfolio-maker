import { SectionStats } from "@/components/section-stats/section-stats";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, FolderOpen } from "lucide-react";
import React from "react";
import { getBlogsSectionReport } from "@/lib/services/portfolio";
import { Separator } from "@/components/ui/separator";
import NavigationComponent from "@/components/navigation-component/navigation-component";
import { paths } from "@/routes/path";
import { Button } from "@/components/ui/button";
import BlogsSectionFormContainer from "./form/blogs-section-form-container";

export default async function BlogsSectionContainer() {
  const res = await getBlogsSectionReport();

  if (!res.data || res.error)
    return <div>Error al cargar la sección de post y publicaciones</div>;

  const blogsSectionReport = res.data;
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Blog y Posts</CardTitle>
            <CardDescription>
              Información sobre tu contenido y publicaciones
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <BlogsSectionFormContainer blogsSectionReport={blogsSectionReport} />
        <Separator className="bg-primary" />
        <div className="flex flex-col gap-4 items-center justify-center">
          <SectionStats
            icon={FolderOpen}
            title="Blogs Totales"
            count={blogsSectionReport.blogsCount}
            description="Blogs registrados"
            variant="default"
          />
          <NavigationComponent href={paths.blogs.root}>
            <Button className="text-base cursor-pointer" size={"lg"}>
              Ver Blogs
            </Button>
          </NavigationComponent>
        </div>
      </CardContent>
    </Card>
  );
}
