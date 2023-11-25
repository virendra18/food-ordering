"use client";
import PageLoading from "@/components/ui/page-loading";
import useAuthStore from "@/stores/authStore";
import { OrderData } from "@/types/OrderData";
import { useParams } from "next/navigation";
import React from "react";
import useSWR from "swr";
import SingleOrderData from "./single-order-data";

const OrderIdClient = () => {
  const { orderId } = useParams();
  const { user } = useAuthStore();

  const fetcher = async () => {
    const res = await fetch(`/api/orders/${orderId}`);
    const resData = await res.json();

    return resData.data;
  };

  const {
    data,
    error,
    isLoading,
  }: { data: OrderData; error: any; isLoading: boolean } = useSWR(
    `/api/orders/${orderId}`,
    fetcher
  );

  if (isLoading) {
    return <PageLoading />;
  }

  if (error) {
    return <div>Error while fetching details</div>;
  }

  return (
    <section>
      <h2 className="text-primary text-3xl font-bold my-10">
        Your Order Details
      </h2>

      <div className="flex flex-col md:flex-row justify-between gap-10">
        <SingleOrderData
          items={data.orderItems}
          totalPrice={data?.totalPrice}
        />

        <div className="flex-1 w-fit flex flex-col rounded-xl px-3 py-5 bg-primary ">
          <div className=" flex flex-col mx-3 text-white">
            <div className="flex gap-3 items-center">
              <h3 className="font-bold text-xl">Order Status : </h3>{" "}
              <span
                className={`px-5 py-2 rounded-full ${
                  data.order_status === "Preparing" ? "bg-red-600" : ""
                }
             
          ${data.order_status === "Delivering" ? "bg-orange-600" : ""}
          
          ${
            data.order_status === "Delivered" ? "bg-green-600" : ""
          }               
          `}
              >
                {data.order_status}
              </span>
            </div>
            <div className="mt-5 flex  gap-3 items-center">
              <h3 className=" text-xl font-bold ">Payment Id:</h3>
              <p className="font-bold">{data.razorpay_payment_id}</p>
            </div>
            <div className="flex mt-5 gap-3 items-center">
              <h3 className=" text-xl font-bold ">Delivery Address:</h3>
              <p className="font-bold">
                {data.address +
                  ", " +
                  data.city +
                  ", " +
                  data.state.toLocaleUpperCase() +
                  ", " +
                  data.pincode}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderIdClient;
