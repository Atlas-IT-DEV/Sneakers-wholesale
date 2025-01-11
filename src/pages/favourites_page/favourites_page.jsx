import BottomMenu from "../../components/bottom_menu/bottom_menu";
import styles from "./favourite_page.module.css";

import arrowBackIcon from "../../images/arrow_back_icon.svg";
import sortIcon from "../../images/sort_icon.svg";
import filterIcon from "../../images/filter_icon.svg";
import { useNavigate } from "react-router";
import SelectCatalog from "../../components/select_catalog/select_catalog";
import FavouriteProductCard from "../../components/favourite_product_card/favourite_product_card";
import useWindowDimensions from "../../components/hooks/windowDimensions";
import { useEffect } from "react";
import { useStores } from "../../store/store_context";
import { Text } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";

const FavouritesPage = observer(() => {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();

  const tg = window?.Telegram?.WebApp;
  const backButton = tg?.BackButton;
  backButton?.show();
  const back_page = () => {
    navigate("/");
    backButton?.hide();
  };
  backButton?.onClick(back_page);

  const { pageStore } = useStores();

  useEffect(() => {
    pageStore.getFavouriteByUserIdFull();
    console.log("fav", pageStore.favourites);
  }, []);

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
      <div className={styles.header}>
        <p className={styles.namePageText}>Избранное</p>

        <div className={styles.headerButtons}>
          {/* <div className={styles.backButton}>
            <img src={arrowBackIcon} alt="" />
          </div> */}
          <div className={styles.searchField}>
            <input type="search" placeholder="Найти" />
          </div>
          <div className={styles.sortButton}>
            <img src={sortIcon} alt="" />
          </div>
          <div
            className={styles.filterButton}
            onClick={() => navigate("/filters")}
          >
            <img src={filterIcon} alt="" />
          </div>
        </div>
      </div>
      <div className={styles.selector}>
        <SelectCatalog />
      </div>
      <div className={styles.products}>
        {pageStore.favourites.length != 0 ? (
          pageStore.favourites.map((item, index) => {
            return <FavouriteProductCard key={index} />;
          })
        ) : (
          <Text>Вы ничего не добавляли в избранное</Text>
        )}
      </div>
      <BottomMenu />
    </div>
  );
});
export default FavouritesPage;
