import styles from "./discount_card.module.css";

const DiscountCard = () => {
  return (
    <div className={styles.container}>
      <p className={styles.headerText}>Получите скидку 5%</p>
      <p className={styles.mainText}>
        При оформлении от 2-х позиций товаров вы получите скидку в размере 5%
      </p>
      <p className={styles.buttonText}>Условия акции</p>
    </div>
  );
};

export default DiscountCard;
