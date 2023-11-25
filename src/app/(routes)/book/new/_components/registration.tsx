import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";
import { Id, toast } from "react-toastify";
import { Profile } from "@prisma/client";
import useAuthStore from "@/stores/authStore";

const Registration = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const [userProfile, setUserProfile] = useState<Profile[] | null>(null);

  let successToast: Id;
  function formatTime() {
    const formattedDate = new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "long",
      weekday: "long",
    }).format(Number(searchParams.get("date")));
    const formattedTime = new Intl.DateTimeFormat("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    }).format(Number(searchParams.get("date")));

    return `${formattedDate}, ${formattedTime} pm`;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const formBody = {
      name: formData.get("name"),
      occasion: formData.get("specialrequest"),
      phone: formData.get("specialrequest"),
      specialrequest: formData.get("specialrequest"),
      size: searchParams.get("size"),
      timing: searchParams.get("date"),
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        body: JSON.stringify(formBody),
      });

      const resData = await res.json();

      console.log("?", res.status === 201 && resData.success);

      if (res.status === 201 && resData.success) {
        toast.update(successToast, {
          render: "Booking Successfull",
          type: "success",
          isLoading: false,
          autoClose: 1500,
        });

        router.push(`/book/${resData.bookingDetails.id}/success`);
      } else {
        toast.update(successToast, {
          render: "Couldn't book",
          type: "error",
          isLoading: false,
          autoClose: 1500,
        });
      }
    } catch (error) {}
    toast.update(successToast, {
      render: "Couldn't book",
      type: "error",
      isLoading: false,
      autoClose: 1500,
    });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("/api/profile");
      const resData = await res.json();
      setUserProfile(resData.data);
    };

    fetchProfile();
  }, []);

  return (
    <>
      <h3 className="text-2xl font-semibold my-10 text-center">
        Confirm Your Booking
      </h3>

      <div className="text-white font-bold bg-primary px-5 py-3 rounded-md">
        <p>Table Size: {searchParams.get("size")} </p>
        <p>Booking Time: {formatTime()}</p>
      </div>

      <div className="my-10 text-white  px-5 py-5 bg-primary rounded-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="name" className="mt-5  text-white">
              Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={user?.name}
              className="ml-3 border-white focus-visible:outline-none focus-visible:border-5 bg-transparent px-3 w-full md:w-[400px] py-1 rounded-md border-2 "
            />
          </div>

          <div>
            <label htmlFor="phone" className="mt-5  text-white">
              Phone Number:
            </label>
            <input
              type="number"
              name="phone"
              id="phone"
              defaultValue={userProfile?.[0]?.phone}
              className="ml-3 border-white focus-visible:outline-none focus-visible:border-5 bg-transparent px-3 w-full md:w-[400px] py-1 rounded-md border-2 "
            />
          </div>
          <div>
            <label htmlFor="occasion" className="mt-5  text-white">
              Occasion
            </label>
            <input
              type="text"
              name="occasion"
              id="occasion"
              className="ml-3 border-white focus-visible:outline-none focus-visible:border-5 bg-transparent px-3 w-full md:w-[400px] py-1 rounded-md border-2 "
            />
          </div>
          <div>
            <label htmlFor="specialrequest" className="mt-5  text-white">
              Special Request
            </label>
            <input
              type="text"
              name="specialrequest"
              id="specialrequest"
              className="ml-3 border-white focus-visible:outline-none focus-visible:border-5 bg-transparent px-3 w-full md:w-[400px] py-1 rounded-md border-2 "
            />
          </div>

          <div className="flex justify-end">
            <button className="my-4 border-2 px-5 py-2 rounded-md">
              Create booking
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Registration;
