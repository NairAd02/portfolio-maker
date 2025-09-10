"use client";

import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import TableMenu from "@/components/ui/table-menu";
import PreviewImage from "@/components/preview-image/preview-image";
import { paths } from "@/routes/path";
import { EditIcon, Trash2 } from "lucide-react";
import { principalPlaceHolder } from "@/lib/place-holders";
import { Experience } from "@/lib/types/experiences";

interface Props {
  experiences: Experience[];
}

export default function ExperiencesList({ experiences }: Props) {
  const columns: ColumnDef<Experience>[] = [
    {
      accessorKey: "id",
      enableHiding: false,
    },
    {
      accessorKey: "mainImage",
      header: "Imagen",
      cell: ({ row }) => (
        <PreviewImage
          preview={row.getValue("mainImage") || principalPlaceHolder}
          height={80}
          width={80}
        />
      ),
    },
    {
      accessorKey: "position",
      header: "Posición",
      cell: ({ row }) => {
        return (
          <p className="text-sm line-clamp-3 break-words max-w-[300px] whitespace-pre-wrap leading-relaxed">
            {row.getValue("position")}
          </p>
        );
      },
    },
    {
      accessorKey: "company",
      header: "Compañía",
      cell: ({ row }) => {
        return (
          <p className="text-sm line-clamp-3 break-words max-w-[300px] whitespace-pre-wrap leading-relaxed">
            {row.getValue("company")}
          </p>
        );
      },
    },
    {
      accessorKey: "description",
      header: "Descripción",
      cell: ({ row }) => {
        return (
          <p className="text-sm line-clamp-3 break-words max-w-[300px] whitespace-pre-wrap leading-relaxed">
            {row.getValue("company")}
          </p>
        );
      },
    },
    {
      accessorKey: "startdate",
      header: "Fecha de Inicio",
      cell: ({ row }) => {
        return (
          <p className="text-sm line-clamp-3 break-words max-w-[300px] whitespace-pre-wrap leading-relaxed">
            {row.getValue("startdate")}
          </p>
        );
      },
    },
    {
      accessorKey: "enddate",
      header: "Fecha de Finalización",
      cell: ({ row }) => {
        return (
          <p className="text-sm line-clamp-3 break-words max-w-[300px] whitespace-pre-wrap leading-relaxed">
            {row.getValue("enddate")}
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
                  href: paths.editExperience({
                    id: row.getValue("id") as string,
                  }).root,
                },
                {
                  label: "Eliminar",
                  icon: <Trash2 />,
                  href: paths.deleteTechnology({
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
          data={experiences}
          initialVisibilityState={{ id: false }}
        />
      </div>
    </div>
  );
}
