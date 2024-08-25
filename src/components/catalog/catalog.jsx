import styles from "./catalog.module.css";
import arrowRightIcon from "../../images/arrow_right_icon.svg";
import ProductCard from "../product_card.jsx/product_card";
import useWindowDimensions from "../hooks/windowDimensions";

const Catalog = () => {
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
      <div className={styles.headerField}>
        <p className={styles.nameText}>Каталог</p>
        <img src={arrowRightIcon} alt="" />
      </div>
      <div className={styles.productCarousel}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default Catalog;
