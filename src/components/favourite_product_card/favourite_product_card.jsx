import styles from "./favourite_product_card.module.css";
import settingsProduct from "../../images/setting_product_icon.svg";
import orangeArrow from "../../images/orange_arrow.svg";
import minusIcon from "../../images/minus_icon.svg";
import plusIcon from "../../images/plus_icon.svg";

import { useEffect, useState } from "react";

const FavouriteProductCard = ({
  name = "Asics",
  model_name = "Gel Quantum Kinetic",
  count_product = "8 пар (опт)",
  size = 38,
  price = 18400,
  oldPrice = 18400,
  num = 1,
}) => {
  const [count, setCount] = useState(1);
  useEffect(() => {
    setCount(num);
  }, [num]);
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img
          src="https://cache3.youla.io/files/images/780_780/5d/57/5d577bb2074b3e6c3359dfd6.jpg"
          alt=""
        />
      </div>
      <div className={styles.infoCard}>
        <div className={styles.headerCard}>
          <div className={styles.catalogButton}>
            <p>Розничный магазин</p>
            <img src={orangeArrow} alt="" />
          </div>
          <div className={styles.settingsProductButton}>
            <img src={settingsProduct} alt="" />
          </div>
        </div>
        <p className={styles.nameProductText}>{name}</p>
        <p className={styles.modelNameText}>{model_name}</p>
        <p className={styles.countProductText}>{count_product}</p>
        <p className={styles.sizeText}>
          Размер: <span>{size}</span>
        </p>
        <div className={styles.counterProduct}>
          <div
            className={`${styles.button} ${
              count == 1 ? styles.buttonLock : styles.buttonUnlock
            }`}
            onClick={() => (count != 1 ? setCount(count - 1) : setCount(1))}
          >
            <img src={minusIcon} alt="" />
          </div>
          <p>{count}</p>
          <div
            className={`${styles.buttonUnlock} ${styles.button}`}
            onClick={() => setCount(count + 1)}
          >
            <img src={plusIcon} alt="" />
          </div>
        </div>
        <div className={styles.costsView}>
          <p className={styles.priceText}>{price}₽</p>
          <p className={styles.oldPriceText}>{oldPrice}₽</p>
        </div>
        <div className={styles.buyButton}>
          <p>Купить</p>
        </div>
      </div>
    </div>
  );
};

export default FavouriteProductCard;
