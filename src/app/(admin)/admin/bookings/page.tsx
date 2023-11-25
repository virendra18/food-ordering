import MyBookingsClient from "@/app/(routes)/my-bookings/_components/client";
import { columns } from "@/app/(routes)/my-bookings/_components/columns";
import { DataTable } from "@/app/(routes)/my-bookings/_components/data-table";
import db from "@/lib/db";
import React from "react";

const AdminAllBookings = async () => {
  const bookings = await db.booking.findMany();

  const modifiedBookings = bookings.map((booking) => ({
    ...booking,
    timing: Number(BigInt(booking.timing)),
  }));

  return (
    <div>
      <h2 className="my-10 text-primary text-3xl font-bold">All Bookings</h2>
      <DataTable columns={columns} data={modifiedBookings} />
    </div>
  );
};

export default AdminAllBookings;
