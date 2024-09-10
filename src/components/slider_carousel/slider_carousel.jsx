import CarouselCard from "./carousel_card";
import styles from "./slider_carousel.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import { Autoplay, FreeMode } from "swiper/modules";

const SliderCarousel = () => {
  return (
    <>
      <Swiper
        className={styles.slideTrack}
        modules={[FreeMode, Autoplay]}
        freeMode={false}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        <SwiperSlide className={styles.slider}>
          <CarouselCard />
        </SwiperSlide>
        <SwiperSlide className={styles.slider}>
          <CarouselCard />
        </SwiperSlide>
        <SwiperSlide className={styles.slider}>
          <CarouselCard />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default SliderCarousel;
