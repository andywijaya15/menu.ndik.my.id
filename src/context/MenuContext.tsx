import { supabase } from "@/supabaseClient";
import { createContext, type ReactNode, useContext, useEffect, useState } from "react";

export type Menu = { id: string; name: string };

type MenuContextType = {
  menus: Menu[];
  setMenus: (menus: Menu[]) => void;
  fetchMenus: () => Promise<void>;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [menus, setMenus] = useState<Menu[]>([]);

  const fetchMenus = async () => {
    try {
      const { data, error } = await supabase.from("menus").select("*").order("created_at");
      if (error) throw error;
      setMenus(data || []);
    } catch (err: any) {
      console.error("Failed to fetch menus:", err.message);
    }
  };

  // fetch awal saat mount
  useEffect(() => {
    fetchMenus();
  }, []);

  return <MenuContext.Provider value={{ menus, setMenus, fetchMenus }}>{children}</MenuContext.Provider>;
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenu must be used within a MenuProvider");
  return context;
};
