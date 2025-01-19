import useWindowDimensions from "../../components/hooks/windowDimensions";
import { useState } from "react";
import { useNavigate } from "react-router";

import styles from "./profile_page.module.css";
import telegramIcon from "../../images/telegram_icon.svg";
import arrowWhite from "../../images/arrow_select_white.svg";

const ProfilePage = ({ rank = "Бронза" }) => {
  const { width } = useWindowDimensions();
  const [open, setOpen] = useState(false);

  const tg = window?.Telegram?.WebApp;

  const navigate = useNavigate();
  const backButton = tg?.BackButton;
  backButton?.show();
  const back_page = () => {
    navigate("/");
    backButton?.hide();
  };
  backButton?.onClick(back_page);
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
      <div className={styles.header}>
        <div className={styles.aboutUser}>
          <img
            src={
              tg.initDataUnsafe?.user?.photo_url ||
              "https://legacy.reactjs.org/logo-og.png"
            }
            alt=""
            className={styles.imageUser}
          />
          <div className={styles.attributes}>
            <div className={styles.userButton}>
              <p className={styles.userValues}>
                {tg.initDataUnsafe?.user?.first_name}
                {tg.initDataUnsafe?.user?.last_name}
              </p>
            </div>
          </div>
        </div>
        <a href="https://t.me/REEDshopp">
          <div className={styles.telegramButton}>
            <img src={telegramIcon} alt="" className={styles.tgIcon} />
            <p className={styles.telegramText}>@REEDshopp</p>
          </div>
        </a>
      </div>
      <p
        className={`${styles.rankUser} ${
          rank == "Бронза"
            ? styles.bronzeRank
            : rank == "Серебро"
            ? styles.silverRank
            : rank == "Золото"
            ? styles.goldRank
            : null
        }`}
      >
        {rank}
      </p>
      <p className={styles.discountText}>Скидка — 5%</p>
      <div className={styles.countPurchase}>
        <p>
          Вы совершили <span>3</span> покупки на сумму <span>83 342 ₽</span>
        </p>
        <p>
          Чтобы получить статус «Серебро» осталось совершить покупки на сумму{" "}
          <span>92 402 ₽</span>
        </p>
      </div>
      <div className={styles.loyalityProgram}>
        <div className={styles.headerLoyality} onClick={() => setOpen(!open)}>
          <p>Программа лояльности</p>
          <img
            src={arrowWhite}
            alt=""
            className={open ? styles.arrowOpen : styles.arrowClose}
          />
        </div>
        <div className={open ? styles.subFiltersOpen : styles.subFiltersClose}>
          <div className={styles.statusLoyality}>
            <div>
              <div className={styles.headerStatus}>
                <p className={`${styles.statusText}`}>
                  Статус первого уровня «Бронза»
                </p>
                <p className={`${styles.statusText}`}>5%</p>
              </div>
              <p className={`${styles.statusText} ${styles.sumText}`}>
                15 000 ₽ - 62 000 ₽
              </p>
            </div>

            <div>
              <div className={styles.headerStatus}>
                <p className={`${styles.statusText}`}>
                  Статус второго уровня «Серебро»
                </p>
                <p className={`${styles.statusText}`}>10%</p>
              </div>
              <p className={`${styles.statusText} ${styles.sumText}`}>
                15 000 ₽ - 62 000 ₽
              </p>
            </div>

            <div>
              <div className={styles.headerStatus}>
                <p className={`${styles.statusText}`}>
                  Статус первого уровня «Золото»
                </p>
                <p className={`${styles.statusText}`}>15%</p>
              </div>
              <p className={`${styles.statusText} ${styles.sumText}`}>
                15 000 ₽ - 62 000 ₽
              </p>
            </div>
          </div>
          <p className={styles.rulesText}>Правила программы лояльности</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
