import { Outlet } from "react-router-dom";

import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import BottomNav from "./BottomNav";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 pb-16 lg:pb-0">
        <Outlet />
      </main>
      <BottomNav />
      <SiteFooter className="hidden lg:block" />
    </div>
  );
};

export default MainLayout;
