import styles from "./favourite_product_card.module.css";
// import settingsProduct from "../../images/setting_product_icon.svg";
// import orangeArrow from "../../images/orange_arrow.svg";
// import minusIcon from "../../images/minus_icon.svg";
// import plusIcon from "../../images/plus_icon.svg";
import no_photo from "./../../images/tiger_big_logo.jpg";
import trash from "./../../images/trash.svg";

// import { useEffect, useState } from "react";
import useWindowDimensions from "../hooks/windowDimensions";
import { Image } from "@chakra-ui/react";
import { useStores } from "../../store/store_context";
import { observer } from "mobx-react-lite";

const FavouriteProductCard = observer(
  ({
    name = "Asics",
    model_name = "Gel Quantum Kinetic",
    count_product = "8 пар (опт)",
    size = 38,
    price = 18400,
    oldPrice = 18400,
    num = 1,
    image_product = no_photo,
    shop_type,
    obj = {},
  }) => {
    const { width } = useWindowDimensions();
    const { pageStore } = useStores();

    const findFavourite = () => {
      return pageStore.favourites.length != 0 &&
        Array.isArray(pageStore.favourites)
        ? pageStore.favourites.find((item) => item?.product?.id == obj?.id)
        : null;
    };

    const deleteFavourite = async (fav_id) => {
      const response = await fetch(
        `https://reed-shop.ru:8088/favorites/${fav_id}`,
        {
          method: "DELETE",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${pageStore.token}`,
          },
        }
      );
      console.log("delete", response);
    };

    const toggleFavourite = async () => {
      if (findFavourite()) {
        await deleteFavourite(findFavourite()?.id);
      }
      await pageStore.getFavouriteByUserIdFull();
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
          <img src={image_product} alt="" />
        </div>
        <div className={styles.infoCard}>
          <div className={styles.headerCard}>
            <div className={styles.catalogButton}>
              <p>
                {shop_type == "Розница"
                  ? "Розничный магазин"
                  : "Оптовый магазин"}
              </p>
              {/* <img src={orangeArrow} alt="" /> */}
            </div>
            <div
              className={styles.settingsProductButton}
              onClick={async () => await toggleFavourite()}
            >
              {/* <img src={settingsProduct} alt="" /> */}
              <Image src={trash} width={"15px"} />
            </div>
          </div>
          <p className={styles.nameProductText}>{name}</p>
          <p className={styles.modelNameText}>{model_name}</p>
          <p className={styles.countProductText}>{count_product}</p>
          {/* <p className={styles.sizeText}>
            Размер: <span>{size}</span>
          </p> */}
          {/* <div className={styles.counterProduct}>
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
        </div> */}
          <div className={styles.costsView}>
            <p className={styles.priceText}>{parseInt(price)} ₽</p>
            {/* <p className={styles.oldPriceText}>{oldPrice}₽</p> */}
          </div>
          {/* <div className={styles.buyButton}>
            <p>Купить</p>
          </div> */}
        </div>
      </div>
    );
  }
);

export default FavouriteProductCard;
