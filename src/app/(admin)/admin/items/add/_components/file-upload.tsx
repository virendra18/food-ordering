"use client";
import { IKContext, IKUpload } from "imagekitio-react";
import React, { useRef, useState } from "react";

import { Id, toast } from "react-toastify";

import imagekit from "@/lib/imagekitConfig";
import { UploadCloud, Loader2 } from "lucide-react";
import useImageUploadStore from "@/stores/imageUploadStore";
import authenticator from "@/lib/imageKitAuthenticator";

const FileUpload = () => {
  const inputRef = useRef<any>(null);

  const [loading, setLoading] = useState(false);

  const { setImageId, setImageUrl, imageUrl, imageId, removeImageInfo } =
    useImageUploadStore();

  let uploadToast: Id;

  const onError = (err: any) => {
    setLoading(false);
    toast.update(uploadToast, {
      render: "Upload Failed",
      type: "error",
      isLoading: false,
      autoClose: 1500,
    });
  };
  const onSuccess = (res: any) => {
    setLoading(false);
    setImageUrl(res.url);
    setImageId(res.fileId);
    toast.update(uploadToast, {
      render: "Upload Success",
      type: "success",
      isLoading: false,
      autoClose: 1500,
    });
  };

  const onUploadStart = (evt: any) => {
    setLoading(true);

    uploadToast = toast.loading("Uploading Image...");
  };

  const handleDeleteImage = async () => {
    // imagekit.options.urlEndpoint = process.env.NEXT_PUBLIC_IK_AUTHENDPOINT;
    // imagekit.options.urlEndpoint = process.env.NEXT_PUBLIC_URLENDPOINT!;

    removeImageInfo();
    imagekit.deleteFile(imageId!);
  };

  if (loading) {
    return (
      <div className="h-[250px] md:h-[400px] border-dotted border-2 rounded-lg mt-2 flex items-center justify-center ">
        <Loader2 width={40} height={40} className="animate-spin" />{" "}
        <p className="ml-2 text-xl"> Uploading...</p>
      </div>
    );
  }

  return (
    <IKContext
      urlEndpoint={process.env.NEXT_PUBLIC_URLENDPOINT}
      publicKey={process.env.NEXT_PUBLIC_PUBLICKEY}
      authenticator={authenticator}
    >
      <div className="h-[250px] md:h-[400px] border-dotted border-2 rounded-lg mt-2 flex items-center justify-center ">
        {imageUrl === null ? (
          <label className="w-full h-full flex items-center justify-center cursor-pointer">
            <UploadCloud className="text-2xl  mr-2" />

            <IKUpload
              ref={inputRef}
              className="w-0 h-0"
              required
              onError={onError}
              onSuccess={onSuccess}
              onUploadStart={onUploadStart}
            />

            {inputRef && (
              <button type="button" onClick={() => inputRef?.current?.click()}>
                Upload Image
              </button>
            )}
          </label>
        ) : (
          <div className="flex flex-col gap-5">
            <img src={imageUrl!} className="h-[200px] w-[200px]" />

            <button
              className="bg-red-800 text-white rounded-lg px-5 py-2"
              type="button"
              onClick={() => handleDeleteImage()}
            >
              Delete Image
            </button>
          </div>
        )}
      </div>
    </IKContext>
  );
};

export default FileUpload;
