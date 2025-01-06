import styles from "./filters.module.css";
import { useState } from "react";

import divLine from "../../images/div_line.svg";
import selectArrow from "../../images/arrow_select_white.svg";
import activeCheck from "../../images/active_check.svg";
import inActiveCheck from "../../images/inactive_check.svg";
import { useStores } from "../../store/store_context";
import { observer } from "mobx-react-lite";

const DropdownCompany = observer(({ chars = [] }) => {
  const { pageStore } = useStores();
  const [isVisible, setIsVisible] = useState(false);
  let copyIsVisible = isVisible;
  console.log(chars);
  return (
    <div className={styles.filterRow}>
      <div
        className={styles.filterButton}
        onClick={() => {
          copyIsVisible = !copyIsVisible;
          setIsVisible(copyIsVisible);
        }}
      >
        <p className={styles.filterNameText}>Бренд</p>
        <img
          src={selectArrow}
          alt=""
          className={isVisible ? styles.arrowClose : styles.arrowOpen}
        />
      </div>

      <div
        className={isVisible ? styles.subFiltersOpen : styles.subFiltersClose}
      >
        {chars.map((elem) => {
          return (
            <div
              className={styles.subFilterRow}
              onClick={() => {
                let copy_selected_companys = Array.from(
                  pageStore.selected_companys
                );
                if (pageStore.selected_companys.some((el) => el == elem)) {
                  copy_selected_companys = copy_selected_companys.filter(
                    (item) => item != elem
                  );
                } else {
                  copy_selected_companys.push(elem);
                }
                pageStore.updateSelectedCompanys(copy_selected_companys);
              }}
            >
              <img
                src={
                  pageStore.selected_companys.some((el) => el == elem)
                    ? activeCheck
                    : inActiveCheck
                }
                alt=""
              />
              <p className={styles.checkButtonText}>{elem}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default DropdownCompany;
