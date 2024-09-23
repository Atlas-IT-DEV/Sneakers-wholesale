import styles from "./product_modal.module.css";

import favouriteInactiveIcon from "../../../images/favourite_inactive_icon.svg";
import favouriteActiveIcon from "../../../images/favourite_active_icon.svg";
import whiteArrow from "../../../images/arrow_select_white.svg";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import "swiper/css/navigation";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import { useState } from "react";
import useWindowDimensions from "../../hooks/windowDimensions";

const ProductModal = ({
  price = 18400,
  old_price = 18400,
  count = "8 пар (опт)",
  model_name = "Gel Quantum Kinetic",
  brand_name = "Asics",
}) => {
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
              className={styles.backButton}
              onClick={() => {
                setModalVisible(false);
              }}
            >
              <img src={whiteArrow} alt="" />
            </div>
            <div
              className={styles.addFavouriveButton}
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

          <div className={styles.priceCountView}>
            <div className={styles.priceView}>
              <p className={styles.priceText}>{price}₽</p>
              <p className={styles.oldPriceText}>{old_price}₽</p>
            </div>
            <p className={styles.countText}>{count}</p>
          </div>
          <p className={styles.modelNameText}>{model_name}</p>
          <div className={styles.brandButton}>
            <p>{brand_name}</p>
            <img src={whiteArrow} alt="" />
          </div>
          <div className={styles.sizesHeader}>
            <p className={styles.sizeHeaderText}>Размеры (EU)</p>
            <p className={styles.gridText}>Размерная сетка</p>
          </div>
          <div className={styles.sizesView}></div>
        </div>
      )}
    </div>
  );
};

export default ProductModal;
