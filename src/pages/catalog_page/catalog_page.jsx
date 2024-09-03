import BottomMenu from "../../components/bottom_menu/bottom_menu";
import ProductCard from "../../components/product_card.jsx/product_card";
import Categories from "../../components/categories/categories";
import styles from "./catalog_page.module.css";

import arrowBackIcon from "../../images/arrow_back_icon.svg";
import sortIcon from "../../images/sort_icon.svg";
import filterIcon from "../../images/filter_icon.svg";

const CatalogPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.backButton}>
          <img src={arrowBackIcon} alt="" />
        </div>
        <form className={styles.searchField}>
          <input type="search" placeholder="Найти" />
        </form>
        <div className={styles.sortButton}>
          <img src={sortIcon} alt="" />
        </div>
        <div className={styles.filterButton}>
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
          <ProductCard />
          <ProductCard />
        </div>
        <div className={styles.productRow}>
          <ProductCard />
          {/* <ProductCard /> */}
        </div>
      </div>
      <BottomMenu />
    </div>
  );
};

export default CatalogPage;
