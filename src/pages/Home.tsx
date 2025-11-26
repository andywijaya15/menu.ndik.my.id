import Layout from "@/components/layouts/Layout";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useMenu } from "@/context/MenuContext";
import { supabase } from "@/supabaseClient";
import { type ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

type WeeklyMenu = {
  day: string;
  menu: string;
  date: string;
};

export default function Home() {
  const { menus } = useMenu();
  const [weeklyMenu, setWeeklyMenu] = useState<WeeklyMenu[]>([]);
  const [loading, setLoading] = useState(false);

  // fetch weekly menu dari Supabase
  const fetchWeeklyMenu = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("weekly_menus")
        .select(
          `
          day_date,
          menu_id,
          menus!inner(name)
        `
        )
        .order("day_date", { ascending: true });

      if (error) throw error;

      const weekly: WeeklyMenu[] = data!.map((row: any) => {
        const dayNames = ["SENIN", "SELASA", "RABU", "KAMIS", "JUMAT", "SABTU", "MINGGU"];
        const dateObj = new Date(row.day_date);
        const dayIndex = dateObj.getDay(); // 0=minggu,1=senin,..
        const day = dayNames[dayIndex === 0 ? 6 : dayIndex - 1]; // sesuaikan index
        return {
          day,
          menu: row.menus.name,
          date: row.day_date,
        };
      });

      setWeeklyMenu(weekly);
    } catch (err: any) {
      console.error("Failed to fetch weekly menu:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeeklyMenu();
  }, []);

  const generateWeeklyMenu = async () => {
    if (!menus.length) return;

    setLoading(true);
    try {
      const shuffled = [...menus].sort(() => Math.random() - 0.5).slice(0, 5);
      const days = ["SENIN", "SELASA", "RABU", "KAMIS", "JUMAT"];
      const today = new Date();

      const weekly: WeeklyMenu[] = shuffled.map((menu, idx) => {
        const date = new Date(today);
        date.setDate(today.getDate() + idx);
        return {
          day: days[idx],
          menu: menu.name,
          date: date.toISOString().split("T")[0],
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
