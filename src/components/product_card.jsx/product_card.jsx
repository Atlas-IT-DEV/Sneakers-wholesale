import styles from "./product_card.module.css";
import favouriteInactiveIcon from "../../images/favourite_inactive_icon.svg";
import shoppingIcon from "../../images/shopping_icon.svg";

const ProductCard = ({
  countProduct = "8 пар (опт)",
  price = 18400,
  oldPrice = 20000,
  brand_name = "Asics",
  model_name = "Gel Quantum Kinetic",
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img
          src="https://legacy.reactjs.org/logo-og.png"
          alt=""
          className={styles.imageProduct}
        />
        <div className={styles.favouriteButton}>
          <img src={favouriteInactiveIcon} alt="" />
        </div>
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
        <img src={shoppingIcon} alt="" />
      </div>
    </div>
  );
};

export default ProductCard;
