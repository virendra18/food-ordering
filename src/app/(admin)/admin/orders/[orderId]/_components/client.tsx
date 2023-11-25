"use client";
import { OrderData } from "@/types/OrderData";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSWRConfig } from "swr";

const AdminManageOrderClient = ({ orderInfo }: { orderInfo: OrderData }) => {
  const [toggleChangeOrderStatus, setToggleChangeOrderStatus] = useState(false);
  return (
    <div>
      <h2 className="text-primary text-3xl font-bold my-10">Order Details</h2>

      <div className="flex flex-col md:flex-row justify-between gap-10">
        <div className="flex flex-1 gap-5 flex-col max-w-[500px]">
          {orderInfo.orderItems.map((item) => (
            <div
              key={item.id}
              className="card rounded-lg flex justify-between py-5 px-3   shadow-[rgba(0,_0,_0,_0.14)_0px_3px_8px]"
            >
              <p className="font-bold">
                {item.quantity} x {item.product.name}
              </p>

              <p className="font-bold">
                ₹{+item.quantity! * +item.product.price!}
              </p>
            </div>
          ))}

          <div className="flex justify-between">
            <p className="text-[20px] font-bold mt-5">Amount Paid: </p>
            <p className="text-[20px] font-bold mt-5">
              {" "}
              ₹{orderInfo?.totalPrice}
            </p>
          </div>
        </div>

        <div className="flex-1 flex flex-col rounded-xl px-3 py-5 bg-primary md:max-w-[600px]">
          <div className="flex flex-col mx-3 text-white">
            <div className="flex flex-wrap  gap-3 items-center">
              <h3 className=" text-xl font-bold ">User Name:</h3>
              <p className="font-bold">{orderInfo?.name || "User"}</p>
            </div>
            <div>
              <div className="flex flex-col md:flex-row mt-5 gap-3 md:items-center">
                <h3 className="font-bold text-xl">Order Status : </h3>{" "}
                <span
                  className={`px-5 py-2 rounded-full ${
                    orderInfo.order_status === "Preparing" ? "bg-red-800" : ""
                  }
            
            ${
              orderInfo.order_status === "Delivering"
                ? "bg-white text-orange-600"
                : ""
            }
            
            ${orderInfo.order_status === "Delivered" ? "bg-green-600" : ""}  `}
                >
                  {orderInfo.order_status}
                </span>
                <h3
                  className="font-bold cursor-pointer"
                  onClick={() => setToggleChangeOrderStatus((prev) => !prev)}
                >
                  Change Status
                </h3>
              </div>
              {toggleChangeOrderStatus && (
                <div className="flex">
                  <ChangeOrderStatus
                    currentStatus={orderInfo.order_status}
                    userId={orderInfo.userId}
                    orderId={orderInfo.id}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col md:flex-row mt-5 gap-3 md:items-center">
              <h3 className=" text-xl font-bold ">Delivery Address:</h3>
              <p className="font-bold">{orderInfo.address}</p>
            </div>
            <div className="flex flex-col md:flex-row mt-5 gap-3 md:items-center">
              <h3 className=" text-xl font-bold ">Order Id:</h3>
              <p className="font-bold">{orderInfo.id}</p>
            </div>
            <div className="flex flex-col md:flex-row mt-5 gap-3 md:items-center">
              <h3 className=" text-xl font-bold ">Razorpay Order Id:</h3>
              <p className="font-bold">{orderInfo.razorpay_order_id}</p>
            </div>
            <div className="flex flex-col md:flex-row mt-5 gap-3 md:items-center">
              <h3 className=" text-xl font-bold ">Razorpay Payment Id:</h3>
              <p className="font-bold">{orderInfo.razorpay_payment_id}</p>
            </div>
            <div className="flex flex-col md:flex-row mt-5 gap-3 md:items-center">
              <h3 className=" text-xl font-bold ">User Id:</h3>
              <p className="font-bold">{orderInfo.userId}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChangeOrderStatus = ({
  currentStatus,
  userId,
  orderId,
}: {
  currentStatus: string;
  userId: string;
  orderId: string;
}) => {
  console.log(currentStatus);
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const changeStatus = async (status: string) => {
    // change the status
    console.log("status is ", status);

    await fetch(`/api/admin/orders/${orderId}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });

    router.refresh();

    mutate(`/api/orders/${userId}`);
  };

  return (
    <div className="flex gap-5 flex-wrap mt-5">
      <button
        className={` ${
          currentStatus == "Preparing" ? "bg-green-500" : ""
        } border-3 border-solid border-white px-5 py-1 rounded-full font-bold`}
        onClick={() => changeStatus("Preparing")}
      >
        Preparing
      </button>
      <button
        className={` ${
          currentStatus == "Delivering" ? "bg-green-500" : ""
        } border-3 border-solid border-white px-5 py-1 rounded-full font-bold`}
        onClick={() => changeStatus("Delivering")}
      >
        Delivering
      </button>
      <button
        className={` ${
          currentStatus == "Delivered" ? "bg-green-500" : ""
        } border-3 border-solid border-white px-5 py-1 rounded-full font-bold`}
        onClick={() => changeStatus("Delivered")}
      >
        Delivered
      </button>
    </div>
  );
};

export default AdminManageOrderClient;
