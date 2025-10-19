import { Outlet } from "react-router-dom";

import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
};

export default MainLayout;
