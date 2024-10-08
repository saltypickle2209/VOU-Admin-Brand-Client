import { Suspense } from "react";
import SideNav from "../ui/components/dashboard/sidenav";
import Loading from "./loading";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
            <SideNav/>
        </div>
        <Suspense fallback={<Loading />}>
          <div className="flex-grow p-4 md:overflow-y-auto md:p-8 bg-gray-50 relative">{children}</div>
        </Suspense>
      </div>
    );
  }