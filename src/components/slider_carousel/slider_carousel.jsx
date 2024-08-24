import CarouselCard from "./carousel_card";
import styles from "./slider_carousel.module.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";

const SliderCarousel = () => {
  const [message, setMessage] = useState("");
  let buffer = [];
  useEffect(() => {
    for (let i = 0; i <= 3; i++) {
      buffer.push(
        <SwiperSlide className={styles.slider}>
          <CarouselCard />
        </SwiperSlide>
      );
    }
    setMessage(buffer);
  });

  return (
    <>
      <Swiper
        spaceBetween={50}
        className={styles.slideTrack}
        modules={[FreeMode, Pagination, Autoplay]}
        freeMode={true}
        pagination={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {message}
      </Swiper>
    </>
  );
};

export default SliderCarousel;
