import styles from "./adress.module.css";
import useWindowDimensions from "../hooks/windowDimensions";

import rightArrowGrayIcon from "../../images/arrow_select_gray.svg";
import geolocationIcon from "../../images/geo.svg";

const Adress = ({ adress = "ТЯК-Москва" }) => {
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
      <div>
        <p className={styles.headerText}>Как нас найти</p>
        <p className={styles.placeText}>Самовывоз: {adress}</p>
        <div className={styles.buttonAdress}>
          <p className={styles.buttonAdressText}>
            Адрес и подробный путеводитель
          </p>
          <img src={rightArrowGrayIcon} alt="" />
        </div>
      </div>
      <div className={styles.geoIcon}>
        <img src={geolocationIcon} alt="" />
      </div>
    </div>
  );
};

export default Adress;
