"use client";
import useAuthStore from "@/stores/authStore";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";

const SignupForm = () => {
  const { setUser } = useAuthStore();
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);

  const [error, setError] = useState({
    isError: false,
    errorMessage: "",
  });
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setError({ errorMessage: "", isError: false });

    const formData = new FormData(e.target as HTMLFormElement);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });

      const resData = await res.json();

      console.log(res.status);
      if (res.status === 400 || res.status === 401 || res.status === 500) {
        toast.error("Couldn't Signup", {
          autoClose: 1500,
        });
        setError({
          isError: true,
          errorMessage: "Please check email and password.",
        });
        return;
      }
      setUser(resData.data);
      router.push("/profile");
    } catch (error) {
      setError({
        isError: true,
        errorMessage: "Error while log in. Please try again later.",
      });
      console.log("Error while login");
    }
  }
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold my-7 text-center">Sign up</h1>

      <form onSubmit={handleSubmit} className="w-[100%] mx-auto lg:w-auto">
        <label htmlFor="name" className="mt-5 block text-gray-600">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="border-slate-400 px-3 w-full md:w-[400px] py-2 rounded-md border-2 "
        />
        <label htmlFor="email" className="mt-5 block text-gray-600">
          Email
        </label>
        <input
          type="text"
          name="email"
          id="email"
          className="border-slate-400 px-3 w-full md:w-[400px] py-2 rounded-md border-2 "
        />
        <label htmlFor="password" className="mt-5 block text-gray-600">
          Password
        </label>
        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            name="password"
            id="password"
            className="border-slate-400 px-3 w-full md:w-[400px] py-2 rounded-md border-2 "
          />
          <button type="button" aria-label="Password Invisible.">
            <button
              onClick={() => setShowPass((prev) => !prev)}
              type="button"
              aria-label="Password Invisible."
            >
              {showPass ? (
                <Eye className="w-6 select-none text-gray-700 cursor-pointer h-6 absolute top-2 right-2" />
              ) : (
                <EyeOff className="w-6 select-none text-gray-700 cursor-pointer h-6 absolute top-2 right-2" />
              )}
            </button>
          </button>
        </div>

        {error.isError ? (
          <div className="flex gap-3 bg-red-600 py-2 px-4 text-white rounded-lg mt-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-alert-triangle"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
              <line x1="12" x2="12" y1="9" y2="13"></line>
              <line x1="12" x2="12.01" y1="17" y2="17"></line>
            </svg>
            <p>{error.errorMessage}</p>
          </div>
        ) : null}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-primary mt-5 w-full px-10 py-2  border-2 border-solid  rounded-md text-white hover:scale-95 duration-100 ease-in "
          >
            Sign up
          </button>
        </div>
      </form>

      <p className="mt-5 text-left">
        Already have an account?{" "}
        <Link href="/login" className="font-medium">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
