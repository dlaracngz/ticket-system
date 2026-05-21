import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#dde3e8]">
      <div className="hidden sm:flex">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto w-full">
          <Header />
          <main className="mx-4 sm:mx-6 lg:mx-6 mt-4 mb-2">{children}</main>
        </div>
      </div>
    </div>
  );
}
