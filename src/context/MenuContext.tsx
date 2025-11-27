import { supabase } from "@/lib/supabaseClient";
import { createContext, type ReactNode, useContext, useEffect, useState } from "react";

export type Menu = { id: string; name: string; created_at: string; updated_at?: string };

type MenuContextType = {
  menus: Menu[];
  fetchMenus: (page?: number, perPage?: number) => Promise<void>;
  totalMenus: number;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [totalMenus, setTotalMenus] = useState(0);

  const fetchMenus = async (page = 1, perPage = 10) => {
    try {
      const from = (page - 1) * perPage;
      const to = page * perPage - 1;

      const { data, count, error } = await supabase
        .from("menus")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: true })
        .range(from, to);

      if (error) throw error;
      setMenus(data || []);
      setTotalMenus(count || 0);
    } catch (err: any) {
      console.error("Failed to fetch menus:", err.message);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  return <MenuContext.Provider value={{ menus, fetchMenus, totalMenus }}>{children}</MenuContext.Provider>;
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenu must be used within a MenuProvider");
  return context;
};
