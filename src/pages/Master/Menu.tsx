import Layout from "@/components/layouts/Layout";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMenu, type Menu } from "@/context/MenuContext";
import { supabase } from "@/supabaseClient";
import { type ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

export default function Menu() {
  const { menus, fetchMenus } = useMenu();
  const [selected, setSelected] = useState<Menu | null>(null);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const openCreate = () => {
    setSelected(null);
    setName("");
    setOpen(true);
  };
  const openEdit = (menu: Menu) => {
    setSelected(menu);
    setName(menu.name);
    setOpen(true);
  };
  const openDelete = (menu: Menu) => {
    setSelected(menu);
    setDeleteOpen(true);
  };

  const handleSave = async () => {
    const formattedName = name.toUpperCase();
    try {
      if (selected) {
        await supabase.from("menus").update({ name: formattedName, updated_at: new Date() }).eq("id", selected.id);
      } else {
        await supabase.from("menus").insert([{ name: formattedName, updated_at: new Date() }]);
      }
      await fetchMenus(); // update context
      setOpen(false);
      setSelected(null);
      setName("");
    } catch (err: any) {
      console.error("Failed to save menu:", err.message);
    }
  };

  const handleDelete = async () => {
    if (!selected) return;
    try {
      await supabase.from("menus").delete().eq("id", selected.id);
      await fetchMenus(); // update context
      setDeleteOpen(false);
      setSelected(null);
    } catch (err: any) {
      console.error("Failed to delete menu:", err.message);
    }
  };

  const columns: ColumnDef<Menu>[] = [
    { accessorKey: "name", header: "Name", cell: ({ row }) => row.original.name },
    {
      id: "actions",
      header: "#",
      cell: ({ row }) => {
        const menu = row.original;
        return (
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" onClick={() => openEdit(menu)}>
              Edit
            </Button>
            <Button size="sm" variant="destructive" onClick={() => openDelete(menu)}>
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Layout title="Master Menu">
      <div className="flex justify-between mb-4">
        <Button onClick={openCreate}>+ Add Menu</Button>
      </div>

      <DataTable columns={columns} data={menus} />

      {/* CREATE / UPDATE MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selected ? "Update Menu" : "Add Menu"}</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block mb-2 text-sm">Menu Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama menu"
                autoFocus
              />
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{selected ? "Update" : "Create"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* DELETE MODAL */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Menu</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete <span className="font-bold">{selected?.name}</span>?
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
