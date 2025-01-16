import { auth } from "@/auth";
import { Header } from "@/components/global/header";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { FC, ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = async ({ children }) => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  // update the last activity date without blocking ui using next js after hook
  after(async () => {
    if (!session) redirect("/sign-in");
    // get the user and see the last activity is today
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session?.user?.id!))
      .limit(1);
    if (user[0].lastActivityDate === new Date().toISOString().slice(0, 10))
      return;

    // update the last activity date
    await db
      .update(users)
      .set({ lastActivityDate: new Date().toISOString().slice(0, 10) })
      .where(eq(users.id, session?.user?.id!));
  });

  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header session={session} />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default RootLayout;
