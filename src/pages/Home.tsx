import Layout from "@/components/layouts/Layout";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useMenu } from "@/context/MenuContext";
import { supabase } from "@/supabaseClient";
import { type ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";

type WeeklyMenu = {
  day: string;
  menu: string;
  date: string;
};

export default function Home() {
  const { menus } = useMenu();
  const [weeklyMenu, setWeeklyMenu] = useState<WeeklyMenu[]>([]);
  const [loading, setLoading] = useState(false);

  const generateWeeklyMenu = async () => {
    if (!menus.length) return;

    setLoading(true);
    try {
      // shuffle dan ambil 5 menu
      const shuffled = [...menus].sort(() => Math.random() - 0.5).slice(0, 5);
      const days = ["SENIN", "SELASA", "RABU", "KAMIS", "JUMAT"];

      const today = new Date();
      const weekly: WeeklyMenu[] = shuffled.map((menu, idx) => {
        const date = new Date(today);
        date.setDate(today.getDate() + idx); // hari berikutnya
        return {
          day: days[idx],
          menu: menu.name,
          date: date.toISOString().split("T")[0], // yyyy-mm-dd
        };
      });

      setWeeklyMenu(weekly);

      // insert ke Supabase
      const insertData = weekly.map((w, idx) => ({
        day_date: w.date,
        menu_id: shuffled[idx].id,
      }));

      const { error } = await supabase.from("weekly_menus").insert(insertData);
      if (error) throw error;
      console.log("Weekly menu saved!");
    } catch (err: any) {
      console.error("Failed to generate weekly menu:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnDef<WeeklyMenu>[] = useMemo(
    () => [
      { accessorKey: "day", header: "Hari" },
      { accessorKey: "menu", header: "Menu" },
      { accessorKey: "date", header: "Tanggal" },
    ],
    []
  );

  return (
    <Layout title="Home">
      <div className="space-y-4">
        <Button onClick={generateWeeklyMenu} disabled={loading}>
          {loading ? "Generating..." : "Generate Menu Senin–Jumat"}
        </Button>

        {weeklyMenu.length > 0 && (
          <div className="mt-4">
            <DataTable columns={columns} data={weeklyMenu} />
          </div>
        )}
      </div>
    </Layout>
  );
}
