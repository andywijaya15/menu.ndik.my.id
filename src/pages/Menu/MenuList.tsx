import Layout from "@/components/layouts/Layout";
import { Link } from "react-router";

export default function MenuList() {
  return (
    <Layout title="Master Menu">
      <Link to="/menu/create" className="px-4 py-2 bg-blue-600 text-white rounded">
        + Tambah Menu
      </Link>
    </Layout>
  );
}
