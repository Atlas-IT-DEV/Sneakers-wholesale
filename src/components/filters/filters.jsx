import useWindowDimensions from "../hooks/windowDimensions";
import styles from "./filters.module.css";

import divLine from "../../images/div_line.svg";
import selectArrow from "../../images/arrow_select_white.svg";
import { useState } from "react";

const Filters = () => {
  const { width } = useWindowDimensions();
  const [isVisible, setIsVisible] = useState([
    [false, false, false, false, false, false],
    [false, false],
    [false, false],
    [false, false],
    [false, false],
    [false, false],
    [false, false],
  ]);
  let copyIsVisible = Array.from(isVisible);
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
          <div
            className={styles.filterButton}
            onClick={() => {
              copyIsVisible[0][0] = !copyIsVisible[0][0];
              setIsVisible(copyIsVisible);
            }}
          >
            <p className={styles.filterNameText}>Бренд</p>
            <img
              src={selectArrow}
              alt=""
              className={isVisible[0][0] ? styles.arrowClose : styles.arrowOpen}
            />
          </div>

          <div
            className={
              isVisible[0][0] ? styles.subFiltersOpen : styles.subFiltersClose
            }
          >
            <div
              className={styles.subFilterRow}
              onClick={() => {
                copyIsVisible[1][0] = !copyIsVisible[1][0];
                setIsVisible(copyIsVisible);
              }}
            >
              <div className={`${styles.checkButton} `} />
              <p className={styles.checkButtonText}>Adidas</p>
            </div>
            <div className={styles.subFilterRow}>
              <div className={styles.checkButton} />
              <p className={styles.checkButtonText}>Nike</p>
            </div>
          </div>
        </div>
        <div className={styles.divideLine} />
        <div className={styles.filterRow}>
          <div
            className={styles.filterButton}
            onClick={() => {
              copyIsVisible[0][1] = !copyIsVisible[0][1];
              setIsVisible(copyIsVisible);
            }}
          >
            <p className={styles.filterNameText}>Цвет</p>
            <img
              src={selectArrow}
              alt=""
              className={isVisible[0][1] ? styles.arrowClose : styles.arrowOpen}
            />
          </div>
          <div
            className={
              isVisible[0][1] ? styles.subFiltersOpen : styles.subFiltersClose
            }
          >
            <div className={styles.subFilterRow}>
              <div className={styles.checkButton} />
              <p className={styles.checkButtonText}>Белый</p>
            </div>
            <div className={styles.subFilterRow}>
              <div className={styles.checkButton} />
              <p className={styles.checkButtonText}>Черный</p>
            </div>
          </div>
        </div>
        <div className={styles.divideLine} />
        <div className={styles.filterRow}>
          <div
            className={styles.filterButton}
            onClick={() => {
              copyIsVisible[0][2] = !copyIsVisible[0][2];
              setIsVisible(copyIsVisible);
            }}
          >
            <p className={styles.filterNameText}>Размер</p>
            <img
              src={selectArrow}
              alt=""
              className={isVisible[0][2] ? styles.arrowClose : styles.arrowOpen}
            />
          </div>
          <div
            className={
              isVisible[0][2] ? styles.subFiltersOpen : styles.subFiltersClose
            }
          >
            <div className={styles.subFilterRow}>
              <div className={styles.checkButton} />
              <p className={styles.checkButtonText}>42</p>
            </div>
            <div className={styles.subFilterRow}>
              <div className={styles.checkButton} />
              <p className={styles.checkButtonText}>43</p>
            </div>
          </div>
        </div>
        <div className={styles.divideLine} />
        <div className={styles.filterRow}>
          <div
            className={styles.filterButton}
            onClick={() => {
              copyIsVisible[0][3] = !copyIsVisible[0][3];
              setIsVisible(copyIsVisible);
            }}
          >
            <p className={styles.filterNameText}>Сезон</p>
            <img
              src={selectArrow}
              alt=""
              className={isVisible[0][3] ? styles.arrowClose : styles.arrowOpen}
            />
          </div>
          <div
            className={
              isVisible[0][3] ? styles.subFiltersOpen : styles.subFiltersClose
            }
          >
            <div className={styles.subFilterRow}>
              <div className={styles.checkButton} />
              <p className={styles.checkButtonText}>Лето</p>
            </div>
            <div className={styles.subFilterRow}>
              <div className={styles.checkButton} />
              <p className={styles.checkButtonText}>Зима</p>
            </div>
          </div>
        </div>
        <div className={styles.divideLine} />
        <div className={styles.filterRow}>
          <div
            className={styles.filterButton}
            onClick={() => {
              copyIsVisible[0][4] = !copyIsVisible[0][4];
              setIsVisible(copyIsVisible);
            }}
          >
            <p className={styles.filterNameText}>Пол</p>
            <img
              src={selectArrow}
              alt=""
              className={isVisible[0][4] ? styles.arrowClose : styles.arrowOpen}
            />
          </div>
          <div
            className={
              isVisible[0][4] ? styles.subFiltersOpen : styles.subFiltersClose
            }
          >
            <div className={styles.subFilterRow}>
              <div className={styles.checkButton} />
              <p className={styles.checkButtonText}>Мужское</p>
            </div>
            <div className={styles.subFilterRow}>
              <div className={styles.checkButton} />
              <p className={styles.checkButtonText}>Женское</p>
            </div>
          </div>
        </div>
        <div className={styles.divideLine} />
        <div className={styles.filterRow}>
          <div
            className={styles.filterButton}
            onClick={() => {
              copyIsVisible[0][5] = !copyIsVisible[0][5];
              setIsVisible(copyIsVisible);
            }}
          >
            <p className={styles.filterNameText}>Материал</p>
            <img
              src={selectArrow}
              alt=""
              className={isVisible[0][5] ? styles.arrowClose : styles.arrowOpen}
            />
          </div>
          <div
            className={
              isVisible[0][5] ? styles.subFiltersOpen : styles.subFiltersClose
            }
          >
            <div className={styles.subFilterRow}>
              <div className={styles.checkButton} />
              <p className={styles.checkButtonText}>Полиэстер</p>
            </div>
            <div className={styles.subFilterRow}>
              <div className={styles.checkButton} />
              <p className={styles.checkButtonText}>Хлопок</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
