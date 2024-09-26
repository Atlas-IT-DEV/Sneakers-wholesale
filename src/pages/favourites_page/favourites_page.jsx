import BottomMenu from "../../components/bottom_menu/bottom_menu";
import styles from "./favourite_page.module.css";

import arrowBackIcon from "../../images/arrow_back_icon.svg";
import sortIcon from "../../images/sort_icon.svg";
import filterIcon from "../../images/filter_icon.svg";
import { useNavigate } from "react-router";
import SelectCatalog from "../../components/select_catalog/select_catalog";
import FavouriteProductCard from "../../components/favourite_product_card/favourite_product_card";
import useWindowDimensions from "../../components/hooks/windowDimensions";

const FavouritesPage = () => {
  const navigate = useNavigate();
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
      <div className={styles.header}>
        <p className={styles.namePageText}>Избранное</p>

        <div className={styles.headerButtons}>
          <div className={styles.backButton}>
            <img src={arrowBackIcon} alt="" />
          </div>
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
        <FavouriteProductCard />
        <FavouriteProductCard />
      </div>
      <BottomMenu />
    </div>
  );
};
export default FavouritesPage;
