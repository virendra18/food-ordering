"use client";
import useCart from "@/stores/cartStore";
import { Products } from "@prisma/client";
import { ShoppingCart } from "lucide-react";
import React from "react";

import { toast } from "react-toastify";

interface ItemCardProps {
  item: Products;
}
const ItemCard = ({ item }: ItemCardProps) => {
  const { addItemToCart, cartItems } = useCart();
  const showToastMessage = () => {
    toast.success("Item Added to Cart", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleAddToCart = (item: Products) => {
    // console.log(item);
    addItemToCart(item);
    showToastMessage();
  };

  console.log("cart items", cartItems);
  return (
    <div className="trendingcard   bg-white px-4 py-2 text-black  rounded-2xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px]">
      <div className="mb-5 flex justify-center">
        <img
          src={`${item.image_url}`}
          alt=""
          className="h-[200px] max-w-[200px] md:mt-[-50px] mt-[-30px]"
        />
        {/* 230px */}
      </div>
      <div className="text-area text-center">
        <h3 className="text-xl font-bold">{item.name}</h3>
        <h3 className="text-xl mt-3">₹{item.price}</h3>
        <div className="flex justify-end items-center mt-3">
          <div
            className="bg-primary text-white text-2xl p-3 rounded-full cursor-pointer"
            onClick={() => handleAddToCart(item)}
          >
            <ShoppingCart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
