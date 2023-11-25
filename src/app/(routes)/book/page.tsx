import React from "react";

import { Metadata } from "next";
import Link from "next/link";
import MyBookingsClient from "../my-bookings/_components/client";

export const metadata: Metadata = {
  title: "Your Bookings",
};
const BookingPage = () => {
  return (
    <div>
      <div className="flex items-center gap-5">
        <h2 className="text-3xl font-bold my-10">Your Bookings</h2>

        <Link
          className="px-10 py-2 rounded-full bg-primary text-white"
          href="/book/new"
        >
          Book a table
        </Link>
      </div>

      <MyBookingsClient />
    </div>
  );
};

export default BookingPage;
