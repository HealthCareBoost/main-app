"use client";

import * as React from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "./Button";

type CloudinaryUploadResponse = {
  event: string;
  info: {
    access_mode: string;
    asset_id: string;
    batchId: string;
    bytes: number;
    created_at: string;
    etag: string;
    folder: string;
    format: string;
    height: number;
    id: string;
    original_extension: string;
    original_filename: string;
    path: string;
    placeholder: boolean | string | string[];
    public_id: string;
    resource_type: string;
    secure_url: string;
    signature: string;
    tags: string[];
    thumbnail_url: string;
    type: string;
    url: string;
    version: number;
    version_id: string;
    width: number;
  };
};

type UploadButtonProps = {
  classNames: string;
  onUploadFc: () => void;
};

export const CloudinaryUploadButton: React.FC<UploadButtonProps> = ({
  onUploadFc,
}) => {
  return (
    <CldUploadWidget
      uploadPreset="unsigned-uploads"
      onUpload={function (
        error: Error,
        result: CloudinaryUploadResponse,
        widget
      ) {
        if (error) {
          alert(error.message);
          // console.log("error");
          // console.error(error);
        }
        console.log("res");
        console.log(result);
        onUploadFc.mutate({
          ...result.info,
        });
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
