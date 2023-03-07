"use client";

import * as React from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "./Button";
import { type ImageInfo } from "../../utils/imageSchema";

export type CloudinaryUploadResponse = {
  event: string;
  info: ImageInfo;
};

type UploadButtonProps = {
  classNames: string;
  onUploadSetData: React.Dispatch<React.SetStateAction<ImageInfo[]>>;
};

export const CloudinaryUploadButton: React.FC<UploadButtonProps> = ({
  onUploadSetData,
}) => {
  // console.log(onUploadSetData);
  return (
    <CldUploadWidget
      uploadPreset="unsigned-uploads"
      onUpload={function (
        error: Error,
        result: CloudinaryUploadResponse
        // widget
      ) {
        if (error) {
          alert(error.message);
          // console.log("error");
          // console.error(error);
        }
        console.log("res");
        console.log(result);
        onUploadSetData((prev) => [...prev, result.info]);
        // console.log("wid");
        // console.log(widget);
      }}
    >
      {({ open }) => {
        function handleOnClick(e: React.MouseEvent<HTMLElement>) {
          e.preventDefault();
          // console.log(cloudinary);
          // console.log(widget);
          open();
        }
        return <Button onClick={handleOnClick}>Upload an Image</Button>;
      }}
    </CldUploadWidget>
  );
};
