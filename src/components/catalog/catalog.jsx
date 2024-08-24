import styles from "./catalog.module.css";
import arrowRightIcon from "../../images/arrow_right_icon.svg";
import ProductCard from "../product_card.jsx/product_card";

const Catalog = () => {
  return (
    <div className={styles.container}>
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
