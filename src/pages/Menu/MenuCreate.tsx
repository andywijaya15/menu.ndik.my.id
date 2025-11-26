import Layout from "@/components/layouts/Layout";

export default function MenuCreate() {
  return (
    <Layout title="Tambah Menu">
      <form className="space-y-4">
        <input type="text" placeholder="Nama menu" className="border p-2 w-full" />
        <button className="px-4 py-2 bg-green-600 text-white rounded">Simpan</button>
      </form>
    </Layout>
  );
}
