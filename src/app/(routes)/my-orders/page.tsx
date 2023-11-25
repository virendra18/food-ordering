import React from "react";
import MyOrdersClient from "./_components/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders",
};
const MyOrders = () => {
  return (
    <div>
      <MyOrdersClient />
    </div>
  );
};

export default MyOrders;
