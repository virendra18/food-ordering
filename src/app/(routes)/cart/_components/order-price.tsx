import Link from "next/link";

import getTotal from "@/lib/getTotal";
import useCart from "@/stores/cartStore";

const OrderPrice = () => {
  const { cartItems } = useCart();

  const quantity = getTotal(cartItems).totalQuantity;
  const price = getTotal(cartItems).totalPrice;

  return (
    <div className="pt-5 pb-10 px-3">
      <h2 className="font-bold text-center text-2xl mb-5">Order Value</h2>

      <h3 className="text-xl text-center  ">
        Total Quantity: <span className="font-bold"> {quantity}</span>
      </h3>
      <h3 className="text-xl text-center mt-5  ">
        Total Price: <span className="font-bold"> ₹{price}</span>
      </h3>

      <div className="flex justify-center mt-7">
        <Link
          className="text-xl font-bold border-solid border-3 border-white bg-white text-primary rounded-lg px-7 py-2"
          href="/order/checkout"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default OrderPrice;
