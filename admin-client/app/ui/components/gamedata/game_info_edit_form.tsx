"use client";
import { updateGameData, UpdateGameDataFormState } from "@/app/lib/action";
import { InformationCircleIcon, PhotoIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function GameInfoEditForm() {
  const initialState: UpdateGameDataFormState = { message: null, errors: {} };
  const [state, formAction] = useFormState(updateGameData, initialState);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [instruction, setInstruction] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length !== 0) {
      setImage(e.target.files[0]);
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setPreview(imageUrl);
    }
  };

  const Submit = () => {
    const buttonStatus = useFormStatus();
    return (
      <button
        onClick={handleSubmit}
        type="button"
        className=" w-full h-[70px] text-sm font-bold py-4 px-2 rounded-md hover:bg-violet-800 transition-colors duration-300 bg-gray-950 text-violet-50">
        {buttonStatus.pending ? "Updating game info..." : "Update"}
      </button>
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("gameName", name);
    formData.append("description", description);
    formData.append("instruction", instruction);
    if (image) formData.append("gameImage", image);

    formAction(formData);
  };

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <form className="mt-5 w-full px-6 grid grid-cols-1 divide-y-2 divide-gray-300 lg:py-6 lg:px-0 lg:divide-y-0 lg:divide-x-2 lg:grid-cols-[minmax(0,_2fr)_minmax(0,_1fr)] bg-white rounded-md shadow-md">
      <div className="flex flex-col gap-y-4 py-8 lg:px-8 lg:py-0">
        <div className="flex gap-x-2 text-gray-950">
          <InformationCircleIcon className=" w-5" />
          <h2 className=" font-semibold">Game Information</h2>
        </div>
        <div className="flex flex-col gap-y-0">
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
          {state.errors?.gameImage && (
            <span className="text-red-500 text-sm font-medium mt-1">
              {state.errors.gameImage[0]}
            </span>
          )}

          <div>
            <div className="relative z-0 w-full mt-5 mb-5 group">
              <input
                type="text"
                name="name"
                id="name"
                className={clsx(
                  "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-violet-600 peer",
                  {
                    "border-gray-300": !state.errors?.gameName,
                    "border-red-300": state.errors?.gameName,
                  }
                )}
                placeholder=" "
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label
                htmlFor="name"
                className="after:content-['*'] after:ml-0.5 after:text-red-500 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-violet-600 peer-focus:dark:text-violet-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Game&apos;s name
              </label>
              {state.errors?.gameName && (
                <span className="text-red-500 text-sm font-medium mt-1">
                  {state.errors.gameName[0]}
                </span>
              )}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="description"
                id="description"
                className={clsx(
                  "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-violet-600 peer",
                  {
                    "border-gray-300": !state.errors?.description,
                    "border-red-300": state.errors?.description,
                  }
                )}
                placeholder=" "
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label
                htmlFor="description"
                className="after:content-['*'] after:ml-0.5 after:text-red-500 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-violet-600 peer-focus:dark:text-violet-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Description
              </label>
              {state.errors?.description && (
                <span className="text-red-500 text-sm font-medium mt-1">
                  {state.errors.description[0]}
                </span>
              )}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="instruction"
                id="instruction"
                className={clsx(
                  "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-violet-600 peer",
                  {
                    "border-gray-300": !state.errors?.instruction,
                    "border-red-300": state.errors?.instruction,
                  }
                )}
                placeholder=" "
                required
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
              />
              <label
                htmlFor="instruction"
                className="after:content-['*'] after:ml-0.5 after:text-red-500 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-violet-600 peer-focus:dark:text-violet-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                How to play ?
              </label>
              {state.errors?.instruction && (
                <span className="text-red-500 text-sm font-medium mt-1">
                  {state.errors.instruction[0]}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className=" relative w-full h-full">
        <div className="sticky top-0 py-8 px-2 lg:px-8 lg:py-0 rounded-md">
          <Submit />
        </div>
      </div>
    </form>
  );
}
