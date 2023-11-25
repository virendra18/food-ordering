"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

import CartItem from "./cart-item";
import OrderPrice from "./order-price";
import useCart from "@/stores/cartStore";
import { Loader2 } from "lucide-react";

const CartInfo = () => {
  const [isMounted, setIsMounted] = useState(false);

  const { cartItems } = useCart();

  // const [cartItems, setCartItems] = useState<Item[]>([]);

  // // this is preventing the hydration error by nextjs
  // useEffect(() => {
  //   setCartItems(cartItem!);
  // }, [cartItem]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <Loader2 className="animate-spin" size={36} />;
      </div>
    );
  }
  return (
    <>
      <div className="page-section md:px-11 md:py-10 p-4">
        {cartItems.length > 0 ? (
          <div className=" flex  flex-col-reverse md:flex-row  gap-10 items-center md:items-start md:select-none md:justify-between">
            <div className=" flex justify-center flex-wrap gap-20">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <div className="md:sticky md:top-28 bg-primary text-white flex-none w-64 h-[300px] rounded-2xl">
              <OrderPrice />
            </div>
          </div>
        ) : (
          <div className="flex flex-col mt-20 justify-center">
            <h2 className="mt-10 text-3xl font-bold text-center">
              Cart is Empty
            </h2>

            <div className="flex justify-center">
              <button className="py-3 px-8 mt-10 bg-primary text-white rounded-full">
                <Link href="/order">Order Now</Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartInfo;
