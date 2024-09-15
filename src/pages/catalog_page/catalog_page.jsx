import BottomMenu from "../../components/bottom_menu/bottom_menu";
import ProductCard from "../../components/product_card.jsx/product_card";
import Categories from "../../components/categories/categories";
import styles from "./catalog_page.module.css";

import arrowBackIcon from "../../images/arrow_back_icon.svg";
import sortIcon from "../../images/sort_icon.svg";
import filterIcon from "../../images/filter_icon.svg";
import useWindowDimensions from "../../components/hooks/windowDimensions";
import { useNavigate } from "react-router";

const CatalogPage = () => {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
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
      <div className={styles.cateroriesField}>
        <Categories name_category="Категории" />
        <Categories name_category="Кроссовки" />
        <Categories name_category="Nike" />
        <Categories name_category="Adidas" />
      </div>
      <div className={styles.productsField}>
        <div className={styles.productRow}>
          <ProductCard model_name="Asics Gel Quantum Kinetic" />
          <ProductCard model_name=" Under Armour Hovr Phantom 3 SE Elevate" />
        </div>
        <div className={styles.productRow}>
          <ProductCard model_name=" Nike Air Jordan 5 Retro “Jade Horizon”" />
        </div>
      </div>
      <BottomMenu />
    </div>
  );
};

export default CatalogPage;
