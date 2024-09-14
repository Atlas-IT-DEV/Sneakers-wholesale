import useWindowDimensions from "../hooks/windowDimensions";
import styles from "./scores_card.module.css";
import ArrowOrange from "../../images/orange_arrow.svg";
import moneyIcon from "../../images/money_icon.svg";

const ScoresCard = () => {
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
      <div className={styles.headerButton}>
        <p className={styles.headerButtonText}>Баллы</p>
        <img src={ArrowOrange} alt="" />
      </div>
      <div className={styles.countRow}>
        <img src={moneyIcon} alt="" />
        <p>300</p>
      </div>
    </div>
  );
};

export default ScoresCard;
