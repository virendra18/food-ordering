import { OrderData } from "@/types/OrderData";
import Link from "next/link";
import React from "react";

type OData = {
  id: string;
  totalPrice: number;
  isPaid: boolean;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  order_status: string;
  order_time: Date;
  razorpay_order_id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};
const OrderCard = ({ order, admin }: { order: OData; admin: boolean }) => {
  return (
    <div className="card w-full mb-7">
      <Link
        href={admin ? `/admin/orders/${order.id}` : `/my-orders/${order.id}`}
      >
        <div className="card cursor-pointer rounded-lg flex flex-col md:flex-row justify-between py-5 px-3   shadow-[rgba(0,_0,_0,_0.14)_0px_3px_8px]">
          <p>
            <span className="font-bold">Order Id:</span> {order.id}
          </p>
          <p>
            <span className="font-bold">Amount:</span> {order.totalPrice}
          </p>
          <p>
            <span className="font-bold">Order Status:</span>{" "}
            <span
              className={`${
                order.order_status === "Preparing" ? "text-red-800" : ""
              }
      
       
      ${order.order_status === "Delivering" ? "text-orange-600" : ""}
      
      ${order.order_status === "Delivered" ? "text-green-600" : ""} 
    
      font-semibold`}
            >
              {order.order_status}
            </span>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default OrderCard;
