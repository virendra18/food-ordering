"use client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Id, toast } from "react-toastify";

// import FileUpload from "../../../components/admin/fileUpload";
import FormError from "../../../add/_components/form-error";
import FileUpload from "../../../add/_components/file-upload";
import useImageUploadStore from "@/stores/imageUploadStore";
import { Products } from "@prisma/client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export type AdminAddItemsInputs = {
  itemName: string;
  itemPrice: number;
  itemRating: number;
  itemCategory: string;
  itemIsFeatured: "yes" | "no";
  itemIsAvailable: "yes" | "no";
};

const EditItemForm = ({ itemInfo }: { itemInfo: Products }) => {
  let addNewItemToast: Id;

  const [changeImg, setChangeImg] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminAddItemsInputs>();

  const { imageId, imageUrl } = useImageUploadStore();

  const onSubmit: SubmitHandler<AdminAddItemsInputs> = async (data) => {
    addNewItemToast = toast.loading("Editing item...");
    const IsAvailable = data.itemIsAvailable === "yes" ? true : false;
    const IsFeatured = data.itemIsFeatured === "yes" ? true : false;
    const itemPrice = +data.itemPrice;
    const itemRating = +data.itemRating;
    const formData = {
      ...data,
      itemPrice: itemPrice,
      itemRating: itemRating,
      itemIsAvailable: IsAvailable,
      itemIsFeatured: IsFeatured,
      itemImageUrl: imageUrl ? imageUrl : itemInfo.image_url,
      itemImageId: imageId ? imageId : itemInfo.image_id,
    };

    try {
      const res = await fetch(`/api/admin/items/${itemInfo.id}`, {
        method: "PATCH",
        body: JSON.stringify(formData),
      });

      const resData = await res.json();

      if (res.status !== 200) {
        toast.update(addNewItemToast, {
          render: "Couldn't edit item",
          type: "error",
          isLoading: false,
          autoClose: 1500,
        });

        return;
      }
      toast.update(addNewItemToast, {
        render: "Successfully edit the item",
        type: "success",
        isLoading: false,
        autoClose: 1500,
      });

      reset();
    } catch (error: any) {
      toast.update(addNewItemToast, {
        render: "Couldn't edit item",
        type: "error",
        isLoading: false,
        autoClose: 1500,
      });
    }
  };

  return (
    <>
      <h2 className="text-primary text-3xl text-center  font-bold my-5 md:mb-10">
        Edit Item
      </h2>
      <div className="bg-primary my-5 rounded-lg text-black shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
        <div className="px-5 md:px-10 py-5">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-white flex flex-col gap-4 "
          >
            <div>
              <label htmlFor="itemName">Item Name</label>
              <input
                id="itemName"
                defaultValue={itemInfo.name}
                className=" border bg-[#f8f8f8] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                {...register("itemName", { required: true })}
              />
            </div>
            <div>
              <label htmlFor="itemPrice">Item Price</label>
              <input
                id="itemPrice"
                type="number"
                defaultValue={itemInfo.price}
                className=" border bg-[#f8f8f8] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                {...register("itemPrice", { required: true, min: 0 })}
                min={0}
              />
            </div>
            <FormError
              errors={errors}
              errorEmitter={"itemPrice"}
              errorType={"required"}
              errorMessage={"This field is required"}
            />
            <FormError
              errors={errors}
              errorEmitter={"itemPrice"}
              errorType={"min"}
              errorMessage={" Price should be greater than 0"}
            />

            <div>
              <label htmlFor="itemRating">Item Rating</label>
              <input
                id="itemRating"
                type="number"
                defaultValue={itemInfo.ratings}
                className=" border bg-[#f8f8f8] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                {...register("itemRating", { required: true, min: 0, max: 5 })}
                min={0}
              />
              <FormError
                className="mt-3"
                errors={errors}
                errorEmitter={"itemRating"}
                errorType={"max"}
                errorMessage={" Rating should be between 0 and 5"}
              />
            </div>

            <div>
              <label htmlFor="itemCategory">Category</label>

              <select
                {...register("itemCategory")}
                id="category"
                defaultValue={itemInfo.category}
                className=" border bg-[#f8f8f8] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
              >
                <option value="uncategorised">Choose a category</option>
                <option value="veg">Veg Dishes</option>
                <option value="fastfood">Fast Food </option>
                <option value="nonveg">Non Veg Dishes</option>
                <option value="icecream">Icecream</option>
                <option value="colddrinks">Cold Drinks</option>
              </select>
            </div>

            <div>
              <label htmlFor="isAvailable">Item Available</label>

              <select
                defaultValue={itemInfo.is_available ? "yes" : "no"}
                {...register("itemIsAvailable")}
                id="is_available"
                className=" border bg-[#f8f8f8] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label htmlFor="isFeatured">Featured Item</label>

              <select
                {...register("itemIsFeatured")}
                id="is_featured"
                defaultValue={itemInfo.is_featured ? "yes" : "no"}
                className=" border bg-[#f8f8f8] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>

            <div>
              {changeImg ? (
                <FileUpload />
              ) : (
                <div className="h-[450px] md:h-[400px] border-dotted border-2 rounded-lg mt-2 flex flex-col items-center justify-center ">
                  <img
                    className="w-[250px]"
                    src={itemInfo.image_url}
                    alt="item image"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      setChangeImg(true);
                    }}
                    className="my-3 px-5 bg-red-800 rounded-md py-2"
                  >
                    Change Image
                  </button>
                </div>
              )}

              {changeImg ? (
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setChangeImg(false);
                    }}
                    className="my-3 px-5 bg-red-800 rounded-md py-2"
                  >
                    Back to old Image
                  </button>
                </div>
              ) : null}
            </div>

            <button className="w-fit border-white border-2 border-solid px-4 py-2 rounded-lg">
              Edit Item
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditItemForm;
