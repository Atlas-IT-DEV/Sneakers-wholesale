import styles from "./carousel_card.module.css";
import { Image } from "@chakra-ui/react";
import tiger from "./../../images/logo.png";

const CarouselCard = () => {
  return (
    <div className={styles.main_block}>
      <div className={styles.container}>
        <Image
          position={"absolute"}
          bottom={[-5, -7, -10, -10, -10]}
          src={tiger}
          width={"70%"}
          zIndex={0}
        />
        <p className={styles.nameCompany}>REED</p>
        <p className={styles.descriptionText}>
          Оптовые поставки лучших <br />
          кроссовок с премиальным <br />
          качеством
        </p>
        <p className={styles.subDescriptionText}>
          Ожидание и реальность совпадают!
        </p>
      </div>
    </div>
  );
};

export default CarouselCard;
