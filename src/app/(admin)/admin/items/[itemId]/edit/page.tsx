import db from "@/lib/db";
import React from "react";
import EditItemForm from "./_components/edit-form";

const EditItem = async ({ params }: { params: { itemId: string } }) => {
  const itemInfo = await db.products.findFirst({
    where: { id: params.itemId },
  });

  if (!itemInfo) {
    return;
  }
  return (
    <div>
      <EditItemForm itemInfo={itemInfo} />
    </div>
  );
};

export default EditItem;
