"use client";

import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import TableMenu from "@/components/ui/table-menu";
import { paths } from "@/routes/path";
import { EditIcon, EyeIcon, Trash2 } from "lucide-react";
import NavigationComponent from "@/components/navigation-component/navigation-component";
import { Blog } from "@/lib/types/blogs";

interface Props {
  blogs: Blog[];
}

export default function BlogsList({ blogs }: Props) {
  const columns: ColumnDef<Blog>[] = [
    {
      accessorKey: "id",
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Título",
      cell: ({ row }) => {
        return (
          <p className="text-sm line-clamp-3 break-words max-w-[300px] whitespace-pre-wrap leading-relaxed">
            {row.getValue("name")}
          </p>
        );
      },
    },
    {
      accessorKey: "description",
      header: "Descripción",
      cell: ({ row }) => {
        const description = row.getValue("description") as string | undefined;
        return (
          <p className="text-sm line-clamp-3 break-words max-w-[300px] whitespace-pre-wrap leading-relaxed">
            {description || "no posee descripción"}
          </p>
        );
      },
    },
    {
      accessorKey: "date",
      header: "Fecha de Publicación",
      cell: ({ row }) => {
        return (
          <p className="text-sm line-clamp-3 break-words max-w-[300px] whitespace-pre-wrap leading-relaxed">
            {row.getValue("date")}
          </p>
        );
      },
    },
    {
      accessorKey: "link",
      header: "Enlace",
      cell: ({ row }) => {
        const link = row.getValue("link") as string | undefined;
        return link ? (
          <NavigationComponent href={link} inAnotherTab>
            {" "}
            Ir a ver
          </NavigationComponent>
        ) : (
          "No existe enlace para visualizar"
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex justify-end">
            <TableMenu
              titleTableMenu="Acciones"
              links={[
                {
                  label: "Ver Detalles",
                  icon: <EyeIcon />,
                  href: paths.certificationDetails({
                    id: row.getValue("id") as string,
                  }).root,
                },
                {
                  label: "Editar",
                  icon: <EditIcon />,
                  href: paths.editBlog({
                    id: row.getValue("id") as string,
                  }).root,
                },
                {
                  label: "Eliminar",
                  icon: <Trash2 />,
                  href: paths.deleteBlog({
                    id: row.getValue("id") as string,
                  }).root,
                },
              ]}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-6 mb-6 bg-white flex flex-col gap-2 rounded-lg shadow-sm">
      <div className="flex flex-col gap-4">
        <DataTable
          columns={columns}
          data={blogs}
          initialVisibilityState={{ id: false }}
        />
      </div>
    </div>
  );
}
