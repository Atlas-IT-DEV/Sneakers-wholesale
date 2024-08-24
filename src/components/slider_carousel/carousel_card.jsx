import styles from "./carousel_card.module.css";

const CarouselCard = () => {
  return (
    <div className={styles.main_block}>
      <div className={styles.container}>
        <p className={styles.nameCompany}>REED</p>
        <p className={styles.descriptionText}>
          Оптовые поставки лучших <br />
          кроссовок с премиальным <br />
          качеством
        </p>
        <p className={styles.descriptionText}>
          Ожидание и реальность совпадают!
        </p>
      </div>
    </div>
  );
};

export default CarouselCard;
