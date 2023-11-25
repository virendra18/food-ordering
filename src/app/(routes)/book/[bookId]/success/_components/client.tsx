"use client";
import PageLoading from "@/components/ui/page-loading";
import useAuthStore from "@/stores/authStore";
import { Booking } from "@prisma/client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import useSWR from "swr";

const SuccessClient = () => {
  const { bookId } = useParams();
  const { user } = useAuthStore();

  const fetcher = async () => {
    const res = await fetch(`/api/bookings/${bookId}`);
    const resData = await res.json();

    return JSON.parse(resData.data);
  };

  const {
    data,
    error,
    isLoading,
  }: { data: any; error: any; isLoading: boolean } = useSWR(
    `/api/orders/${bookId}`,
    fetcher
  );

  if (isLoading) {
    return <PageLoading />;
  }

  if (error) {
    return <div>Error while fetching details</div>;
  }
  function formatTime(time: Number) {
    const formattedDate = new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "long",
      weekday: "long",
    }).format(data.timing);
    const formattedTime = new Intl.DateTimeFormat("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    }).format(data.timing);

    return `${formattedDate}, ${formattedTime} pm`;
  }

  if (!data) {
    return <div>No booking found.</div>;
  }
  return (
    <div className="flex flex-col gap-5">
      <p>
        Dear {data?.name} we have booked your seat for {data?.size} peoples on{" "}
        {formatTime(data.timing)}{" "}
      </p>

      <Link
        href="/my-bookings"
        className="w-fit px-6 py-2 bg-white rounded-md text-primary"
      >
        View all bookings
      </Link>
    </div>
  );
};

export default SuccessClient;
