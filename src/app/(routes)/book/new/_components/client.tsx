"use client";
import React, { useEffect, useState } from "react";
import TableSize from "./table-size";
import { useSearchParams } from "next/navigation";
import Timings from "./timings";
import Registration from "./registration";

const BookingClient = () => {
  const searchParams = useSearchParams();

  const tabs = ["size", "timing", "registration"];
  const [currentActiveTab, setCurrentActiveTab] = useState<
    "size" | "timings" | "registration"
  >("size");
  const size = searchParams.get("size");

  const [invalidSize, setInvalidSize] = useState(false);

  useEffect(() => {
    const bookingSize = ["2", "4", "8", "16"];
    if (size && bookingSize.indexOf(size!) === -1) {
      setInvalidSize(true);
    } else {
      // setCurrentActiveTab("timings");
      setInvalidSize(false);
    }
  }, [size]);
  // bg-[#09090b]

  function handleNext() {
    if (currentActiveTab === "size") {
      setCurrentActiveTab("timings");
    }
    if (currentActiveTab === "timings") {
      setCurrentActiveTab("registration");
    }
  }
  return (
    <>
      <div className="flex gap-10">
        <div className="w-[300px] h-fit my-10 flex flex-col gap-2 px-3 py-3 rounded-md text-white   bg-[#27272a] ">
          <div
            onClick={() => setCurrentActiveTab("size")}
            className={`cursor-pointer py-3 px-10 rounded-md text-center transition-all duration-150 ease-in hover:bg-[#b3b3d168] ${
              currentActiveTab === "size" && "bg-primary"
            } w-full`}
          >
            Table Size
          </div>
          <div
            onClick={() => setCurrentActiveTab("timings")}
            className={`cursor-pointer py-3 px-10 rounded-md text-center transition-all duration-150 ease-in hover:bg-[#b3b3d168] w-full ${
              currentActiveTab === "timings" && "bg-primary"
            }`}
          >
            Timings
          </div>
          <div
            onClick={() => setCurrentActiveTab("registration")}
            className={`cursor-pointer py-3 px-10 rounded-md text-center transition-all duration-150 ease-in hover:bg-[#b3b3d168] w-full ${
              currentActiveTab === "registration" && "bg-primary"
            }`}
          >
            Registration
          </div>
        </div>

        {/* <div> */}
        {currentActiveTab === "size" ? (
          <div className="w-full">
            {invalidSize ? (
              <p className="bg-red-600 my-5 px-3 py-2 rounded-md text-white md:w-1/2 mx-auto">
                Booking size {size} is not valid. Please select one of the below
              </p>
            ) : null}
            <TableSize />
          </div>
        ) : null}

        {currentActiveTab === "registration" ? (
          <div className="w-full">
            {invalidSize ? (
              <p className="bg-red-600 my-5 px-3 py-2 rounded-md text-white md:w-1/2 mx-auto">
                Booking size {size} is not valid. Please select one of the below
              </p>
            ) : null}
            <Registration />
          </div>
        ) : null}

        {currentActiveTab === "timings" ? (
          <div className="w-full">
            {invalidSize ? (
              <p className="bg-red-600 my-5 px-3 py-2 rounded-md text-white md:w-1/2 mx-auto">
                Booking size {size} is not valid. Please select one of the below
              </p>
            ) : null}
            <Timings />
          </div>
        ) : null}
      </div>
      <div className="flex justify-end gap-5 items-center">
        {currentActiveTab === "timings" ? (
          <>
            <button
              className="rounded-md bg-primary text-white px-7 py-2 disabled:cursor-not-allowed disabled:bg-gray-500 mb-10"
              onClick={() => setCurrentActiveTab("size")}
              disabled={invalidSize}
            >
              Previous
            </button>
          </>
        ) : null}
        <button
          className="rounded-md bg-primary text-white px-7 py-2 disabled:cursor-not-allowed disabled:bg-gray-500 mb-10"
          onClick={handleNext}
          disabled={invalidSize}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default BookingClient;
