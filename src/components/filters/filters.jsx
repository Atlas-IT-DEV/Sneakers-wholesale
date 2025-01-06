import useWindowDimensions from "../hooks/windowDimensions";
import styles from "./filters.module.css";
import { useState } from "react";

import divLine from "../../images/div_line.svg";
import selectArrow from "../../images/arrow_select_white.svg";
import activeCheck from "../../images/active_check.svg";
import inActiveCheck from "../../images/inactive_check.svg";
import { useStores } from "../../store/store_context";
import { observer } from "mobx-react-lite";
import DropdownChar from "./dropdown_char";
import DropdownCompany from "./dropdown_company";

const Filters = observer(() => {
  const { width } = useWindowDimensions();
  const { pageStore } = useStores();
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

  const groupedData = (data) => {
    return Object.values(
      data.reduce((acc, item) => {
        // Если группа с таким id еще не создана, создаем
        if (!acc[item.id]) {
          acc[item.id] = [];
        }
        // Проверяем уникальность value
        const isValueUnique = !acc[item.id].some(
          (el) => el.value === item.value
        );
        if (isValueUnique) {
          acc[item.id].push(item);
        }
        return acc;
      }, {})
    );
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
      <p className={styles.priceText}>Цена</p>
      <div className={styles.priceFilter}>
        <input
          type="number"
          placeholder="min"
          className={styles.inputPriceFilter}
          value={pageStore.min_max[0]}
          onChange={(e) => {
            let copy_min_max = Array.from(pageStore.min_max);
            copy_min_max[0] = e.target.value;
            pageStore.updateMinMax(copy_min_max);
          }}
          onSubmit={(e) => e.target.preventDefault()}
        />
        <img src={divLine} alt="" />
        <input
          type="number"
          placeholder="max"
          className={styles.inputPriceFilter}
          value={pageStore.min_max[1]}
          onChange={(e) => {
            let copy_min_max = Array.from(pageStore.min_max);
            copy_min_max[1] = e.target.value;
            pageStore.updateMinMax(copy_min_max);
          }}
          onSubmit={(e) => e.target.preventDefault()}
        />
      </div>
      <div className={styles.mainFilters}>
        <div className={styles.divideLine} />

        <DropdownCompany chars={pageStore.companys.map((elem) => elem.name)} />
        <div className={styles.divideLine} />
        {groupedData(
          pageStore.products.flatMap((elem) => elem.characteristics)
        ).map((el) => (
          <>
            <DropdownChar chars={el} name={el[0].name} />
            <div className={styles.divideLine} />
          </>
        ))}
      </div>
    </div>
  );
});

export default Filters;
