import Layout from "@/components/layouts/Layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Menu() {
  type Menu = { id: number; name: string };

  const [menus, setMenus] = useState<Menu[]>([
    { id: 1, name: "Nasi Goreng" },
    { id: 2, name: "Mie Ayam" },
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
    if (selected) {
      // update
      setMenus(menus.map((m) => (m.id === selected.id ? { ...m, name } : m)));
    } else {
      // create
      setMenus([...menus, { id: Date.now(), name }]);
    }

    setOpen(false);
    setSelected(null);
    setName("");
  };

  return (
    <Layout title="Master Menu">
      <Button onClick={openCreate}>+ Add Menu</Button>

      {/* CREATE & UPDATE MODAL */}
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
              <label className="block mb-2 text-sm">Name</label>
              <input
                type="text"
                value={name}
                className="w-full border rounded px-3 py-2"
                placeholder="Masukkan nama menu"
                onChange={(e) => setName(e.target.value)}
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

      {/* DELETE CONFIRMATION MODAL */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Menu</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure want to delete <span className="font-bold">{selected?.name}</span>?
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

      {/* LIST MENU */}
      <div className="mt-6 space-y-2">
        {menus.map((menu) => (
          <div key={menu.id} className="flex justify-between items-center p-3 border rounded">
            <span>{menu.name}</span>

            <div className="space-x-2">
              <Button variant="secondary" onClick={() => openEdit(menu)}>
                Edit
              </Button>
              <Button variant="destructive" onClick={() => openDelete(menu)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
