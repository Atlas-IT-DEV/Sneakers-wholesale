import styles from "./select_catalog.module.css";
import rightArrowWhiteIcon from "../../images/arrow_select_white.svg";
import rightArrowGrayIcon from "../../images/arrow_select_gray.svg";
import AttentionModal from "../modals/attention_modal/attenction_modal";
import { useState } from "react";
import useWindowDimensions from "../hooks/windowDimensions";

const SelectCatalog = () => {
  const [showModal, setShowModal] = useState(false);
  const [isActive, setIsActive] = useState([1, 0]);
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
      {showModal && (
        <AttentionModal
          name_section={isActive[0] == 1 ? "Дропшиппинг" : "Сборный опт"}
          sum={isActive[0] == 1 ? "62 000" : "99 000"}
        />
      )}
      <p className={styles.nameText}>Каталог</p>
      <div className={styles.buttonsBlock}>
        <div className={styles.buttonsRow}>
          <div className={`${styles.button} ${styles.activeButton}`}>
            <p className={styles.buttonText}>Розничный магазин</p>
            <img src={rightArrowWhiteIcon} alt="" />
          </div>
          <div className={`${styles.button} ${styles.activeButton}`}>
            <p className={styles.buttonText}>Оптовый магазин</p>
            <img src={rightArrowWhiteIcon} alt="" />
          </div>
        </div>
        <div className={styles.buttonsRow}>
          <div
            className={`${styles.button} ${styles.unActiveButton}`}
            onClick={() => {
              setIsActive([1, 0]);
              setShowModal(true);
            }}
          >
            <p className={styles.buttonText}>Дропшиппинг</p>
            <img src={rightArrowGrayIcon} alt="" />
          </div>
          <div
            className={`${styles.button} ${styles.unActiveButton}`}
            onClick={() => {
              setIsActive([0, 1]);
              setShowModal(true);
            }}
          >
            <p className={styles.buttonText}>Сборный опт</p>
            <img src={rightArrowGrayIcon} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectCatalog;
