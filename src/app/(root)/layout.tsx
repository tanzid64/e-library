import { auth } from "@/auth";
import { Header } from "@/components/global/header";
import { redirect } from "next/navigation";
import { FC, ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = async ({ children }) => {
  const session = await auth();
  if (!session) redirect("/sign-in");
  
  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default RootLayout;
