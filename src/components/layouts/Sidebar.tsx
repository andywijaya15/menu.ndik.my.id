import { NavLink } from "react-router";
import { Home, Users, Settings } from "lucide-react";

export default function Sidebar() {
  const menus = [
    { label: "Dashboard", icon: <Home />, to: "/" },
    { label: "Users", icon: <Users />, to: "/users" },
    { label: "Settings", icon: <Settings />, to: "/settings" },
  ];

  return (
    <aside className="w-60 bg-white border-r h-screen p-4 hidden md:block">
      <h1 className="text-2xl font-bold mb-6">Menu</h1>

      <nav className="space-y-2">
        {menus.map((m) => (
          <NavLink
            key={m.to}
            to={m.to}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-all 
              ${isActive ? "bg-black text-white" : "hover:bg-gray-100"}`
            }
          >
            <span className="w-5 h-5">{m.icon}</span>
            {m.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
