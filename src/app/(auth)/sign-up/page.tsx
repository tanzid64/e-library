"use client";
import { AuthForm } from "@/components/auth/auth-form";
import { signUp } from "@/lib/actions/auth";
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
      onSubmit={signUp}
    />
  );
};

export default SignUp;
