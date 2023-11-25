import OrderCard from "@/app/(routes)/my-orders/_components/order_card";
import db from "@/lib/db";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "All Products",
};
const AdminOrders = async () => {
  const orders = await db.order.findMany();
  return (
    <div>
      <h2 className="text-primary my-10 text-3xl font-bold ">All Orders</h2>
      <div className="my-10 flex flex-wrap justify-center md:justify-start gap-4">
        {orders.map((item) => (
          <OrderCard admin key={item.id} order={item} />
        ))}
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";
export default AdminOrders;
