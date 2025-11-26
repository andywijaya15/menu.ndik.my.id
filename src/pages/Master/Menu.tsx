import Layout from "@/components/layouts/Layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { type ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";

export default function Menu() {
  type Menu = { id: number; name: string };

  const [menus, setMenus] = useState<Menu[]>([
    { id: 1, name: "NASI GORENG" },
    { id: 2, name: "MIE AYAM" },
  ]);

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

  const handleDelete = () => {
    if (selected) {
      setMenus(menus.filter((m) => m.id !== selected.id));
    }
    setDeleteOpen(false);
    setSelected(null);
  };

  const handleSave = () => {
    const formattedName = name.toUpperCase();

    if (selected) {
      // update
      setMenus(menus.map((m) => (m.id === selected.id ? { ...m, name: formattedName } : m)));
    } else {
      // create
      setMenus([...menus, { id: Date.now(), name: formattedName }]);
    }

    setOpen(false);
    setSelected(null);
    setName("");
  };

  const columns: ColumnDef<Menu>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => row.original.name,
    },
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
