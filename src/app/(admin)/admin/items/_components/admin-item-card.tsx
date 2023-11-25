"use client";
import { Products } from "@prisma/client";
import { Edit } from "lucide-react";
import Link from "next/link";
import React from "react";
import DeleteAlert from "../[itemId]/edit/_components/delete-alert";

interface AdminItemCardProps {
  item: Products;
}

const AdminItemCard: React.FC<AdminItemCardProps> = ({ item }) => {
  return (
    <div className=" bg-white  text-black py-2 px-4 rounded-2xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px]">
      <div className="mb-5 flex  justify-center">
        <img
          src={`${item.image_url}`}
          alt=""
          className="h-[200px] max-w-[200px] md:mt-[-50px] mt-[-30px]"
        />
      </div>
      <div className="text-area text-center">
        <h3 className="text-xl font-bold">{item.name}</h3>
        <h3 className="text-xl mt-3">₹{item.price}</h3>
        <div className="flex justify-center gap-4 items-center mt-5 mb-3">
          {/* <div
            className="bg-primary text-white text-2xl p-3 rounded-full cursor-pointer"
            onClick={() => handleEdit(item._id)}
          > */}
          <Link
            href={`/admin/items/${item.id}/edit`}
            className="bg-primary text-white text-2xl p-3 rounded-full cursor-pointer"
          >
            <Edit />
          </Link>
          {/* </div> */}
          <DeleteAlert id={item.id} name={item.name} />
          {/* <div
            className="bg-primary text-white text-2xl p-3 rounded-full cursor-pointer"
            onClick={() => handleDelete(item.id)}
          >
            <Trash />
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default AdminItemCard;
