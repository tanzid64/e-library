'use client';
import { AuthForm } from "@/components/auth/auth-form";
import { signUpSchema } from "@/lib/validation";
import { FC } from "react";

const SignUp: FC = () => {
  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{
        email: "",
        password: "",
        fullName: "",
        universityId: 0,
        universityCard: "",
      }}
      onSubmit={() => {}}
    />
  );
};

export default SignUp;
