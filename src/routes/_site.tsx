import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/_site")({
  component: SiteLayout,
});

function SiteLayout() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main key={pathname} className="page-in flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
