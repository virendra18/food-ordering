import { Order, OrderItem, Products } from "@prisma/client";

export type OrderItemWithProduct = OrderItem & {
  product: Products;
};

// export type OrderData = Order & { orderItems: OrderItemWithProduct[] };
export type OrderData = Order;
