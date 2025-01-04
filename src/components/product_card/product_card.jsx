import styles from "./product_card.module.css";
import favouriteInactiveIcon from "../../images/favourite_inactive_icon.svg";
import favouriteActiveIcon from "../../images/favourite_active_icon.svg";
import shoppingIcon from "../../images/shopping_icon.svg";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import { VStack, Text } from "@chakra-ui/react";
import useWindowDimensions from "../hooks/windowDimensions";
import { useState } from "react";
import ProductModal from "../modals/product_modal/product_modal";
import { useToast } from "@chakra-ui/react";
import { useStores } from "../../store/store_context";

const ProductCard = ({
  countProduct = "8 пар (опт)",
  price = 18400,
  oldPrice = 20000,
  model_name = "",
  obj = {},
}) => {
  const { width } = useWindowDimensions();
  const { pageStore } = useStores();

  const [isPressed, setIsPressed] = useState(false);
  const favouriteClick = () => {
    setIsPressed(!isPressed);
  };
  const toast = useToast();

  const handleClick = () => {
    let copy_cart = Array.from(pageStore.cart);
    copy_cart.push(obj);
    pageStore.updateCart(copy_cart);
    toast({
      duration: 1000,
      position: "bottom",
      render: () => {
        return (
          <VStack
            borderRadius={"12px !important"}
            padding={"16px !important"}
            border={"1px solid rgba(227, 110, 0, 1)"}
            backgroundColor={"rgba(0, 0, 0, 0.9) !important"}
            align={"center"}
            justify={"center"}
            marginTop={50}
          >
            <Text color={"white"} textAlign={"center"} fontSize={"12px"}>
              {`${model_name} добавлено в корзину`}
            </Text>
          </VStack>
        );
      },
    });
  };
  return (
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
      <ProductModal obj={obj} />
      <p className={styles.countProductText}>{countProduct}</p>
      <div className={styles.priceField}>
        <p className={styles.priceText}>{price}₽</p>
        <p className={styles.oldPriceText}>
          {oldPrice != 0 || oldPrice != "" ? oldPrice + "₽" : null}
        </p>
      </div>
      <p className={styles.modelNameText}>{model_name}</p>
      <div
        className={styles.addButton}
        onClick={() => {
          handleClick();
        }}
      >
        <p className={styles.addButtonText}>Добавить</p>
        <img src={shoppingIcon} alt="" className={styles.shopIcon} />
      </div>
    </div>
  );
};

export default ProductCard;
