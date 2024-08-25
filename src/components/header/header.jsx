import styles from "./header.module.css";
import telegramIcon from "../../images/telegram_icon.svg";
import useWindowDimensions from "../hooks/windowDimensions";

const Header = ({
  image = "https://legacy.reactjs.org/logo-og.png",
  user = "Имя Фамилия",
  rank = "Новичок",
}) => {
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
      <div className={styles.aboutUser}>
        <img src={image} alt="" className={styles.imageUser} />
        <div className={styles.attributes}>
          <p className={styles.userValues}>{user}</p>
          <p className={styles.rankUser}>{rank}</p>
        </div>
      </div>
      <a href="https://t.me/REEDshopp">
        <div className={styles.telegramButton}>
          <img src={telegramIcon} alt="" className={styles.tgIcon} />
          <p className={styles.telegramText}>@REEDshopp</p>
        </div>
      </a>
    </div>
  );
};

export default Header;
