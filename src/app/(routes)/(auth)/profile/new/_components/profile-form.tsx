"use client";
import useAuthStore from "@/stores/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { userInfo } from "os";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";
const ProfileForm = () => {
  const { user } = useAuthStore();
  const router = useRouter();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          city: formData.get("city"),
          state: formData.get("state"),
          address: formData.get("address"),
          pincode: formData.get("pincode"),
          phone: formData.get("phone"),
        }),
      });

      const resData = await res.json();

      if (resData.success) {
        toast("Profile created successfully", {
          autoClose: 2500,
          type: "success",
        });
        router.push("/");
      }
    } catch (error) {
      toast("Couldn't Create Profile", {
        autoClose: 2500,
        type: "success",
      });
    }
  };

  const [wantFD, setWantFD] = useState(true);

  const handleAddress = () => {
    setWantFD((prev) => !prev);
  };
  return (
    <div className="w-full mb-10 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold my-7 text-center">Profile</h1>

      <form onSubmit={handleSubmit} className="w-[100%] mx-auto lg:w-auto">
        <label htmlFor="name" className="mt-5 block text-gray-600">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          defaultValue={user?.name}
          className="border-slate-400 px-3 w-full md:w-[400px] py-2 rounded-md border-2 "
        />

        <label htmlFor="phone" className="mt-5 block text-gray-600">
          Phone
        </label>
        <input
          type="number"
          name="phone"
          id="phone"
          className="border-slate-400 px-3 w-full md:w-[400px] py-2 rounded-md border-2 "
        />

        <div className="flex my-3 gap-3 items-center">
          <label htmlFor="food-delivery">I want food delivery service</label>
          <input
            id="food-delivery"
            className=""
            name="food-delivery"
            onChange={() => handleAddress()}
            defaultChecked={wantFD}
            type="checkbox"
          />
        </div>

        <div>
          {wantFD ? (
            <>
              <label htmlFor="address" className="mt-5 block text-gray-600">
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="House No/ Apt No"
                className="border-slate-400 px-3 w-full md:w-[400px] py-2 rounded-md border-2 "
              />
              <label htmlFor="city" className="mt-5 block text-gray-600">
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                placeholder="City Name"
                className="border-slate-400 px-3 w-full md:w-[400px] py-2 rounded-md border-2 "
              />
              <label htmlFor="state" className="mt-5 block text-gray-600">
                State
              </label>
              <select
                id="state"
                name="state"
                className="border-slate-400 px-3 w-full md:w-[400px] py-2 rounded-md border-2 "
              >
                <option
                  className="border-slate-400 px-3 w-full md:w-[400px] py-2 rounded-md border-2 "
                  value="chhattisgarh"
                >
                  Chhattisgarh
                </option>
              </select>
              <label htmlFor="pincode" className="mt-5 block text-gray-600">
                Pin code
              </label>
              <input
                type="text"
                name="pincode"
                id="pincode"
                placeholder="Pin code"
                className="border-slate-400 px-3 w-full md:w-[400px] py-2 rounded-md border-2 "
              />
            </>
          ) : null}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-primary mt-5 w-full px-10 py-2  border-2 border-solid  rounded-md text-white hover:scale-95 duration-100 ease-in "
          >
            Finish Profile Setup
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
