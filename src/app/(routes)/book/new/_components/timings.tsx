import { Calendar } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Timings = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const times = [
    "12:00",
    "1:00",
    "2:00",
    "3:00",
    "4:00",
    "5:00",
    "6:00",
    "7:00",
    "8:00",
    "9:00",
    "10:00",
  ];
  const limitDate = addDays(new Date(), 15);
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    let hours = new Date(Number(searchParams.get("date"))).getHours();
    setSelectedTime(`${String(hours % 24)}:00`);
    console.log(selectedTime);
    router.push(`?size=${searchParams.get("size")}&date=${date?.getTime()}`, {
      scroll: false,
    });
  }, [date, router, searchParams, selectedTime]);

  console.log("date", searchParams.get("date"));
  return (
    <>
      <h3 className="text-2xl font-semibold my-10 text-center">
        Choose Date and Time
      </h3>

      <div className="flex justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          fromDate={new Date()}
          toDate={limitDate}
          className="rounded-md border"
        />
      </div>

      <div>
        <p className="my-5 text-xl text-center font-medium">
          Fetching timings for bookings for{" "}
          {new Intl.DateTimeFormat("en-us", {
            day: "numeric",
            month: "long",
            weekday: "long",
          }).format(date)}
        </p>

        <div className="flex flex-wrap gap-3">
          {times.map((time) => (
            <div key={time}>
              <button
                className={`px-5 py-1 ${
                  selectedTime === time ? "bg-primary" : "bg-gray-700"
                } text-white rounded-md`}
                key={time}
                onClick={() => {
                  date?.setHours(parseInt(time, 10), 0, 0, 0);
                  setSelectedTime(time);
                }}
              >
                {time} pm
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Timings;
