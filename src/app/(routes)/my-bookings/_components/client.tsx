"use client";
import PageLoading from "@/components/ui/page-loading";
import useAuthStore from "@/stores/authStore";
import { ModifiedBooking } from "@/types/ModifiedBooking";
import { Booking } from "@prisma/client";
import { Trash } from "lucide-react";
import { useEffect } from "react";
import useSWR from "swr";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const MyBookingsClient = () => {
  const { user } = useAuthStore();

  const fetchBookings = async () => {
    const res = await fetch("/api/bookings");
    const resData = await res.json();

    const data = await JSON.parse(resData.data);

    return data;
  };

  const {
    data: bookings,
    error,
    isLoading,
  }: { data: ModifiedBooking[]; error: any; isLoading: boolean } = useSWR(
    `/${user?.id}/my-bookings`,
    fetchBookings
  );

  function formatTime(timing: number) {
    const formattedDate = new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "long",
      weekday: "long",
    }).format(timing);
    const formattedTime = new Intl.DateTimeFormat("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    }).format(timing);

    return `${formattedDate}, ${formattedTime} pm`;
  }

  if (isLoading) {
    return <PageLoading />;
  }
  return (
    <div className="flex flex-col gap-3">
      {/* {bookings.map((booking) => (
        <div
          key={booking.id}
          className="bg-primary px-3 py-2 text-white rounded-md  flex items-center justify-between"
        >
          <div>{booking.name}</div>

          <div className="flex gap-3 items-center">
            <p>{booking.size}</p>
            <p>{formatTime(booking.timing)}</p>
            <Trash />
          </div>
        </div>
      ))} */}

      <DataTable columns={columns} data={bookings} />
    </div>
  );
};

export default MyBookingsClient;
