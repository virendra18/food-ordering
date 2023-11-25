import React from "react";
import BookingClient from "../book/new/_components/client";
import MyBookingsClient from "./_components/client";

const MyBookingsPage = async () => {
  return (
    <>
      <h1 className="my-5 text-center text-3xl font-bold">My Bookings</h1>
      <MyBookingsClient />
    </>
  );
};

export default MyBookingsPage;
