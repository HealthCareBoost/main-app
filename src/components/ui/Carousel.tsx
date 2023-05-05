import React from "react";
// Import Swiper React components
import type { SwiperProps } from "swiper/react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

type SwiperNodes = {
  node: React.ReactNode;
  key: string;
};

export const SwiperCarousel: React.FC<{
  items: SwiperNodes[];
  props?: SwiperProps;
}> = ({ items, props }) => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      {...props}
    >
      {items.map((el) => {
        return <SwiperSlide key={el.key}>{el.node}</SwiperSlide>;
      })}
    </Swiper>
  );
};
