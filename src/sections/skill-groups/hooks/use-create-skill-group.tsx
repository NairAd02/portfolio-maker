"use client";
import { useCallback, useState } from "react";
import { SkillGroupCreate } from "../form/create/schemas/skill-group-create-schema";
import { createSkillGroup as createSkillGroupService } from "@/lib/services/skill-groups";
import { convertSkillGroup } from "@/lib/types/skill-groups";

interface Props {
  onCreateAction: () => void;
}

export default function useCreateSkillGroup({ onCreateAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSkillGroup = useCallback(
    async (skillGroup: SkillGroupCreate) => {
      setLoading(true);
      setError(null);

      const { icon, ...restSkillGroup } = skillGroup;

      // create form data for icon
      const formData = new FormData();
      if (icon) formData.append("icon", icon);
      restSkillGroup.skills.forEach((skill) => {
        if (skill.icon) formData.append("skillIcons[]", skill.icon);
      });

      const res = await createSkillGroupService(
        convertSkillGroup(restSkillGroup),
        formData
      );

      if (res.error) {
        console.log(res.error);
        setError(
          res.error.message || "Error en la creación del grupo de habilidad"
        );
      } else {
        onCreateAction();
      }

      setLoading(false);
    },
    [onCreateAction]
  );
  return {
    loading,
    error,
    createSkillGroup,
  };
}
