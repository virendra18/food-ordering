import db from "@/lib/db";
import { Metadata } from "next";
import { useParams } from "next/navigation";
import React from "react";
import SuccessClient from "./_components/client";

export const metadata: Metadata = {
  title: "Booking Success",
};
const SuccessPage = async ({ params }: { params: { bookingId: string } }) => {
  return (
    <div className="h-1/2 w-1/2 mx-auto text-white px-10 py-5 my-10 flex flex-col items-center justify-center bg-primary rounded-md">
      <h3 className="text-xl font-medium"> Booking Success </h3>
      <SuccessClient />
    </div>
  );
};

export default SuccessPage;
