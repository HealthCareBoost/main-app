"use client";
import React, { useState } from "react";
import { type NextPage } from "next";

import { Button } from "../../components/ui/SubmitButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/Dialog";

import { api } from "../../utils/api";
import Image from "next/image";
import { CldImage, CldUploadWidget, CldUploadButton } from "next-cloudinary";
import { Footer } from "../../components/Footer";

// !!! ********** !!!
// just for testing functionality
// should be component on view recipe page if you are the user created it
// !!! ********** !!!

const UpdateRecipe: NextPage = () => {
  const { data, isLoading } = api.category.getAll.useQuery();
  // const setCat = api.category.setAll.useMutation();

  // useEffect(() => {
  //   setCat.mutate();
  // }, []);

  const [selectedCategoryIds, setCategoryIds] = useState<number[]>([]);

  return (
    <>
      {/* <Header /> */}
      {/* <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]"></main> */}
      {data && data.length > 0 ? (
        <Dialog>
          <DialogTrigger>Add Categories</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select categories to add</DialogTitle>
              <DialogDescription>
                <>
                  {data.map((category) => (
                    <Button
                      key={`category${category.id}`}
                      onClick={(e) => {
                        setCategoryIds((prev) => [
                          ...prev,
                          parseInt((e.target as HTMLInputElement).value),
                        ]);
                        console.log(selectedCategoryIds);
                      }}
                      value={category.id}
                      name={category.name}
                    >
                      {category.name}
                    </Button>
                  ))}
                </>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ) : (
        <Image
          width={100}
          height={100}
          alt={"loadingSpinner"}
          src="/rings.svg"
          className="w-48"
        />
      )}
      <CldImage
        width="600"
        height="600"
        alt="flower"
        loading="lazy"
        src="https://res.cloudinary.com/ddm9sjjq5/image/upload/v1677078944/let-me-cook/cbuptetd0r92mawu0co0.png"
        // src="https://res.cloudinary.com/ddm9sjjq5/image/upload/v1620640652/sample.jpg"
      ></CldImage>
      <Footer
        links={["About", "Privacy Policy", "Licensing", "Contact"]}
      ></Footer>
    </>
  );
};

export default UpdateRecipe;
