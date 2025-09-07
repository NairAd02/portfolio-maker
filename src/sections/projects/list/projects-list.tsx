"use client";

import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import TableMenu from "@/components/ui/table-menu";
import PreviewImage from "@/components/preview-image/preview-image";
import { Project } from "@/lib/types/projects";
import { paths } from "@/routes/path";
import { EditIcon, EyeIcon } from "lucide-react";

interface Props {
  projects: Project[];
}

export default function ProjectsList({ projects }: Props) {
  const columns: ColumnDef<Project>[] = [
    {
      accessorKey: "id",
      enableHiding: false,
    },
    {
      accessorKey: "mainImage",
      header: "Imagen",
      cell: ({ row }) => (
        <PreviewImage
          preview={row.getValue("mainImage") || "/images/place-holder.jpg"}
          height={80}
          width={80}
        />
      ),
    },
    {
      accessorKey: "name",
      header: "Nombre",
    },
    {
      accessorKey: "description",
      header: "Descripción",
      cell: ({ row }) => {
        return (
          <p className="text-sm line-clamp-3 break-words max-w-[300px] whitespace-pre-wrap leading-relaxed">
            {row.getValue("description")}
          </p>
        );
      },
    },
    {
      accessorKey: "problem",
      header: "Problema",
      cell: ({ row }) => {
        return (
          <p className="text-sm line-clamp-3 break-words max-w-[300px] whitespace-pre-wrap leading-relaxed">
            {row.getValue("problem")}
          </p>
        );
      },
    },
    {
      accessorKey: "solution",
      header: "Solución",
      cell: ({ row }) => {
        return (
          <p className="text-sm line-clamp-3 break-words max-w-[300px] whitespace-pre-wrap leading-relaxed">
            {row.getValue("solution")}
          </p>
        );
      },
    },
    {
      accessorKey: "impact",
      header: "Impacto",
      cell: ({ row }) => {
        return (
          <p className="text-sm line-clamp-3 break-words max-w-[300px] whitespace-pre-wrap leading-relaxed">
            {row.getValue("impact")}
          </p>
        );
      },
    },
    {
      accessorKey: "teachings",
      header: "Aprendizaje",
      cell: ({ row }) => {
        return (
          <p className="text-sm line-clamp-3 break-words max-w-[300px] whitespace-pre-wrap leading-relaxed">
            {row.getValue("teachings")}
          </p>
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
                  label: "Editar",
                  icon: <EditIcon />,
                  href: paths.editProject({ id: row.getValue("id") as string })
                    .root,
                },
                {
                  label: "Ver Detalles",
                  icon: <EyeIcon />,
                  href: paths.projectDetails({
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
          data={projects}
          initialVisibilityState={{ id: false }}
        />
      </div>
    </div>
  );
}
