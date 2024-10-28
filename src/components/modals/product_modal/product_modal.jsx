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
import { useStores } from "../../../store/store_context";
import { useNavigate } from "react-router";

const ProductModal = ({
  price = 18400,
  old_price = 18400,
  count = "8 пар (опт)",
  model_name = "Gel Quantum Kinetic",
  brand_name = "Asics",
  obj = {},
}) => {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();

  const { pageStore } = useStores();
  const [isPressed, setIsPressed] = useState([false, false, false, false]);
  const copyIsPressed = Array.from(isPressed);
  const [modalVisible, setModalVisible] = useState(false);
  const favouriteClick = () => {
    copyIsPressed[0] = !copyIsPressed[0];
    setIsPressed(copyIsPressed);
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
          {" "}
          {obj.urls.map((elem) => (
            <SwiperSlide className={styles.slider}>
              <img src={elem} alt="" className={styles.imageProduct} />
              <div
                className={styles.favouriteButton}
                onClick={() => {
                  favouriteClick();
                  setModalVisible(false);
                }}
              >
                <img
                  src={
                    isPressed[0] ? favouriteActiveIcon : favouriteInactiveIcon
                  }
                  alt=""
                />
              </div>
            </SwiperSlide>
          ))}
          {/* <SwiperSlide className={styles.slider}>
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
                src={isPressed[0] ? favouriteActiveIcon : favouriteInactiveIcon}
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
                src={isPressed[0] ? favouriteActiveIcon : favouriteInactiveIcon}
                alt=""
              />
            </div>
          </SwiperSlide> */}
        </Swiper>
      </div>

      {modalVisible && (
        <div
          className={
            modalVisible && width >= 585
              ? styles.modalProductOpen585_600
              : modalVisible && width >= 565
              ? styles.modalProductOpen565_585
              : modalVisible && width >= 525
              ? styles.modalProductOpen525_565
              : modalVisible && width >= 485
              ? styles.modalProductOpen485_525
              : modalVisible && width >= 450
              ? styles.modalProductOpen450_485
              : modalVisible && width >= 410
              ? styles.modalProductOpen410_450
              : modalVisible && width >= 375
              ? styles.modalProductOpen375_410
              : styles.modalProductClose
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
                src={isPressed[0] ? favouriteActiveIcon : favouriteInactiveIcon}
                alt=""
              />
            </div>
            {obj.urls.map((elem) => (
              <SwiperSlide className={styles.slideProduct}>
                <img src={elem} alt="" className={styles.imageProductModal} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className={styles.priceCountView}>
            <div className={styles.priceView}>
              <p className={styles.priceText}>{obj?.price}₽</p>
              <p className={styles.oldPriceText}></p>
            </div>
            <p className={styles.countText}>{obj?.count}</p>
          </div>
          <p className={styles.modelNameText}>{obj?.name}</p>
          <div className={styles.brandButton}>
            <p>{obj.company.name}</p>
            <img src={whiteArrow} alt="" />
          </div>
          <div className={styles.sizesHeader}>
            <p className={styles.sizeHeaderText}>Размеры (EU)</p>
            <p className={styles.gridText}>Размерная сетка</p>
          </div>
          <div className={styles.sizesView}>
            <div className={`${styles.sizeButton} ${styles.lockSizeButton}`}>
              <div className={styles.line} />
              <p>36</p>
            </div>
            <div className={`${styles.sizeButton} ${styles.activeSizeButton}`}>
              <p>37</p>
            </div>
            <div
              className={`${styles.sizeButton} ${styles.inActiveSizeButton}`}
            >
              <p>38</p>
            </div>
            <div
              className={`${styles.sizeButton} ${styles.inActiveSizeButton}`}
            >
              <p>38</p>
            </div>
            <div
              className={`${styles.sizeButton} ${styles.inActiveSizeButton}`}
            >
              <p>38</p>
            </div>
            <div
              className={`${styles.sizeButton} ${styles.inActiveSizeButton}`}
            >
              <p>38</p>
            </div>
            <div
              className={`${styles.sizeButton} ${styles.inActiveSizeButton}`}
            >
              <p>38</p>
            </div>
            <div
              className={`${styles.sizeButton} ${styles.inActiveSizeButton}`}
            >
              <p>38</p>
            </div>
            <div
              className={`${styles.sizeButton} ${styles.inActiveSizeButton}`}
            >
              <p>38</p>
            </div>
          </div>
          <footer>
            <div className={styles.hideView}>
              <div
                className={styles.hideButton}
                onClick={() => {
                  copyIsPressed[1] = !copyIsPressed[1];
                  setIsPressed(copyIsPressed);
                }}
              >
                <p>Доставка</p>
                <img
                  src={whiteArrow}
                  alt=""
                  className={
                    isPressed[1] ? styles.arrowOpen : styles.arrowClose
                  }
                />
              </div>
              <div
                className={
                  isPressed[1] ? styles.subFiltersOpen : styles.subFiltersClose
                }
              >
                <p className={styles.hideText}>
                  Доставка Доставка Доставка Доставка Доставка ДоставкаДоставка
                  Доставка Доставка Доставка Доставка Доставка Доставка{" "}
                </p>
              </div>
            </div>
            <div className={styles.hideView}>
              <div
                className={styles.hideButton}
                onClick={() => {
                  copyIsPressed[2] = !copyIsPressed[2];
                  setIsPressed(copyIsPressed);
                }}
              >
                <p>Детали</p>
                <img
                  src={whiteArrow}
                  alt=""
                  className={
                    isPressed[2] ? styles.arrowOpen : styles.arrowClose
                  }
                />
              </div>
              <div
                className={
                  isPressed[2] ? styles.subFiltersOpen : styles.subFiltersClose
                }
              >
                <p className={styles.hideText}>{obj.description}</p>
              </div>
            </div>
            <div className={styles.hideView}>
              <div
                className={styles.hideButton}
                onClick={() => {
                  copyIsPressed[3] = !copyIsPressed[3];
                  setIsPressed(copyIsPressed);
                }}
              >
                <p>Гарантия</p>
                <img
                  src={whiteArrow}
                  alt=""
                  className={
                    isPressed[3] ? styles.arrowOpen : styles.arrowClose
                  }
                />
              </div>
              <div
                className={
                  isPressed[3] ? styles.subFiltersOpen : styles.subFiltersClose
                }
              >
                <p className={styles.hideText}>
                  Гарантия Гарантия Гарантия Гарантия Гарантия Гарантия Гарантия
                  Гарантия ГарантияГарантияГарантия
                </p>
              </div>
            </div>
          </footer>

          <div className={styles.actionButtons}>
            <div className={styles.buyButton}>
              <p>Купить сейчас</p>
            </div>
            <div
              className={styles.addButton}
              onClick={() => {
                let copy_cart = Array.from(pageStore.cart);
                copy_cart.push(obj);
                pageStore.updateCart(copy_cart);
                navigate("/cart");
              }}
            >
              <p>В корзину</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductModal;
