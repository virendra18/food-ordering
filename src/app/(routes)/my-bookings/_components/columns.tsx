"use client";

import { ColumnDef } from "@tanstack/react-table";
import CancelBooking from "./cancel-booking";
import DeleteBooking from "./delete-booking";

export type Booking = {
  id: string;
  name: string;
  size: number;
  timing: number;
  isCancelled: boolean;
};

export const columns: ColumnDef<Booking>[] = [
  {
    accessorKey: "name",
    header: "Booker's Name",
  },
  {
    accessorKey: "size",
    header: "Guest Size",
  },
  {
    accessorKey: "timing",
    header: "Booking Date",
    cell: ({ row }) => {
      const formattedDate = new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "long",
        weekday: "long",
      }).format(Number(row.getValue("timing")));
      const formattedTime = new Intl.DateTimeFormat("en-IN", {
        hour: "numeric",
        minute: "2-digit",
        hour12: false,
      }).format(Number(row.getValue("timing")));

      return `${formattedDate}, ${formattedTime} pm`;
    },
  },

  {
    accessorKey: "isCancelled",
    header: "Booking Status",
    cell: ({ row }) => {
      return (
        <>
          {row.getValue("isCancelled") ? (
            <p className="text-red-600">Cancelled</p>
          ) : (
            <p className="text-green-600">Booked</p>
          )}
        </>
      );
    },
  },

  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const booking = row.original;

      if (booking.isCancelled) {
        return <DeleteBooking id={booking.id} />;
      } else {
        return <CancelBooking id={booking.id} />;
      }
    },
  },
];
