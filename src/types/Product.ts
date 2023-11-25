import { Products } from "@prisma/client";

export type ProductWithQuantity = Products & { quantity?: number };
