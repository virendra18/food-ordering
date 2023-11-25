"use client";

import { nanoid } from "nanoid";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { ProductWithQuantity } from "@/types/Product";

import getTotal from "@/lib/getTotal";
import useAuthStore from "@/stores/authStore";
import useCart from "@/stores/cartStore";
import { Profile } from "@prisma/client";
import { Loader2 } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentData {
  userId: unknown;
  userEmail: string | null | undefined;
  userName: any;
  userAddress: any;
  userPhoneNo: number;
  totalPrice: number;
  orderStatus: string;
}

const CheckoutClient = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { user } = useAuthStore();

  const fetcher = async () => {
    const res = await fetch("/api/profile");
    const resData = await res.json();

    return resData.data;
  };

  const {
    data: userInfo,
    error,
    isLoading,
  } = useSWR(`/${user?.id}/profile`, fetcher);

  const { cartItems, emptyCart } = useCart();

  const [items, setItems] = useState<ProductWithQuantity[]>([]);
  const [itemsIdWithQuantity, setItemsIdWithQuantity] = useState<
    { id: string; quantity: number }[]
  >([]);

  const [total, setTotal] = useState(0);
  const [buttonLoading, setButtonLoading] = useState(false);
  useEffect(() => {
    setItems(cartItems);
    setTotal(getTotal(cartItems).totalPrice);

    setItemsIdWithQuantity(
      cartItems.map((cartItem) => ({
        id: cartItem.id,
        quantity: cartItem.quantity!,
      }))
    );
  }, [cartItems]);

  const onAddShipping = async (data: any) => {
    setButtonLoading(true);
    const orderData = {
      userId: user?.id,
      userEmail: user?.email,
      userName: data?.name,
      userAddress: data?.address,
      userPhoneNo: data?.phone,
      city: data?.city,
      state: data?.state,
      pincode: data?.pincode,
      totalPrice: total,
      itemsIdWithQuantity,
      orderStatus: "Preparing",
    };
    // console.log(orderData);

    makePayment(orderData);

    const id = nanoid();
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      // document.body.appendChild(script);

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const makePayment = async (paymentData: PaymentData) => {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    const paymentdata: any = await fetch("/api/razorpay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ totalPrice: paymentData.totalPrice }),
    }).then((t) => t.json());

    var options = {
      key: process.env.RAZORPAY_KEY,
      name: "Food Express",
      currency: paymentdata.currency,
      amount: +paymentdata.amount,
      order_id: paymentdata.id,
      description: "Thankyou for your payment. We are preparing your order.",

      handler: async function (response: any) {
        try {
          const res = await fetch("/api/checkout", {
            method: "POST",
            body: JSON.stringify({
              ...paymentData,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
            }),
          });

          const resdata = await res.json();
        } catch (error: any) {
          throw new Error(error, error.message);
        }
        setButtonLoading(false);
        emptyCart();
        router.push("/order/success");
      },
      prefill: {
        name: paymentData.userName,
        email: paymentData.userEmail,
        contact: paymentData.userPhoneNo,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  if (isLoading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <Loader2 className="animate-spin" size={36} />
      </div>
    );
  }
  return (
    <section className="md:my-7 md:px-11  p-4">
      <h2 className="text-primary text-4xl font-bold mb-10">
        Your order summary
      </h2>

      <div className="flex flex-col md:flex-row justify-between gap-10">
        <div className="flex flex-1 gap-5 flex-col max-w-[500px]">
          {items.map((item: ProductWithQuantity) => (
            <div
              key={item.id}
              className="card rounded-lg flex justify-between py-5 px-3   shadow-[rgba(0,_0,_0,_0.14)_0px_3px_8px]"
            >
              <p className="font-bold">
                {item.quantity} x {item.name}
              </p>

              <p className="font-bold">₹{+item.quantity! * +item.price!}</p>
            </div>
          ))}

          <div className="flex justify-between">
            <p className="text-[20px] font-bold mt-5">Total: </p>
            <p className="text-[20px] font-bold mt-5"> ₹{total}</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col rounded-xl px-3 py-5 bg-primary md:max-w-[600px]">
          {user !== null ? (
            <div className="flex flex-col mx-3 text-white">
              {/* <h3 className="font-bold text-xl mb-5">Name: {userInfo.name}</h3> */}
              {/* <h3 className="font-bold text-xl mb-5">Name</h3> */}

              <form onSubmit={handleSubmit(onAddShipping)}>
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block mb-1 text-sm font-medium text-[#f8f8f8] "
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    id="name"
                    defaultValue={userInfo[0]?.user?.name}
                    className=" border bg-[#f8f8f8] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="phone"
                    className="block mb-1 text-sm font-medium text-[#f8f8f8] "
                  >
                    Your Phone
                  </label>
                  <input
                    type="text"
                    {...register("phone")}
                    id="phone"
                    defaultValue={userInfo[0]?.phone}
                    className=" border bg-[#f8f8f8] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Enter your phone"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="address"
                    className="block mb-1 text-sm font-medium text-[#f8f8f8] "
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    {...register("address")}
                    defaultValue={userInfo[0]?.address}
                    id="address"
                    placeholder="House No/ Apt No"
                    className=" border bg-[#f8f8f8] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="city"
                    className="block mb-1 text-sm font-medium text-[#f8f8f8] "
                  >
                    City
                  </label>
                  <input
                    type="text"
                    {...register("city")}
                    defaultValue={userInfo[0]?.city}
                    id="city"
                    placeholder="City Name"
                    className=" border bg-[#f8f8f8] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="state"
                    className="block mb-1 text-sm font-medium text-[#f8f8f8] "
                  >
                    State
                  </label>
                  <select
                    id="state"
                    {...register("state")}
                    defaultValue={userInfo[0]?.state}
                    className=" border bg-[#f8f8f8] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  >
                    <option
                      className=" border bg-[#f8f8f8] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      value="chhattisgarh"
                    >
                      Chhattisgarh
                    </option>
                  </select>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="pincode"
                    className="block mb-1 text-sm font-medium text-[#f8f8f8] "
                  >
                    Pin code
                  </label>
                  <input
                    type="text"
                    {...register("pincode")}
                    id="pincode"
                    defaultValue={userInfo[0]?.pincode}
                    placeholder="Pin code"
                    className=" border bg-[#f8f8f8] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  />
                </div>

                {/* <button
                  type="submit"
                  className=" px-8 py-3 border-solid border-3 border-white rounded-full"
                >
                  Proceed to pay
                </button> */}
                {!buttonLoading ? (
                  <button
                    type="submit"
                    className=" rounded-md px-8 py-3 border-solid border-2 border-white"
                  >
                    {/* <Link href="/order/success">Proceed to pay</Link> */}
                    Proceed to pay
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled
                    className=" rounded-md cursor-wait px-8 py-3 border-solid border-2 border-white gap-2 flex items-center"
                  >
                    <Loader2 className="animate-spin" size={30} color="white" />
                    Processing...
                  </button>
                )}
              </form>
            </div>
          ) : (
            <div className="flex flex-col w-full h-full justify-center text-white items-center px-3 py-5 min-h-[200px]">
              <h3 className="font-bold text-2xl mb-5">Login or Signup first</h3>
              <div className="flex gap-5">
                <button className="px-6 py-1 border-solid border-3 border-white rounded-full">
                  <Link href="/login">Login</Link>
                </button>
                <button className="px-6 py-1 border-solid border-3 border-white rounded-full">
                  <Link href="/signup">Signup</Link>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CheckoutClient;
