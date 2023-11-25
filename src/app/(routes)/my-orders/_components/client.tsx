"use client";

import PageLoading from "@/components/ui/page-loading";
import useAuthStore from "@/stores/authStore";
import { OrderData } from "@/types/OrderData";

import Link from "next/link";
import useSWR from "swr";
import OrderCard from "./order_card";

const MyOrdersClient = () => {
  const { user } = useAuthStore();

  const fetcher = async () => {
    const res = await fetch(`/api/orders/`);
    const resData = await res.json();

    return resData.data;
  };

  const {
    data,
    error,
    isLoading,
  }: { data: OrderData[]; error: any; isLoading: boolean } = useSWR(
    `/api/orders/${user?.id}`,
    fetcher
  );

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <section>
      <h2 className="text-primary text-3xl font-bold my-10">Your Orders</h2>
      <div className="card ">
        {data?.length > 0 ? (
          data.map((order: OrderData) => (
            <OrderCard order={order} key={order.id} admin={false} />
          ))
        ) : (
          <div>
            <h2>You have not made any order yet. Order Now!!</h2>

            <Link
              className="py-3 px-8 mt-5 bg-primary text-white rounded-full"
              href="/order"
            >
              Order Now
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyOrdersClient;
