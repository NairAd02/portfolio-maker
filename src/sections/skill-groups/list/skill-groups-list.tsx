"use client";

import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import TableMenu from "@/components/ui/table-menu";
import PreviewImage from "@/components/preview-image/preview-image";
import { paths } from "@/routes/path";
import { EditIcon, EyeIcon, Trash2 } from "lucide-react";
import { principalPlaceHolder } from "@/lib/place-holders";
import { Skill, SkillGroup } from "@/lib/types/skill-groups";

interface Props {
  skillGroups: SkillGroup[];
}

export default function SkillGroupsList({ skillGroups }: Props) {
  const columns: ColumnDef<SkillGroup>[] = [
    {
      accessorKey: "id",
      enableHiding: false,
    },
    {
      accessorKey: "icon",
      header: "Icono",
      cell: ({ row }) => (
        <PreviewImage
          preview={row.getValue("icon") || principalPlaceHolder}
          height={45}
          width={45}
          rounded={"2xl"}
        />
      ),
    },
    {
      accessorKey: "name",
      header: "Nombre",
      cell: ({ row }) => {
        return (
          <p className="text-sm line-clamp-3 break-words max-w-[300px] whitespace-pre-wrap leading-relaxed">
            {row.getValue("name")}
          </p>
        );
      },
    },
    {
      accessorKey: "skills",
      header: "Habilidades",
      cell: ({ row }) => {
        const skills = row.getValue("skills") as Skill[];
        return skills.map((skill, index) => (
          <div key={index} className="flex items-center gap-2">
            {skill.icon && (
              <PreviewImage
                preview={skill.icon}
                height={45}
                width={45}
                rounded={"2xl"}
              />
            )}
            <p className="text-sm line-clamp-3 break-words max-w-[300px] whitespace-pre-wrap leading-relaxed">
              {skill.name}
            </p>
          </div>
        ));
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
                  href: paths.experienceDetails({
                    id: row.getValue("id") as string,
                  }).root,
                },
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
                  href: paths.deleteExperience({
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
          data={skillGroups}
          initialVisibilityState={{ id: false }}
        />
      </div>
    </div>
  );
}
