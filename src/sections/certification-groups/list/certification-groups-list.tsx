"use client";

import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import TableMenu from "@/components/ui/table-menu";
import { paths } from "@/routes/path";
import { EditIcon, EyeIcon, Trash2 } from "lucide-react";
import { CertificationGroup } from "@/lib/types/certification-groups";

interface Props {
  certificationGroups: CertificationGroup[];
}

export default function CertificationGroupsList({
  certificationGroups,
}: Props) {
  const columns: ColumnDef<CertificationGroup>[] = [
    {
      accessorKey: "id",
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: "Título",
      cell: ({ row }) => {
        return (
          <p className="text-sm line-clamp-3 break-words max-w-[300px] whitespace-pre-wrap leading-relaxed">
            {row.getValue("title")}
          </p>
        );
      },
    },
    {
      accessorKey: "certificationTitles",
      header: "Certificaciones",
      cell: ({ row }) => {
        const certificationTitles = row.getValue(
          "certificationTitles"
        ) as string[];
        return (
          <div className="flex flex-col gap-2">
            {certificationTitles.map((certificationTitle, index) => (
              <p
                key={index}
                className="text-sm line-clamp-3 break-words max-w-[300px] whitespace-pre-wrap leading-relaxed"
              >
                {certificationTitle}
              </p>
            ))}
          </div>
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
                  href: paths.editCertification({
                    id: row.getValue("id") as string,
                  }).root,
                },
                {
                  label: "Eliminar",
                  icon: <Trash2 />,
                  href: paths.deleteCertification({
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
          data={certificationGroups}
          initialVisibilityState={{ id: false }}
        />
      </div>
    </div>
  );
}
