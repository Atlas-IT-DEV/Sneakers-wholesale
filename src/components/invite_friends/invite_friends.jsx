import useWindowDimensions from "../hooks/windowDimensions";

import styles from "./invite_friends.module.css";
import rightArrowWhiteIcon from "../../images/arrow_select_white.svg";

const InviteFriends = () => {
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
        <p className={styles.headerButtonText}>Зови друзей</p>
        <img src={rightArrowWhiteIcon} alt="" />
      </div>
      <p className={styles.mainText}>
        Дарим по <span>500₽</span> тебе и приглашенному другу
      </p>
    </div>
  );
};

export default InviteFriends;
