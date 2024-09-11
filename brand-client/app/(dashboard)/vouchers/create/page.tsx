"use client";

import { createVoucher } from "@/app/lib/action";
import { PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

const initialState = {
  message: "",
  errors: undefined,
};

export default function AddVoucher() {
  const [state, formAction] = useFormState(createVoucher, initialState);
  const [voucherName, setVoucherName] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [voucherValue, setVoucherValue] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);

  const Submit = () => {
    const buttonStatus = useFormStatus();
    return (
      <button
        onClick={handleSubmit}
        type="button"
        className=" h-12 text-white bg-black hover:bg-violet-800 ease-in-out duration-150 font-medium rounded-lg text-base px-5 py-2.5">
        {buttonStatus.pending ? "Adding voucher..." : "Add voucher"}
      </button>
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("voucherName", voucherName);
    if (image) formData.append("image", image);
    formData.append("value", voucherValue);
    formData.append("description", description);

    formAction(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length !== 0) {
      setImage(e.target.files[0]);
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setPreview(imageUrl);
    }
  };

  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <div className="flex gap-5">
      <form className="w-1/2">
        <p className="text-xl text-gray-950 font-extrabold mb-3">
          Create a new voucher
        </p>
        <div className="flex flex-col gap-3">
          <div>
            <input
              name="voucherName"
              type="text"
              id="voucherName"
              value={voucherName}
              onChange={(e) => setVoucherName(e.target.value)}
              className={`bg-gray-50 border ${
                typeof state.errors?.voucherName === "undefined" ||
                state.errors.voucherName === ""
                  ? "border-gray-300"
                  : "border-red-600"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              placeholder="Voucher's name..."
            />
            <span className=" text-sm text-red-600 font-semibold">
              {state.errors?.voucherName}
            </span>
          </div>
          <label
            htmlFor="game_image"
            className=" h-[250px] cursor-pointer text-violet-500 hover:text-violet-800 transition-colors duration-300  relative flex flex-col justify-center items-center">
            {!preview && !image ? (
              <>
                <div className="absolute w-full h-full border-4 border-dashed border-violet-500 rounded-md hover:border-violet-800 transition-colors duration-300"></div>
                <PhotoIcon className="w-20" />
                <p className="text-base font-semibold">
                  Update your game&apos;s image
                </p>
              </>
            ) : (
              <div className="overflow-hidden border-4 border-violet-500 hover:border-violet-800 transition-colors duration-300 rounded-md">
                <Image
                  src={preview!}
                  alt={image?.name!}
                  className="object-fill w-full h-full rounded-md"
                  width={400}
                  height={400}
                />
              </div>
            )}
            <input
              id="game_image"
              type="file"
              className="hidden"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
            />
          </label>
          <span className=" text-sm text-red-600 font-semibold">
            {state.errors?.image}
          </span>
          {/* <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="image">
              Upload your voucher image
            </label>
            <input
              name="image"
              className={`block w-full text-sm text-gray-900 border ${
                typeof state.errors?.image === "undefined" ||
                state.errors.image === ""
                  ? "border-gray-300"
                  : "border-red-600"
              } rounded-lg cursor-pointer bg-gray-50 focus:outline-none`}
              id="default_size"
              type="file"
              lang="en"
              onChange={handleFileChange}
            />
            <span className=" text-sm text-red-600 font-semibold">
              {state.errors?.image}
            </span>
          </div> */}
          <div>
            <input
              name="value"
              type="text"
              id="first_name"
              value={voucherValue}
              onChange={(e) => setVoucherValue(e.target.value)}
              className={`bg-gray-50 border ${
                typeof state.errors?.value === "undefined" ||
                state.errors.value === ""
                  ? "border-gray-300"
                  : "border-red-600"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              placeholder="Voucher's value..."
            />
            <span className=" text-sm text-red-600 font-semibold">
              {state.errors?.value}
            </span>
          </div>
          <div>
            <input
              name="description"
              type="text"
              id="first_name"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`h-32 text-start bg-gray-50 border ${
                typeof state.errors?.description === "undefined" ||
                state.errors.description === ""
                  ? "border-gray-300"
                  : "border-red-600"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              placeholder="Voucher's description..."
            />
          </div>
          <span className=" text-sm text-red-600 font-semibold">
            {state.errors?.description}
          </span>
          <Submit />
        </div>
      </form>
      <div
        className={`${
          state.message === "success" ? "" : "invisible"
        } w-1/5  h-32 mt-10 flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800`}
        role="alert">
        <svg
          className="flex-shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">Add voucher successfully</span>
        </div>
      </div>
    </div>
  );
}
