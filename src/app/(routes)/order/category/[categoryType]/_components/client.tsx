"use client";
import ItemCard from "@/components/ui/item-card";
import PageLoading from "@/components/ui/page-loading";
import { Products } from "@prisma/client";
import { useParams } from "next/navigation";
import React from "react";
import useSWR from "swr";

const CategoryTypeClient = () => {
  const { categoryType } = useParams();

  const categoryMap = {
    veg: "Veg",
    nonveg: "Non Veg",
    fastfood: "Fast Food",
    colddrinks: "Cold Drinks",
    icecream: "Ice Cream",
  };
  const fetcher = async () => {
    const res = await fetch(`/api/items/${categoryType}`);
    const resData = await res.json();

    return resData.data;
  };

  const {
    data,
    error,
    isLoading,
  }: { data: Products[]; error: any; isLoading: boolean } = useSWR(
    `/api/items/${categoryType}`,
    fetcher
  );

  console.log("data", data);

  if (error) {
    return <div>Error while fetching details</div>;
  }

  // if (data?.length < 1) {
  //   <section></section>;
  // }

  if (data && data.length === 0) {
    return (
      <section>
        <h2 className="text-primary text-3xl text-center font-bold my-10 md:my-20 ">
          No items found for {categoryType}
        </h2>
      </section>
    );
  }

  if (isLoading) {
    return <PageLoading />;
  } else {
    return (
      <section>
        <h2 className="text-primary text-3xl font-bold my-10">
          All {categoryMap[categoryType as keyof typeof categoryMap]} items
        </h2>

        <div className="flex items-center  flex-col md:flex-row gap-10 mt-20 mb-16">
          {data && data.map((item) => <ItemCard key={item.id} item={item} />)}
        </div>
      </section>
    );
  }
};

export default CategoryTypeClient;
