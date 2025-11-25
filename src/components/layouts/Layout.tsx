import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-6 min-h-screen bg-gray-50">{children}</main>
    </div>
  );
}
