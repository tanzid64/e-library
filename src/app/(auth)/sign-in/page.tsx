'use client';
import { AuthForm } from "@/components/auth/auth-form";
import { signInSchema } from "@/lib/validation";
import { FC } from "react";

const SignIn: FC = () => {
  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={{
        email: "",
        password: "",
      }}
      onSubmit={() => {}}
    />
  );
};

export default SignIn;
