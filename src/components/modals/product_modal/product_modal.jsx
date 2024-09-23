import styles from "./product_modal.module.css";

import favouriteInactiveIcon from "../../../images/favourite_inactive_icon.svg";
import favouriteActiveIcon from "../../../images/favourite_active_icon.svg";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import "swiper/css/navigation";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import { useState } from "react";
import useWindowDimensions from "../../hooks/windowDimensions";

const ProductModal = () => {
  const { width } = useWindowDimensions();

  const [isPressed, setIsPressed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const favouriteClick = () => {
    setIsPressed(!isPressed);
  };
  return (
    <div>
      <div
        className={
          width >= 585
            ? styles.imageContainer585_600
            : width >= 565
            ? styles.imageContainer565_585
            : width >= 525
            ? styles.imageContainer525_565
            : width >= 485
            ? styles.imageContainer485_525
            : width >= 450
            ? styles.imageContainer450_485
            : width >= 410
            ? styles.imageContainer410_450
            : styles.imageContainer375_410
        }
      >
        <Swiper
          style={{
            "--swiper-pagination-color": "rgba(219, 105, 0, 1)",
            "--swiper-pagination-bullet-inactive-color":
              "rgba(224, 224, 224, 1)",
            "--swiper-pagination-bullet-inactive-opacity": "1",
            "--swiper-pagination-bullet-size": "9px",
            "--swiper-pagination-bullet-horizontal-gap": "4px",
          }}
          className={styles.slideTrack}
          modules={[FreeMode, Navigation, Pagination]}
          spaceBetween={50}
          freeMode={false}
          navigation={true}
          pagination={true}
          onClick={() => {
            setModalVisible(true);
          }}
        >
          <SwiperSlide className={styles.slider}>
            <img
              src="https://legacy.reactjs.org/logo-og.png"
              alt=""
              className={styles.imageProduct}
            />
            <div
              className={styles.favouriteButton}
              onClick={() => {
                favouriteClick();
                setModalVisible(false);
              }}
            >
              <img
                src={isPressed ? favouriteActiveIcon : favouriteInactiveIcon}
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.slider}>
            <img
              src="https://legacy.reactjs.org/logo-og.png"
              alt=""
              className={styles.imageProduct}
            />
            <div
              className={styles.favouriteButton}
              onClick={() => {
                favouriteClick();
                setModalVisible(false);
              }}
            >
              <img
                src={isPressed ? favouriteActiveIcon : favouriteInactiveIcon}
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.slider}>
            <img
              src="https://legacy.reactjs.org/logo-og.png"
              alt=""
              className={styles.imageProduct}
            />
            <div
              className={styles.favouriteButton}
              onClick={() => {
                favouriteClick();
                setModalVisible(false);
              }}
            >
              <img
                src={isPressed ? favouriteActiveIcon : favouriteInactiveIcon}
                alt=""
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {modalVisible && (
        <div
          className={
            modalVisible ? styles.modalProductOpen : styles.modalProductClose
          }
        >
          <p
            onClick={() => setModalVisible(false)}
            style={{ color: "white", position: "absolute", right: 0, top: 0 }}
          >
            Close
          </p>
          <Swiper
            style={{
              "--swiper-pagination-color": "rgba(219, 105, 0, 1)",
              "--swiper-pagination-bullet-inactive-color":
                "rgba(224, 224, 224, 1)",
              "--swiper-pagination-bullet-inactive-opacity": "1",
              "--swiper-pagination-bullet-size": "9px",
              "--swiper-pagination-bullet-horizontal-gap": "4px",
            }}
            className={styles.sliderProduct}
            modules={[FreeMode, Navigation, Pagination]}
            spaceBetween={10}
            freeMode={false}
            navigation={true}
            pagination={true}
            onClick={() => {
              setModalVisible(true);
            }}
          >
            <div
              className={styles.favouriteButton}
              onClick={() => {
                favouriteClick();
              }}
            >
              <img
                src={isPressed ? favouriteActiveIcon : favouriteInactiveIcon}
                alt=""
              />
            </div>
            <SwiperSlide className={styles.slideProduct}>
              <img
                src="https://legacy.reactjs.org/logo-og.png"
                alt=""
                className={styles.imageProduct}
              />
            </SwiperSlide>
            <SwiperSlide className={styles.slideProduct}>
              <img
                src="https://legacy.reactjs.org/logo-og.png"
                alt=""
                className={styles.imageProduct}
              />
            </SwiperSlide>
            <SwiperSlide className={styles.slideProduct}>
              <img
                src="https://legacy.reactjs.org/logo-og.png"
                alt=""
                className={styles.imageProduct}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default ProductModal;
