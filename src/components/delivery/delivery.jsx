import styles from "./delivery.module.css";
import arrowRightIcon from "../../images/arrow_right_icon.svg";
import useWindowDimensions from "../hooks/windowDimensions";

const Delivery = () => {
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
        <div className={styles.field}>
          <p className={styles.fieldText}>Доставка</p>
          <img src={arrowRightIcon} alt="" />
        </div>
        <p className={styles.statusDeliveryText}>Узнать статус заказа</p>
      </div>
      <div className={styles.divideLine}></div>
      <div className={styles.field}>
        <p className={styles.fieldText}>Покупки</p>
        <img src={arrowRightIcon} alt="" />
      </div>
    </div>
  );
};

export default Delivery;
