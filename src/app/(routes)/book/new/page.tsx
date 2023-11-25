import React from "react";
import TableSize from "./_components/table-size";
import { Metadata } from "next";
import BookingClient from "./_components/client";

export const metadata: Metadata = {
  title: "Book a table",
};
const BookingPage = () => {
  return (
    <div>
      <h2 className="text-3xl  mt-20 font-bold">Book Your Table</h2>
      <BookingClient />
    </div>
  );
};

export default BookingPage;
