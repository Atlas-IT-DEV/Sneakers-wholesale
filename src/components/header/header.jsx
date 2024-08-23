import styles from "./header.module.css";
import telegramIcon from "../../images/logos_telegram.png";

const Header = ({
  image = "https://legacy.reactjs.org/logo-og.png",
  user = "Имя Фамилия",
  rank = "Новичок",
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.aboutUser}>
        <img src={image} alt="" className={styles.imageUser} />
        <div>
          <p className={styles.userValues}>{user}</p>
          <p className={styles.rankUser}>{rank}</p>
        </div>
      </div>
      <div className={styles.telegramButton}>
        <img src={telegramIcon} alt="" />
        <p>@REEDshopp</p>
      </div>
    </div>
  );
};

export default Header;
