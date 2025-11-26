import { createContext, useContext, useState, type ReactNode } from "react";

export type Menu = { id: number; name: string };

type MenuContextType = {
  menus: Menu[];
  setMenus: (menus: Menu[]) => void;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [menus, setMenus] = useState<Menu[]>([
    { id: 1, name: "NASI GORENG" },
    { id: 2, name: "MIE AYAM" },
    { id: 3, name: "SATE AYAM" },
    { id: 4, name: "SOTO AYAM" },
    { id: 5, name: "RAWON" },
    { id: 6, name: "BAKSO" },
    { id: 7, name: "GADO-GADO" },
    { id: 8, name: "NASI PADANG" },
    { id: 9, name: "AYAM GEPREK" },
    { id: 10, name: "NASI UDUK" },
    { id: 11, name: "MIE GORENG" },
    { id: 12, name: "PECEL LELE" },
    { id: 13, name: "IKAN BAKAR" },
    { id: 14, name: "TONGSENG" },
    { id: 15, name: "NASI KUNING" },
    { id: 16, name: "CAPCAY" },
    { id: 17, name: "SOTO BETAWI" },
    { id: 18, name: "AYAM BAKAR" },
    { id: 19, name: "NASI LIWET" },
    { id: 20, name: "KARIPAP" },
  ]);

  return <MenuContext.Provider value={{ menus, setMenus }}>{children}</MenuContext.Provider>;
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenu must be used within a MenuProvider");
  return context;
};
