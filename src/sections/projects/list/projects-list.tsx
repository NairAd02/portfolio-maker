"use client";

import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, EyeIcon } from "lucide-react";
import { use, useCallback } from "react";
import { Proyect } from "@/lib/types/proyects";
import TableMenu from "@/components/ui/table-menu";
import PreviewImage from "@/components/preview-image/preview-image";

interface Props {
  proyects: Proyect[];
}

export default function ProjectsList({ proyects }: Props) {
  const { handleOpenModal } = use(ModalContext);

  const handleEdit = useCallback(
    (id: string) => {
      handleOpenModal({
        name: modalTypes.newProyectModal.name,
        entity: id,
      });
    },
    [handleOpenModal]
  );

  const handleViewDetails = useCallback(
    (id: string) => {
      handleOpenModal({
        name: modalTypes.newProyectModal.name,
        entity: id,
      });
    },
    [handleOpenModal]
  );

  const columns: ColumnDef<Proyect>[] = [
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
          <p className="text-sm line-clamp-3 break-words max-w-[300px] whitespace-pre-wrap leading-relaxed text-gray-700">
            {row.getValue("description")}
          </p>
        );
      },
    },
    {
      accessorKey: "problem",
      header: "Problema",
    },
    {
      accessorKey: "solution",
      header: "Solución",
    },
    {
      accessorKey: "impact",
      header: "Impacto",
    },
    {
      accessorKey: "teachings",
      header: "Aprendizaje",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex justify-end">
            <TableMenu
              titleTableMenu="Acciones"
              actions={[
                {
                  label: "Ver Detalles",
                  icon: <EyeIcon />,
                  action: () => {
                    handleViewDetails(row.getValue("id"));
                  },
                },
                {
                  label: "Editar",
                  icon: <EditIcon />,
                  action: () => {
                    handleEdit(row.getValue("id"));
                  },
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
          data={proyects}
          initialVisibilityState={{ id: false }}
        />
      </div>
    </div>
  );
}
