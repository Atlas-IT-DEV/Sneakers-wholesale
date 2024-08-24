import styles from "./delivery.module.css";
import arrowRightIcon from "../../images/arrow_right.png";

const Delivery = () => {
  return (
    <div className={styles.container}>
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
