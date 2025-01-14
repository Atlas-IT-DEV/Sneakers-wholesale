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
import { useEffect, useState } from "react";
import useWindowDimensions from "../../hooks/windowDimensions";
import { useStores } from "../../../store/store_context";
import { useNavigate } from "react-router";

import no_photo from "./../../../images/tiger_big_logo.jpg";
import { observer } from "mobx-react-lite";
import { Image, Text, VStack } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

const ProductModal = observer(
  ({
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
    const toast = useToast();

    const createFavourite = async (product_id) => {
      await pageStore.createFavourite(product_id);
    };

    const deleteFavourite = async (fav_id) => {
      const response = await fetch(
        `https://reed-shop.ru:8088/favorites/${fav_id}`,
        {
          method: "DELETE",
          headers: {
            accept: "application/json",
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJUT0tFTl9UWVBFX0ZJRUxEIjoiYWNjZXNzX3Rva2VuX3R5cGUiLCJzdWIiOiJhZG1pbiIsInVzZXJfaWQiOjYxOCwiZmlyc3RfbmFtZSI6IkRJTUFTUyIsImxhc3RfbmFtZSI6IlZFTElDSEtPIiwiZXhwIjoxNzM2NzcwNTU1LCJpYXQiOjE3MzY2ODQxNTV9.m-_FGU1n-ueCXV0WTJVoN8GG2nuiJn3RG9RRcr2QxbVRJo2hiVNtW0nf2l1S-84h1-QDce1LaPdus9jtk24EAit5YB3sYrkF6N4sFktpScOdICckuRp4Xd8i8Osoq5imXa1vwdepiEcApNBi9d_iiaYrQS15uq8WmBqs3YTuxiYr7QCbYIXoyrqqPxsRv4B1fX72FMyHJ6g5tOv8wr63PJuSv8VKwVhtZ7KHX6Eg2awN8ZG2HXe2taX4iedDcNNILM3t710XBSI9XgaoIGwkh5ZM9ZJkkBNsv132096Sg2HNbS_QibxsfRLomkbsyqC9uUwb0A08X8BHEjP07kuxtQ`,
          },
        }
      );
      console.log("delete", response);
    };

    const findFavourite = () => {
      return pageStore.favourites.length != 0
        ? pageStore.favourites.find((item) => item?.product?.id == obj?.id)
        : null;
    };

    useEffect(() => {
      modalVisible && console.log("find", findFavourite());
    }, [pageStore.favourites, modalVisible]);

    const toggleFavourite = async () => {
      setModalVisible(false);
      if (!findFavourite()) {
        await createFavourite(obj?.id);
      } else {
        await deleteFavourite(findFavourite()?.id);
      }
      await pageStore.getFavouriteByUserIdFull();
    };

    const toggleModalFavourite = async () => {
      if (!findFavourite()) {
        await createFavourite(obj?.id);
      } else {
        await deleteFavourite(findFavourite()?.id);
      }
      await pageStore.getFavouriteByUserIdFull();
    };

    useEffect(() => {
      modalVisible && console.log("fav", pageStore.favourites);
    }, [pageStore.favourites, modalVisible]);

    const [selectedSize, setSelectedSize] = useState("");

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
            {obj.urls.length != 0 ? (
              obj.urls.map((elem, index) => {
                return (
                  <SwiperSlide className={styles.slider} key={index}>
                    <img
                      src={elem?.url}
                      alt=""
                      className={styles.imageProduct}
                    />
                    <div
                      className={styles.favouriteButton}
                      onClick={async () => {
                        await toggleFavourite();
                      }}
                    >
                      <img
                        src={
                          findFavourite()
                            ? favouriteActiveIcon
                            : favouriteInactiveIcon
                        }
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                );
              })
            ) : (
              <SwiperSlide className={styles.slider}>
                <img src={no_photo} alt="" className={styles.imageProduct} />
                <div
                  className={styles.favouriteButton}
                  onClick={async () => {
                    await toggleFavourite();
                  }}
                >
                  <img
                    src={
                      findFavourite()
                        ? favouriteActiveIcon
                        : favouriteInactiveIcon
                    }
                    alt=""
                  />
                </div>
              </SwiperSlide>
            )}
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
                  setSelectedSize("");
                }}
              >
                <img src={whiteArrow} alt="" />
              </div>
              <div
                className={styles.addFavouriveButton}
                onClick={async () => {
                  await toggleModalFavourite();
                }}
              >
                <img
                  src={
                    findFavourite()
                      ? favouriteActiveIcon
                      : favouriteInactiveIcon
                  }
                  alt=""
                />
              </div>
              {obj.urls.length != 0 ? (
                obj.urls.map((elem) => (
                  <SwiperSlide className={styles.slideProduct}>
                    <Image
                      src={elem?.url || no_photo}
                      // maxHeight={"300px"}
                      width={width}
                      obj
                    />
                    {/* <img
                      src={elem?.url || no_photo}
                      alt=""
                      className={styles.imageProductModal}
                    /> */}
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide className={styles.slideProduct}>
                  {/* <img src={no_photo} alt="" className={styles.imageProduct} /> */}
                  <Image src={no_photo} width={width} objectFit={"fill"} />
                </SwiperSlide>
              )}
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
              {Array.from(obj?.characteristics)
                .filter((elem) => elem.id == 1)
                .map((elem) => elem.value)
                .sort()
                .map((item) => (
                  <div
                    className={`${styles.sizeButton} ${
                      selectedSize == item
                        ? styles.activeSizeButton
                        : styles.inActiveSizeButton
                    }`}
                    onClick={() => setSelectedSize(item)}
                  >
                    <p>{item}</p>
                  </div>
                ))}
            </div>
            {selectedSize == "" && (
              <Text color={"red"} fontSize={"14px"} marginLeft={"26px"}>
                Выберите размер
              </Text>
            )}
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
                    isPressed[1]
                      ? styles.subFiltersOpen
                      : styles.subFiltersClose
                  }
                >
                  <p className={styles.hideText}>
                    Доставка Доставка Доставка Доставка Доставка
                    ДоставкаДоставка Доставка Доставка Доставка Доставка
                    Доставка Доставка{" "}
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
                    isPressed[2]
                      ? styles.subFiltersOpen
                      : styles.subFiltersClose
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
                    isPressed[3]
                      ? styles.subFiltersOpen
                      : styles.subFiltersClose
                  }
                >
                  <p className={styles.hideText}>
                    Гарантия Гарантия Гарантия Гарантия Гарантия Гарантия
                    Гарантия Гарантия ГарантияГарантияГарантия
                  </p>
                </div>
              </div>
            </footer>

            <div className={styles.actionButtons}>
              <div
                className={styles.buyButton}
                style={selectedSize == "" ? { cursor: "no-drop" } : null}
                onClick={() => {
                  if (selectedSize != "") {
                    let copy_cart = Array.from(pageStore.cart);
                    copy_cart.push({ ...obj, size: selectedSize });
                    pageStore.updateCart(copy_cart);
                    setSelectedSize("");
                    navigate("/cart");
                  }
                }}
              >
                <p>Купить сейчас</p>
              </div>
              <div
                className={styles.addButton}
                style={selectedSize == "" ? { cursor: "no-drop" } : null}
                onClick={() => {
                  if (selectedSize != "") {
                    let copy_cart = Array.from(pageStore.cart);
                    copy_cart.push({ ...obj, size: selectedSize });
                    pageStore.updateCart(copy_cart);
                    setSelectedSize("");
                  }
                }}
              >
                <p>В корзину</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default ProductModal;
