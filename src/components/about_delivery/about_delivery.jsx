import styles from "./about_delivery.module.css";
import arrowRightIcon from "../../images/arrow_right.png";

const AboutDelivery = () => {
  return (
    <div className={styles.container}>
      <div className={styles.field}>
        <p className={styles.fieldText}>Условия доставки</p>
        <img src={arrowRightIcon} alt="" />
      </div>
      <div className={styles.divideLine}></div>
      <div className={styles.field}>
        <p className={styles.fieldText}>Способы оплаты</p>
        <img src={arrowRightIcon} alt="" />
      </div>
    </div>
  );
};

export default AboutDelivery;
