// import { getServerSession } from "next-auth/next";
// import { redirect } from "next/navigation";
// import { authOptions } from "../../api/auth/[...nextauth]/options";
interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  // const session = await getServerSession(authOptions);
  // console.log("=============[getServerSession]============");
  // console.log("session", session);

  // if (!session) {
  //   redirect("/login");
  // }

  // if (session?.user?.status === UserStatus.Pending) {
  //   redirect('/onboarding');
  // }

  return (
    <>
      <header>Header</header>
      <div className="flex flex-row overflow-hidden min-h-screen">
        <div className="h-screen w-28"></div>
        <main className="w-full pt-16">{children}</main>
      </div>
    </>
  );
}
