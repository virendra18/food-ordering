import Link from "next/link";
import React from "react";

const OrderSuccess = () => {
  return (
    <>
      <section className="md:my-7 lg:px-28 md:px-18  p-4">
        <div className="bg-primary md:w-[800px] mx-auto rounded-xl text-white py-5 px-5">
          <>
            <h2 className="text-2xl font-bold"> Dear User</h2>

            <p className="mt-3">
              We have successfully received your order. You will receive
              confimation soon. Meanwhile Check your order status.
            </p>

            <button className="py-3 px-8 mt-5 font-bold border-solid border-2 border-white rounded-lg">
              <Link href="/my-orders">Order Status</Link>
            </button>
          </>
        </div>
      </section>
    </>
  );
};

export default OrderSuccess;
