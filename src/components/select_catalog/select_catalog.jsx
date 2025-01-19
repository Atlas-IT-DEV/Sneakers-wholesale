import useWindowDimensions from "../hooks/windowDimensions";
import { useNavigate } from "react-router";
import { useStores } from "../../store/store_context";
import { observer } from "mobx-react-lite";

import AttentionModal from "../modals/attention_modal/attenction_modal";

import styles from "./select_catalog.module.css";
import rightArrowWhiteIcon from "../../images/arrow_select_white.svg";

const SelectCatalog = observer(() => {
  const navigate = useNavigate();
  const { pageStore } = useStores();
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
      <p className={styles.nameText}>Каталог</p>
      <div className={styles.buttonsBlock}>
        <div
          className={`${styles.button} ${styles.activeButton}`}
          onClick={() => {
            pageStore.updateShopFormat(0);
            navigate("/catalog");
          }}
          style={{
            backgroundColor:
              pageStore.shop_format == 0 ? "rgb(227, 110, 0)" : null,
          }}
        >
          <p className={styles.buttonText}>Розничный магазин</p>
          <img src={rightArrowWhiteIcon} alt="" />
        </div>
        <div
          className={`${styles.button} ${styles.activeButton}`}
          onClick={() => {
            pageStore.updateShopFormat(1);
            navigate("/catalog");
          }}
          style={{
            backgroundColor:
              pageStore.shop_format == 1 ? "rgb(227, 110, 0)" : null,
          }}
        >
          <p className={styles.buttonText}>Оптовый магазин</p>
          <img src={rightArrowWhiteIcon} alt="" />
        </div>
        <AttentionModal name_button="Дропшиппинг" />
        {/* <AttentionModal name_button="Сборный опт" /> */}
        <div
          className={`${styles.button} ${styles.activeButton}`}
          onClick={() => {
            pageStore.updateShopFormat(3);
            navigate("/catalog");
          }}
          style={{
            backgroundColor:
              pageStore.shop_format == 3 ? "rgb(227, 110, 0)" : null,
          }}
        >
          <p className={styles.buttonText}>Сборный опт</p>
          <img src={rightArrowWhiteIcon} alt="" />
        </div>
      </div>
    </div>
  );
});

export default SelectCatalog;
