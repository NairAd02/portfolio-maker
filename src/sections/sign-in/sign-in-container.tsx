import type React from "react";
import Image from "next/image";
import SignInFormContainer from "./form/sign-in-form-container";
import { Building2 } from "lucide-react";

export default function SignInContainer() {
  return (
    <div className="flex w-full h-screen">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col p-10">
        <div className="flex flex-col gap-4 items-center justify-center">
          <Building2 className={` size-16`} />

          <p className="text-2xl font-bold">Inicio de Sesión</p>
        </div>

        <SignInFormContainer />
      </div>

      {/* Right side - Image */}
      <div className="hidden md:block md:w-1/2 bg-gray-100 relative">
        <Image
          src={"/images/place-holder.jpg"}
          alt="Login image"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
