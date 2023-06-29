import type { SwiperProps } from "swiper/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";

export type SwiperNodes = {
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
      // onSlideChange={() => console.log('slide change')}
      // onSwiper={(swiper) => console.log(swiper)}
      // scrollbar={{
      //   hide: true,
      // }}
      // centeredSlides={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]} // Scrollbar
      {...props}
    >
      {items.map((el) => {
        return <SwiperSlide key={el.key}>{el.node}</SwiperSlide>;
      })}
    </Swiper>
  );
};
