"use client";
import React, { useState } from "react";

const AdminClient = () => {
  const [imageData, setImageData] = useState("");
  const [showImg, setShowImg] = useState(false);
  const handleChange = async (event: any) => {
    console.log(event.target.value);
    setShowImg(true);
    const res = await fetch("https://flask.jsx18.link/graph", {
      method: "POST",

      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ selected_month: event.target.value }),
    });

    const resData = await res.json();

    setImageData(`data:image/png;base64, ${resData?.image_data}`);

    console.log("resData", resData);
  };
  return (
    <div>
      <h2 className="text-3xl my-10 text-primary font-bold">Admin</h2>

      <div>
        <form>
          <label htmlFor="selected_month">Select Month</label>
          <select
            onChange={handleChange}
            className="px-4 py-3 bg-white-200 rounded-xl ml-5"
            name="selected_month"
            id="selected_month"
          >
            <option value="2023-01">January, 2023</option>
            <option value="2023-02">February, 2023</option>
            <option value="2023-03">March, 2023</option>
            <option value="2023-04">April, 2023</option>
            <option value="2023-05">May, 2023</option>
            <option value="2023-06">June, 2023</option>
            <option value="2023-07">July, 2023</option>
            <option value="2023-08">August, 2023</option>
            <option value="2023-09">September, 2023</option>
            <option value="2023-10">October, 2023</option>
            <option value="2023-11">November, 2023</option>
            <option value="2023-12">December, 2023</option>
          </select>
        </form>
      </div>

      {showImg && (
        <div>
          <img src={imageData} />
        </div>
      )}
    </div>
  );
};

export default AdminClient;
