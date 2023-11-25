import useCart from "@/stores/cartStore";
import { ProductWithQuantity } from "@/types/Product";
import { Minus, Plus, X } from "lucide-react";

const CartItem = ({ item }: { item: ProductWithQuantity }) => {
  const { increaseQuantity, removeItemFromCart, decreaseQuantity } = useCart();
  const handleIncreaseQuantity = (id: string) => {
    increaseQuantity(id);
  };
  const handleDecreaseQuantity = (id: string) => {
    decreaseQuantity(id);
  };
  const handleRemove = (id: string) => {
    removeItemFromCart(id);
  };
  return (
    <div>
      <div className="trendingcard bg-white  text-black py-2 px-4 rounded-2xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px]">
        <div className="mb-5 flex justify-center">
          <img
            src={`${item.image_url}`}
            alt=""
            className="h-[200px] max-w-[200px] md:mt-[-50px] mt-[-30px]"
          />
        </div>
        <div className="text-area text-center">
          <h3 className="text-xl font-bold">{item.name}</h3>
          <h3 className="text-xl mt-3">₹{item.price}</h3>
          <h3 className="text-base mt-3">Quantity: {item.quantity}</h3>
          <div className="flex justify-center gap-3 items-center m-3">
            <div
              className="bg-primary text-white text-xl p-1 rounded-full cursor-pointer"
              onClick={() => handleIncreaseQuantity(item.id)}
            >
              <Plus />
            </div>
            <div
              className="bg-primary text-white text-xl p-1 rounded-full cursor-pointer"
              onClick={() => handleDecreaseQuantity(item.id)}
            >
              <Minus />
            </div>
            <div
              className="bg-primary text-white text-xl p-1 rounded-full cursor-pointer"
              onClick={() => handleRemove(item.id)}
            >
              <X />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
