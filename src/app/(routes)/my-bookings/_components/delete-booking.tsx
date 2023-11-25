import useAuthStore from "@/stores/authStore";
import React from "react";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
const DeleteBooking = ({ id }: { id: string }) => {
  const { mutate } = useSWRConfig();
  const { user } = useAuthStore();
  const router = useRouter();
  const handleDelete = async () => {
    const res = await fetch(`/api/bookings/${id}`, {
      method: "DELETE",
    });

    const resData = await res.json();

    mutate(`/${user?.id}/my-bookings`);
    router.refresh();

    toast("Booking Deleted Successfully", {
      autoClose: 1500,
      type: "success",
      isLoading: false,
    });
  };
  return (
    <div
      onClick={() => handleDelete()}
      className="text-red-600 cursor-pointer font-bold"
    >
      Delete
    </div>
  );
};

export default DeleteBooking;
