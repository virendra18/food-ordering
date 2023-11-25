import { Metadata } from "next";
import React from "react";
import CartInfo from "./_components/cart-info";

export const metadata: Metadata = {
  title: "Cart",
};

const CartPage = () => {
  return (
    <>
      <CartInfo />
    </>
  );
};

export default CartPage;
