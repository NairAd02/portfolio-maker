import { RHFPasswordField } from "@/components/form/rhf-components/rhf-password-field/rhf-password-field";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import React from "react";

export default function SignInForm() {
  return (
    <div className="flex flex-col gap-4">
      <RHFTextField
        label="Nombre de Usuario"
        name="firstCredential"
        placeholder="ej: user.user@gmail.com"
        fullWidth
      />
      <RHFPasswordField
        label="Contraseña"
        name="password"
        placeholder="Introduzca la contraseña"
        fullWidth
      />
    </div>
  );
}
