import { useState } from "react";
import { useStores } from "../../store/store_context";
import { observer } from "mobx-react-lite";

import styles from "./filters.module.css";
import selectArrow from "../../images/arrow_select_white.svg";
import activeCheck from "../../images/active_check.svg";
import inActiveCheck from "../../images/inactive_check.svg";

const DropdownChar = observer(({ chars = [], name = "" }) => {
  const { pageStore } = useStores();
  const [isVisible, setIsVisible] = useState(false);
  let copyIsVisible = isVisible;

  return (
    <div className={styles.filterRow}>
      <div
        className={styles.filterButton}
        onClick={() => {
          copyIsVisible = !copyIsVisible;
          setIsVisible(copyIsVisible);
        }}
      >
        <p className={styles.filterNameText}>{name}</p>
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
                let copy_selected_chars = Array.from(pageStore.selected_chars);
                if (
                  pageStore.selected_chars.some(
                    (el) => JSON.stringify(el) == JSON.stringify(elem)
                  )
                ) {
                  copy_selected_chars = copy_selected_chars.filter(
                    (item) => item.value != elem.value
                  );
                } else {
                  copy_selected_chars.push(elem);
                }
                pageStore.updateSelectedChars(copy_selected_chars);
              }}
            >
              <img
                src={
                  pageStore.selected_chars.some(
                    (el) => JSON.stringify(el) == JSON.stringify(elem)
                  )
                    ? activeCheck
                    : inActiveCheck
                }
                alt=""
              />
              <p className={styles.checkButtonText}>{elem.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default DropdownChar;
