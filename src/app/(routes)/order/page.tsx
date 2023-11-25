import db from "@/lib/db";
import { Products } from "@prisma/client";
import React from "react";
import FoodCategory from "./_components/food-category";

export const dynamic = "force-dynamic";

const OrderPage = async () => {
  // const res = await fetch("/api/items");
  // const items: Products[] = await res.json();
  const items = await db.products.findMany({});
  return (
    <>
      <FoodCategory
        btnText="View all veg dishes"
        items={items}
        title="Veg"
        category="veg"
      />
      <FoodCategory
        btnText="View all fastfood items"
        items={items}
        title="Fast Food"
        category="fastfood"
      />
      <FoodCategory
        btnText="View all non veg dishes"
        items={items}
        title="Non Veg"
        category="nonveg"
      />
      <FoodCategory
        btnText="View all icecream"
        items={items}
        title="Ice Cream"
        category="icecream"
      />
      <FoodCategory
        btnText="View all cold drinks"
        items={items}
        title="Cold Drink"
        category="colddrinks"
      />
    </>
  );
};

export default OrderPage;
