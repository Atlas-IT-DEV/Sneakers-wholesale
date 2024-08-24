import styles from "./select_catalog.module.css";
import rightArrowIcon from "../../images/arrow_right_icon.svg";

const SelectCatalog = () => {
  return (
    <div className={styles.container}>
      <p className={styles.nameText}>Каталог</p>
      <div className={styles.buttonsBlock}>
        <div className={styles.buttonsRow}>
          <div className={`${styles.button} ${styles.activeButton}`}>
            <p className={styles.buttonText}>Розничный магазин</p>
            <img src={rightArrowIcon} alt="" />
          </div>
          <div className={`${styles.button} ${styles.activeButton}`}>
            <p className={styles.buttonText}>Оптовый магазин</p>
            <img src={rightArrowIcon} alt="" />
          </div>
        </div>
        <div className={styles.buttonsRow}>
          <div className={`${styles.button} ${styles.unActiveButton}`}>
            <p className={styles.buttonText}>Dropshipping</p>
            <img src={rightArrowIcon} alt="" />
          </div>
          <div className={`${styles.button} ${styles.unActiveButton}`}>
            <p className={styles.buttonText}>Сборный опт</p>
            <img src={rightArrowIcon} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectCatalog;
