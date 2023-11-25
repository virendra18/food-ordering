import { ProductWithQuantity } from "@/types/Product";

/**
 *
 * @param cartItems
 * @returns totalQuantity and totalPrice
 */
const getTotal = (cartItem: ProductWithQuantity[]) => {
  let totalQuantity = 0;
  let totalPrice = 0;
  cartItem.forEach((item) => {
    totalQuantity += item.quantity!;
    totalPrice += item.price! * item.quantity!;
  });
  return { totalPrice, totalQuantity };
};

export default getTotal;
