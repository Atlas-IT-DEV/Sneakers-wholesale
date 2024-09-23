import styles from "./slider_carousel.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import { Autoplay, FreeMode } from "swiper/modules";
import { Image } from "@chakra-ui/react";

import tiger from "../../images/logo.png";
import sneakers from "../../images/sneak_img_card.png";
import useWindowDimensions from "../hooks/windowDimensions";

const SliderCarousel = () => {
  const { width } = useWindowDimensions();
  return (
    <>
      <Swiper
        className={styles.slideTrack}
        modules={[FreeMode, Autoplay]}
        freeMode={false}
        autoplay={{ delay: 30000, disableOnInteraction: false }}
        spaceBetween={40}
      >
        <SwiperSlide className={styles.slider}>
          <div className={styles.main_block1}>
            <div
              className={
                width >= 585
                  ? styles.container585_600
                  : width >= 565
                  ? styles.container565_585
                  : width >= 525
                  ? styles.container525_565
                  : width >= 485
                  ? styles.container485_525
                  : width >= 450
                  ? styles.container450_485
                  : width >= 410
                  ? styles.container410_450
                  : styles.container375_410
              }
            >
              <Image
                position={"absolute"}
                bottom={[-5, -7, -10, -10, -10]}
                src={tiger}
                width={"70%"}
                zIndex={0}
              />
              <p className={styles.nameCompany}>REED</p>
              <p className={styles.descriptionText}>
                Оптовые поставки лучших <br />
                кроссовок с премиальным <br />
                качеством
              </p>
              <p className={styles.subDescriptionText}>
                Ожидание и реальность совпадают!
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slider}>
          <div className={styles.main_block2}>
            <div
              className={
                width >= 585
                  ? styles.container585_600
                  : width >= 565
                  ? styles.container565_585
                  : width >= 525
                  ? styles.container525_565
                  : width >= 485
                  ? styles.container485_525
                  : width >= 450
                  ? styles.container450_485
                  : width >= 410
                  ? styles.container410_450
                  : styles.container375_410
              }
            >
              <p className={styles.nameCompany}>REED</p>
              <p className={styles.descriptionText}>
                Открыт самовывоз <br />в Москве
              </p>
              <img src={sneakers} alt="" />
              <img src={sneakers} alt="" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slider}>
          <div className={styles.main_block1}>
            <div
              className={
                width >= 585
                  ? styles.container585_600
                  : width >= 565
                  ? styles.container565_585
                  : width >= 525
                  ? styles.container525_565
                  : width >= 485
                  ? styles.container485_525
                  : width >= 450
                  ? styles.container450_485
                  : width >= 410
                  ? styles.container410_450
                  : styles.container375_410
              }
            >
              <Image
                position={"absolute"}
                bottom={[-5, -7, -10, -10, -10]}
                src={tiger}
                width={"70%"}
                zIndex={0}
              />
              <p className={styles.nameCompany}>REED</p>
              <p className={styles.descriptionText}>
                Оптовые поставки лучших <br />
                кроссовок с премиальным <br />
                качеством
              </p>
              <p className={styles.subDescriptionText}>
                Ожидание и реальность совпадают!
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default SliderCarousel;
