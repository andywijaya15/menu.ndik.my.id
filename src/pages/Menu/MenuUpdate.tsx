import { useParams } from "react-router";
import Layout from "@/components/layouts/Layout";

export default function MenuEdit() {
  const { id } = useParams();

  return (
    <Layout title={`Edit Menu #${id}`}>
      <form className="space-y-4">
        <input type="text" defaultValue="Nama Lama" className="border p-2 w-full" />
        <button className="px-4 py-2 bg-yellow-600 text-white rounded">Update</button>
      </form>
    </Layout>
  );
}
