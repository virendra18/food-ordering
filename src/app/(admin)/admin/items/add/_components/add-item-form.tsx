"use client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Id, toast } from "react-toastify";

// import FileUpload from "../../../components/admin/fileUpload";
import FormError from "./form-error";
import FileUpload from "./file-upload";
import useImageUploadStore from "@/stores/imageUploadStore";

export type AdminAddItemsInputs = {
  itemName: string;
  itemPrice: number;
  itemRating: number;
  itemCategory: string;
  itemIsFeatured: "yes" | "no";
  itemIsAvailable: "yes" | "no";
};

const AddItemForm = () => {
  let addNewItemToast: Id;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminAddItemsInputs>();

  const { imageId, imageUrl } = useImageUploadStore();

  const onSubmit: SubmitHandler<AdminAddItemsInputs> = async (data) => {
    addNewItemToast = toast.loading("Creating a new item...");
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
      itemImageUrl: imageUrl,
      itemImageId: imageId,
    };

    try {
      const res = await fetch("/api/admin/items", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const resData = await res.json();

      if (res.status !== 201) {
        toast.update(addNewItemToast, {
          render: "Couldn't add new item",
          type: "error",
          isLoading: false,
          autoClose: 1500,
        });

        return;
      }
      toast.update(addNewItemToast, {
        render: "Successfully added new item",
        type: "success",
        isLoading: false,
        autoClose: 1500,
      });

      reset();
    } catch (error: any) {
      toast.update(addNewItemToast, {
        render: "Couldn't add new item",
        type: "error",
        isLoading: false,
        autoClose: 1500,
      });
    }
  };

  return (
    <>
      <h2 className="text-primary text-3xl text-center  font-bold my-5 md:mb-10">
        Add Items
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
                className=" border bg-[#f8f8f8] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                {...register("itemName", { required: true })}
              />
            </div>
            <div>
              <label htmlFor="itemPrice">Item Price</label>
              <input
                id="itemPrice"
                type="number"
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
                className=" border bg-[#f8f8f8] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>

            <div>
              <FileUpload />
            </div>

            <button className="w-fit border-white border-2 border-solid px-4 py-2 rounded-lg">
              Add Item
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddItemForm;
