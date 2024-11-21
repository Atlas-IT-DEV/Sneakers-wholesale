import styles from "./cart_product_card.module.css";
import minusIcon from "../../images/minus_icon.svg";
import plusIcon from "../../images/plus_icon.svg";
import settingProductIcon from "../../images/setting_product_icon.svg";
import { useState } from "react";
import useWindowDimensions from "../hooks/windowDimensions";

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
  const [countGoods, setCountGoods] = useState(1);
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
          <div
            className={
              countGoods == 1
                ? styles.countUnactiveButton
                : styles.countActiveButton
            }
            onClick={() =>
              countGoods != 1 ? setCountGoods(countGoods - 1) : setCountGoods(1)
            }
          >
            <img src={minusIcon} alt="" />
          </div>
          <p className={styles.countProductText}>{countGoods}</p>
          <div
            className={`${styles.countActiveButton}`}
            onClick={() => setCountGoods(countGoods + 1)}
          >
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
        <img
          src={settingProductIcon}
          alt=""
          width={["20px", "20px", "22px", "24px", "26px", "28px", "30px"]}
          height={["20px", "20px", "22px", "24px", "26px", "28px", "30px"]}
        />
      </div>
    </div>
  );
};

export default CartProductCard;
