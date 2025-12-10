import Sidebar from "@/components/sidebar/Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-white text-gray-900">
      <div className="hidden md:block w-64 border-r border-gray-200 bg-gray-50">
        <Sidebar className="h-full w-full" />
      </div>

      <div className="flex-1 flex flex-col h-full relative min-w-0">
        <main className="flex-1 overflow-hidden relative">{children}</main>
      </div>
    </div>
  );
}
