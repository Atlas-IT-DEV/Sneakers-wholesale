import styles from "./adress.module.css";
import arrowRightIcon from "../../images/arrow_right.png";
import geolocationIcon from "../../images/geo.png";

const Adress = ({ adress = "ТЯК-Москва" }) => {
  return (
    <div className={styles.container}>
      <div>
        <p className={styles.headerText}>Как нас найти</p>
        <p className={styles.placeText}>Самовывоз: {adress}</p>
        <div className={styles.buttonAdress}>
          <p className={styles.buttonAdressText}>
            Адрес и подробный путеводитель
          </p>
          <img src={arrowRightIcon} alt="" />
        </div>
      </div>
      <img src={geolocationIcon} alt="" />
    </div>
  );
};

export default Adress;
