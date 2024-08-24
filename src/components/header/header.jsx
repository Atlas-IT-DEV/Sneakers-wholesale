import styles from "./header.module.css";
import telegramIcon from "../../images/telegram_icon.svg";

const Header = ({
  image = "https://legacy.reactjs.org/logo-og.png",
  user = "Имя Фамилия",
  rank = "Новичок",
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.aboutUser}>
        <img src={image} alt="" className={styles.imageUser} />
        <div className={styles.attributes}>
          <p className={styles.userValues}>{user}</p>
          <p className={styles.rankUser}>{rank}</p>
        </div>
      </div>
      <a href="https://t.me/REEDshopp">
        <div className={styles.telegramButton}>
          <img src={telegramIcon} alt="" />
          <p className={styles.telegramText}>@REEDshopp</p>
        </div>
      </a>
    </div>
  );
};

export default Header;
