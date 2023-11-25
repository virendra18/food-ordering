import db from "@/lib/db";
import React from "react";
import AdminManageOrderClient from "./_components/client";

const AdminManageOrders = async ({
  params,
}: {
  params: { orderId: string };
}) => {
  const orderInfo = await db.order.findFirst({
    where: {
      id: params.orderId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!orderInfo) {
    return (
      <div className="flex flex-col h-[400px] items-center justify-center">
        No such order
      </div>
    );
  }
  return (
    <>
      <AdminManageOrderClient orderInfo={orderInfo} />
    </>
  );
};

export default AdminManageOrders;
