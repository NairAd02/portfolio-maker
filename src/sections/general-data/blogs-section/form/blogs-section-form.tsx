import { RHFTextAreaField } from "@/components/form/rhf-components/rhf-text-area-field/rhf-text-area-field";
import React from "react";

export default function BlogsSectionForm() {
  return (
    <div>
      <RHFTextAreaField
        name="blog_and_post_text"
        label="Texto de blog y posts"
        placeholder="Descripción que aparecerá en la sección de blog y posts..."
      />
    </div>
  );
}
