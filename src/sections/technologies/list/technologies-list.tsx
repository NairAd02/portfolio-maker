"use client";

import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import TableMenu from "@/components/ui/table-menu";
import { paths } from "@/routes/path";
import { EditIcon, Trash2 } from "lucide-react";
import { Technology } from "@/lib/types/technologies";
import AvatarContainer from "@/components/ui/avatar-container";

interface Props {
  technologies: Technology[];
}

export default function TechnologiesList({ technologies }: Props) {
  const columns: ColumnDef<Technology>[] = [
    {
      accessorKey: "id",
      enableHiding: false,
    },
    {
      accessorKey: "icon",
      header: "Icono",
      cell: ({ row }) => {
        const icon = row.getValue("icon") as string | undefined;
        const techName = row.getValue("name") as string;
        return (
          <AvatarContainer
            className="h-12 w-12"
            image={icon}
            fallback={techName.charAt(0)}
          />
        );
      },
    },
    {
      accessorKey: "name",
      header: "Nombre",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex justify-start">
            <TableMenu
              titleTableMenu="Acciones"
              links={[
                {
                  label: "Editar",
                  icon: <EditIcon />,
                  href: paths.editTechnology({
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
    <div className="px-6 py-3 bg-white flex flex-col gap-2 rounded-lg shadow-sm">
      <div className="flex flex-col gap-4">
        <DataTable
          columns={columns}
          data={technologies}
          initialVisibilityState={{ id: false }}
        />
      </div>
    </div>
  );
}
