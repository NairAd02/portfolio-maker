"use client";

import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import TableMenu from "@/components/ui/table-menu";
import PreviewImage from "@/components/preview-image/preview-image";
import { paths } from "@/routes/path";
import { EditIcon, EyeIcon, Trash2 } from "lucide-react";
import { principalPlaceHolder } from "@/lib/place-holders";
import { Certification } from "@/lib/types/certifications";
import NavigationComponent from "@/components/navigation-component/navigation-component";

interface Props {
  certifications: Certification[];
}

export default function CertificationsList({ certifications }: Props) {
  const columns: ColumnDef<Certification>[] = [
    {
      accessorKey: "id",
      enableHiding: false,
    },
    {
      accessorKey: "image",
      header: "Imagen",
      cell: ({ row }) => (
        <PreviewImage
          preview={row.getValue("image") || principalPlaceHolder}
          height={60}
          width={60}
          rounded="2xl"
        />
      ),
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
      accessorKey: "institution",
      header: "Institución",
      cell: ({ row }) => {
        return (
          <p className="text-sm line-clamp-3 break-words max-w-[300px] whitespace-pre-wrap leading-relaxed">
            {row.getValue("institution")}
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
          <div className="flex justify-start">
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
    <div className="px-6 py-3 bg-white flex flex-col gap-2 rounded-lg shadow-sm">
      <div className="flex flex-col gap-4">
        <DataTable
          columns={columns}
          data={certifications}
          initialVisibilityState={{ id: false }}
        />
      </div>
    </div>
  );
}
