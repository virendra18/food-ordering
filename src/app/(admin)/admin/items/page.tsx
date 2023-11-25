import db from "@/lib/db";
import { Metadata } from "next";
import Link from "next/link";
import AdminItemCard from "./_components/admin-item-card";

export const metadata: Metadata = {
  title: "All Products",
};
const AdminProducts = async () => {
  const products = await db.products.findMany();
  return (
    <div className="flex flex-col">
      <div className="flex my-10 gap-10 justify-between md:justify-start items-center">
        <h2 className="text-primary text-3xl font-bold ">All Items</h2>
        <button className="bg-primary px-4 py-2 md:px-7 md:py-3 text-white font-bold rounded-lg">
          <Link href="/admin/items/add">Add an Item</Link>
        </button>
      </div>
      <div className="my-10 flex flex-wrap justify-center md:justify-start gap-10">
        {products.map((item) => (
          <AdminItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
