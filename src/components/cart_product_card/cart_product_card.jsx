import useWindowDimensions from "../hooks/windowDimensions";

import { useStores } from "../../store/store_context";
import { Image } from "@chakra-ui/react";

import styles from "./cart_product_card.module.css";
import minusIcon from "../../images/minus_icon.svg";
import plusIcon from "../../images/plus_icon.svg";
import trashIcon from "./../../images/trash.svg";

const CartProductCard = ({
  brand = "Asics",
  model = "Gel Quantum Kinetic",
  size = 38,
  new_price = 12000,
  image = "https://legacy.reactjs.org/logo-og.png",
  count_product,
  onChangeQuantity,
  obj,
}) => {
  const { width } = useWindowDimensions();

  const { pageStore } = useStores();

  const removeProduct = (id, size) => {
    let copy_cart = Array.from(pageStore.cart);
    pageStore.updateCart(
      copy_cart.filter((elem) => !(elem.id === id && elem.size === size))
    );
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
      <Image
        src={trashIcon}
        position={"absolute"}
        width={"15px"}
        height={"20px"}
        right={"10px"}
        top={"20px"}
        onClick={() => removeProduct(obj.id, obj.size)}
      />
      <div className={styles.productImage}>
        <img src={image} alt="" />
      </div>
      <div className={styles.aboutProduct}>
        <p className={styles.brandText}>{brand}</p>
        <p className={styles.modelText}>
          {model} {obj?.is_original ? "(Оригинал)" : "(Реплика)"}
        </p>
        <p className={styles.countText}>({obj?.type_product})</p>
        <div className={styles.sizeField}>
          <p className={styles.sizeAttributeText}>Размер:</p>
          <p className={styles.sizeText}>{size}</p>
        </div>
        <div className={styles.countProduct}>
          <div
            className={
              obj?.quantity == 1
                ? styles.countUnactiveButton
                : styles.countActiveButton
            }
            onClick={() => {
              if (obj?.quantity != 1) {
                let copy_cart = Array.from(pageStore.cart);

                const index = copy_cart.findLastIndex(
                  (object) => object?.id == obj?.id
                );
                if (index != -1) {
                  copy_cart.splice(index, 1);
                }
                pageStore.updateCart(copy_cart);
              }
            }}
          >
            <img src={minusIcon} alt="" />
          </div>
          <p className={styles.countProductText}>{count_product}</p>
          <div
            className={`${styles.countActiveButton}`}
            onClick={() => {
              let copy_cart = Array.from(pageStore.cart);
              copy_cart.push(obj);
              pageStore.updateCart(copy_cart);
            }}
          >
            <img src={plusIcon} alt="" />
          </div>
        </div>
        <div className={styles.priceProduct}>
          <p className={styles.newPriceText}>
            {parseInt(new_price) * parseInt(count_product)} ₽
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
