import useWindowDimensions from "../hooks/windowDimensions";
import styles from "./filters.module.css";

import divLine from "../../images/div_line.svg";
import selectArrow from "../../images/arrow_select_white.svg";

const Filters = () => {
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
      <p className={styles.priceText}>Цена</p>
      <div className={styles.priceFilter}>
        <input
          type="number"
          placeholder="min"
          className={styles.inputPriceFilter}
        />
        <img src={divLine} alt="" />
        <input
          type="number"
          placeholder="max"
          className={styles.inputPriceFilter}
        />
      </div>
      <div className={styles.mainFilters}>
        <div className={styles.divideLine} />
        <div className={styles.filterRow}>
          <p className={styles.filterNameText}>Бренд</p>
          <img src={selectArrow} alt="" />
        </div>
        <div className={styles.divideLine} />
        <div className={styles.filterRow}>
          <p className={styles.filterNameText}>Цвет</p>
          <img src={selectArrow} alt="" />
        </div>
        <div className={styles.divideLine} />
        <div className={styles.filterRow}>
          <p className={styles.filterNameText}>Размер</p>
          <img src={selectArrow} alt="" />
        </div>
        <div className={styles.divideLine} />
        <div className={styles.filterRow}>
          <p className={styles.filterNameText}>Сезон</p>
          <img src={selectArrow} alt="" />
        </div>
        <div className={styles.divideLine} />
        <div className={styles.filterRow}>
          <p className={styles.filterNameText}>Пол</p>
          <img src={selectArrow} alt="" />
        </div>
        <div className={styles.divideLine} />
        <div className={styles.filterRow}>
          <p className={styles.filterNameText}>Материал</p>
          <img src={selectArrow} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Filters;
