import styles from "./product_card.module.css";
import favouriteInactiveIcon from "../../images/favourite_inactive_icon.svg";
import favouriteActiveIcon from "../../images/favourite_active_icon.svg";
import shoppingIcon from "../../images/shopping_icon.svg";
import currentImageIcon from "../../images/current_image.svg";
import unCurrentImageIcon from "../../images/uncurrent_image.svg";

import useWindowDimensions from "../hooks/windowDimensions";
import { useState } from "react";

const ProductCard = ({
  countProduct = "8 пар (опт)",
  price = 18400,
  oldPrice = 20000,
  brand_name = "Asics",
  model_name = "Gel Quantum Kinetic",
}) => {
  const { width } = useWindowDimensions();

  const [isPressed, setIsPressed] = useState(false);
  const favouriteClick = () => {
    setIsPressed(!isPressed);
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
      <div className={styles.imageContainer}>
        <img
          src="https://legacy.reactjs.org/logo-og.png"
          alt=""
          className={styles.imageProduct}
        />
        <div
          className={styles.favouriteButton}
          onClick={() => favouriteClick()}
        >
          <img
            src={isPressed ? favouriteActiveIcon : favouriteInactiveIcon}
            alt=""
          />
        </div>
      </div>
      <div className={styles.carouselImagesButtons}>
        <img src={currentImageIcon} alt="" />
        <img src={unCurrentImageIcon} alt="" />
        <img src={unCurrentImageIcon} alt="" />
      </div>
      <p className={styles.countProductText}>{countProduct}</p>
      <div className={styles.priceField}>
        <p className={styles.priceText}>{price}₽</p>
        <p className={styles.oldPriceText}>{oldPrice}₽</p>
      </div>
      <p className={styles.brandNameText}>{brand_name}</p>
      <p className={styles.modelNameText}>{model_name}</p>
      <div className={styles.addButton}>
        <p className={styles.addButtonText}>Добавить</p>
        <img src={shoppingIcon} alt="" className={styles.shopIcon} />
      </div>
    </div>
  );
};

export default ProductCard;
