"use client";

import * as React from "react";
import type {
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "./Button";
import { type ImageInfo } from "../../utils/validations/imageSchema";

export type CloudinaryUploadResponse = {
  event: string;
  info: ImageInfo | CloudinaryUploadWidgetInfo;
};

type UploadButtonProps = {
  className: string;
  onUploadSetData: React.Dispatch<React.SetStateAction<ImageInfo[]>>;
};

export const CloudinaryUploadButton: React.FC<UploadButtonProps> = ({
  onUploadSetData,
  className,
}) => {
  // console.log(onUploadSetData);
  return (
    <CldUploadWidget
      uploadPreset="unsigned-uploads"
      // onSuccess={function (
      //   // error: Error,
      //   results: CloudinaryUploadResponse,
      //   // widget
      // ) {
      //   // if (error) {
      //   //   alert(error.message);
      //   //   console.log("error");
      //   //   console.error(error);
      //   // }
      //   console.log("res");
      //   console.log(results);
      //   onUploadSetData((prev) => [...prev, results.info]);
      //   console.log("wid");
      //   // console.log(widget);
      // }}
      onSuccess={(result: CloudinaryUploadWidgetResults) => {
        console.log(result);
        if (result && result.info) {
          console.log(result);
          onUploadSetData((prev) => [
            ...prev,
            result.info as unknown as ImageInfo,
          ]);
        }
      }}
      onQueuesEnd={(result, { widget }) => {
        (widget as unknown as { close: () => void }).close();
      }}
    >
      {({ open }) => {
        function handleOnClick(e: React.MouseEvent<HTMLElement>) {
          e.preventDefault();
          // console.log(cloudinary);
          // console.log(widget);
          open();
        }
        return (
          <Button className={className} onClick={handleOnClick}>
            Upload an Image
          </Button>
        );
      }}
    </CldUploadWidget>
  );
};
