import BottomMenu from "../../components/bottom_menu/bottom_menu";
import ProductCard from "../../components/product_card/product_card";
import Categories from "../../components/categories/categories";
import styles from "./catalog_page.module.css";

import arrowBackIcon from "../../images/arrow_back_icon.svg";
import sortIcon from "../../images/sort_icon.svg";
import filterIcon from "../../images/filter_icon.svg";
import useWindowDimensions from "../../components/hooks/windowDimensions";
import { useNavigate } from "react-router";
import { useStores } from "../../store/store_context";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useState } from "react";

const CatalogPage = observer(() => {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const { pageStore } = useStores();
  const formats = ["Розница", "Опт", "Сборный опт", "Дропшиппинг"];

  const tg = window?.Telegram?.WebApp;
  const backButton = tg?.BackButton;
  backButton?.show();
  const back_page = () => {
    navigate("/");
    backButton?.hide();
  };
  backButton?.onClick(back_page);

  useEffect(() => {
    console.log(pageStore.cart);
  }, pageStore?.cart);
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
        {/* <div className={styles.backButton} onClick={() => navigate("/")}>
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
      <div className={styles.cateroriesField}>
        {pageStore.companys.map((elem, index) => {
          return (
            <Categories key={index} name_category={elem?.name} id={elem?.id} />
          );
        })}
        {/* <Categories name_category="Категории" />
        <Categories name_category="Кроссовки" />
        <Categories name_category="Nike" />
        <Categories name_category="Adidas" /> */}
      </div>
      <div className={styles.products}>
        <div className={styles.productsField}>
          {pageStore.products
            .filter(
              (elem) => elem.type_product == formats[pageStore.shop_format]
            )
            .map((elem, index) => {
              return (
                <ProductCard
                  key={index}
                  price={elem.price}
                  model_name={elem.name}
                  countProduct=""
                  oldPrice={""}
                  obj={elem}
                />
              );
            })}
        </div>
      </div>
      <BottomMenu />
    </div>
  );
});

export default CatalogPage;
