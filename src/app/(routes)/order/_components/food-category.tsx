import ItemCard from "@/components/ui/item-card";
import { Products } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  btnText: string;
  items: Products[];
  category: string;
}
const FoodCategory = ({ items, category, title, btnText }: Props) => {
  const filteredProducts = items.filter((item) => item.category === category);
  return (
    <div className="my-5">
      <div className="flex gap-5 items-center">
        <h2 className="text-xl md:text-2xl  text-primary font-bold">{title}</h2>
        <button className="text-white text-sm  bg-primary font-bold px-5 py-2 rounded-full">
          <Link href={`/order/category/${category}`}> {btnText}</Link>
        </button>
      </div>

      <div className="flex items-center  flex-col md:flex-row gap-10 mt-20 mb-16">
        {items &&
          filteredProducts.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
};

export default FoodCategory;
