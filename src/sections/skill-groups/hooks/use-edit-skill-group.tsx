"use client";
import { useCallback, useState } from "react";
import { SkillGroupEdit } from "../form/edit/schemas/skill-group-edit-schema";
import { editSkillGroup as editSkillGroupService } from "@/lib/services/skill-groups";
import { convertSkillGroupEditDTO } from "@/lib/types/skill-groups";

interface Props {
  id: string;
  onEditAction: () => void;
}

export default function useEditSkillGroup({ id, onEditAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editSkillGroup = useCallback(
    async (skillGroup: SkillGroupEdit) => {
      const { icon, ...restSkillGroup } = skillGroup;

      setLoading(true);
      setError(null);
      // create form data for icons
      const formData = new FormData();
      if (icon) formData.append("icon", icon);
      restSkillGroup.skills.forEach((skill) => {
        if (skill.icon) formData.append("skillIcons[]", skill.icon);
      });

      const res = await editSkillGroupService(
        id,
        convertSkillGroupEditDTO(restSkillGroup),
        formData
      );

      if (res.error)
        setError(
          res.error.message || "Error en la edición del grupo de habilidades"
        );
      else {
        onEditAction();
      }

      setLoading(false);
    },
    [onEditAction, id]
  );
  return {
    loading,
    error,
    editSkillGroup,
  };
}
