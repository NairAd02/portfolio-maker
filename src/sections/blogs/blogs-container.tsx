import SectionsHeader from "@/components/sections-header/sections-header";
import { paths } from "@/routes/path";
import { ScrollText } from "lucide-react";
import React from "react";
import BlogsListContainer from "./list/blogs-list-container";

export default function BlogsContainer() {
  return (
    <div className="flex flex-col gap-4">
      <SectionsHeader
        sectionIcon={<ScrollText />}
        sectionTitle="Gestión de Publicaciones"
        sectionDescription="Gestione las publicaciones que ha realizado a lo largo de su trayectoria"
        addButton={{
          isModalRedirect: false,
          buttonText: "Nueva Publicación",
          creationPath: paths.createBlog.root,
        }}
      />
      <BlogsListContainer />
    </div>
  );
}
