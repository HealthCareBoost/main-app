import { notFound } from "next/navigation";

export const dashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Posts",
      href: "/dashboard",
      icon: "post",
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: "billing",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
};

// import { DashboardNav } from "@/components/nav";
import { UserAccountNav } from "../components/UserProfileNav";
import { MainNav } from "../components/MainNav";
import { DashboardNav } from "../components/DashboardNav";
import { api } from "../utils/api";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  //   const user = await getCurrentUser();
  const user = { name: "GT", image: null, email: "test@email.com" };

  const { data } = api.ingredients.getNutrintion.useQuery({
    ingredient_id: 25,
  });
  console.log(data);

  if (!user) {
    return notFound();
  }

  return (
    <div className="mx-auto flex flex-col space-y-6">
      <header className="container sticky top-0 z-40 bg-white">
        <div className="flex h-16 items-center justify-between border-b border-b-slate-200 py-4">
          <MainNav items={dashboardConfig.mainNav} />
          <UserAccountNav
            user={{
              name: user.name,
              image: user.image,
              email: user.email,
            }}
          />
        </div>
      </header>
      <div className="container grid gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
