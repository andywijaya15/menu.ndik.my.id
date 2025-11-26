import { Button } from "@/components/ui/button";
import Layout from "@/components/layouts/Layout";
import { useState, useMemo } from "react";
import { useMenu } from "@/context/MenuContext";
import { DataTable } from "@/components/ui/data-table";
import { type ColumnDef } from "@tanstack/react-table";

type WeeklyMenu = {
  day: string;
  menu: string;
};

export default function Home() {
  const { menus } = useMenu();
  const [weeklyMenu, setWeeklyMenu] = useState<WeeklyMenu[]>([]);

  const generateWeeklyMenu = () => {
    const shuffled = [...menus].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 7);
    const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

    const weekly: WeeklyMenu[] = selected.map((menu, idx) => ({
      day: days[idx],
      menu: menu.name,
    }));

    setWeeklyMenu(weekly);
  };

  const columns: ColumnDef<WeeklyMenu>[] = useMemo(
    () => [
      {
        accessorKey: "day",
        header: "Hari",
      },
      {
        accessorKey: "menu",
        header: "Menu",
      },
    ],
    []
  );

  return (
    <Layout title="Home">
      <div className="space-y-4">
        <Button onClick={generateWeeklyMenu}>Generate Menu 7 Hari</Button>

        {weeklyMenu.length > 0 && (
          <div className="mt-4">
            <DataTable columns={columns} data={weeklyMenu} />
          </div>
        )}
      </div>
    </Layout>
  );
}
