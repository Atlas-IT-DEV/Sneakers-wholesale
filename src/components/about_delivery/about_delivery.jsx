import styles from "./about_delivery.module.css";
import arrowRightIcon from "../../images/arrow_right_icon.svg";
import useWindowDimensions from "../hooks/windowDimensions";

const AboutDelivery = () => {
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
