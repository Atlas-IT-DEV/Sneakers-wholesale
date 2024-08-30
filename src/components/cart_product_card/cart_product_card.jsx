import styles from "./cart_product_card.module.css";
import minusIcon from "../../images/minus_icon.svg";
import plusIcon from "../../images/plus_icon.svg";
import settingProductIcon from "../../images/setting_product_icon.svg";

const CartProductCard = ({
  brand = "Asics",
  model = "Gel Quantum Kinetic",
  count = "8 пар",
  type = "опт",
  size = 38,
  price = 18400,
  new_price = 12000,
  image = "https://legacy.reactjs.org/logo-og.png",
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.productImage}>
        <img src={image} alt="" />
      </div>
      <div className={styles.aboutProduct}>
        <p className={styles.brandText}>{brand}</p>
        <p className={styles.modelText}>{model}</p>
        <p className={styles.countText}>
          {count} ({type})
        </p>
        <div className={styles.sizeField}>
          <p className={styles.sizeAttributeText}>Размер:</p>
          <p className={styles.sizeText}>{size}</p>
        </div>
        <div className={styles.countProduct}>
          <div className={`${styles.countUnactiveButton}`}>
            <img src={minusIcon} alt="" />
          </div>
          <p className={styles.countProductText}>1</p>
          <div className={`${styles.countActiveButton}`}>
            <img src={plusIcon} alt="" />
          </div>
        </div>
        <div className={styles.priceProduct}>
          <p className={styles.newPriceText}>{new_price}₽</p>
          <p className={styles.priceText}>{price}₽</p>
        </div>
        <div className={styles.buyButton}>
          <p className={styles.buyText}>Купить</p>
        </div>
      </div>
      <div className={styles.settingsButton}>
        <img src={settingProductIcon} alt="" />
      </div>
    </div>
  );
};

export default CartProductCard;
