import useWindowDimensions from "../hooks/windowDimensions";
import styles from "./discount_card.module.css";

const DiscountCard = () => {
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
      <p className={styles.headerText}>Получите скидку 5%</p>
      <p className={styles.mainText}>
        При оформлении от 2-х позиций товаров вы получите скидку в размере 5%
      </p>
      <p className={styles.buttonText}>Условия акции</p>
    </div>
  );
};

export default DiscountCard;
