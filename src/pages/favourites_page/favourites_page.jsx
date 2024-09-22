import BottomMenu from "../../components/bottom_menu/bottom_menu";
import styles from "./favourite_page.module.css";

import arrowBackIcon from "../../images/arrow_back_icon.svg";
import sortIcon from "../../images/sort_icon.svg";
import filterIcon from "../../images/filter_icon.svg";
import { useNavigate } from "react-router";
import SelectCatalog from "../../components/select_catalog/select_catalog";
import FavouriteProductCard from "../../components/favourite_product_card/favourite_product_card";

const FavouritesPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
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
