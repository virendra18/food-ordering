"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useSWR, { SWRConfig, useSWRConfig } from "swr";
import { toast } from "react-toastify";
import useAuthStore from "@/stores/authStore";
import { useRouter } from "next/navigation";
const CancelBooking = ({ id }: { id: string }) => {
  const { mutate } = useSWRConfig();
  const { user } = useAuthStore();
  const router = useRouter();
  const handleCancel = async () => {
    const res = await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
    });

    const resData = await res.json();

    console.log("cancel", resData);

    mutate(`/${user?.id}/my-bookings`);
    router.refresh();

    toast("Booking Cancelled Successfully", {
      autoClose: 1500,
      type: "success",
      isLoading: false,
    });
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <div className="text-red-600 font-bold cursor-pointer">
            Cancel Booking
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you absolutely sure to cancel the booking?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will cancel the booking
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleCancel()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CancelBooking;
