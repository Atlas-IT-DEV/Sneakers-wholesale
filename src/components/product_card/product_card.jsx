import useWindowDimensions from "../hooks/windowDimensions";

import ProductModal from "../modals/product_modal/product_modal";

import styles from "./product_card.module.css";
// Import Swiper styles
import "swiper/css";

const ProductCard = ({
  countProduct = "8 пар (опт)",
  price = 18400,
  oldPrice = 20000,
  model_name = "",
  obj = {},
}) => {
  const { width } = useWindowDimensions();

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
    </div>
  );
};

export default ProductCard;
