import useWindowDimensions from "../hooks/windowDimensions";
import { Image } from "@chakra-ui/react";
import { useStores } from "../../store/store_context";
import { observer } from "mobx-react-lite";

import styles from "./favourite_product_card.module.css";
import no_photo from "./../../images/tiger_big_logo.jpg";
import trash from "./../../images/trash.svg";

const FavouriteProductCard = observer(
  ({
    name = "Asics",
    model_name = "Gel Quantum Kinetic",
    count_product = "8 пар (опт)",
    price = 18400,
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
            </div>
            <div
              className={styles.settingsProductButton}
              onClick={async () => await toggleFavourite()}
            >
              <Image src={trash} width={"15px"} />
            </div>
          </div>
          <p className={styles.nameProductText}>{name}</p>
          <p className={styles.modelNameText}>{model_name}</p>
          <p className={styles.countProductText}>{count_product}</p>
          <div className={styles.costsView}>
            <p className={styles.priceText}>{parseInt(price)} ₽</p>
          </div>
        </div>
      </div>
    );
  }
);

export default FavouriteProductCard;
