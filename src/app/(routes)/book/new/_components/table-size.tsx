import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const TableSize = () => {
  const bookingSizes = [2, 4, 8, 16];

  const searchQuery = useSearchParams();
  const selectedSize = searchQuery.get("size");
  // const [selected, setSelected] = useState<number | null>(null);
  const router = useRouter();
  return (
    <>
      <h3 className="text-2xl font-semibold my-10 text-center">
        Choose Table Size
      </h3>
      <div className="flex my-10 gap-5 items-center justify-center">
        {bookingSizes.map((size) => (
          <div
            className={`px-10 py-12 shadow-md cursor-pointer hover:shadow-xl rounded-md border-2 border-primary ${
              Number(selectedSize) === size && "bg-primary text-white"
            }`}
            key={size}
            onClick={() => {
              // setSelected(size);
              router.push(`?size=${size}`);
            }}
          >
            Booking for {size}
          </div>
        ))}
      </div>
    </>
  );
};

export default TableSize;
