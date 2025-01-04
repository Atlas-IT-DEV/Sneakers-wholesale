import styles from "./checkout_page.module.css";
import arrowBackIcon from "../../images/arrow_back_icon.svg";
import sdekIcon from "../../images/sdek_icon.svg";
import plusIcon from "../../images/plus_orange_icon.svg";
import selectArrow from "../../images/arrow_light_gray.svg";
import mirIcon from "../../images/mir_icon.svg";

import { useNavigate } from "react-router";
import useWindowDimensions from "../../components/hooks/windowDimensions";

const CheckoutPage = ({ count = 2 }) => {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();

  const tg = window?.Telegram?.WebApp;
  const backButton = tg?.BackButton;
  backButton?.show();
  const back_page = () => {
    navigate("/cart_page");
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
        {/* <div className={styles.backButton} onClick={() => navigate(-1)}>
          <img src={arrowBackIcon} alt="" />
        </div> */}
        <p className={styles.namePageText}>Оформление заказа</p>
      </div>
      <div className={styles.view}>
        <p className={styles.headerView}>Доставка</p>
        <div className={styles.selectButton}>
          <div className={styles.contentView}>
            <img src={sdekIcon} alt="" />
            <p>Выбрать пункт выдачи</p>
          </div>
          <img src={plusIcon} />
        </div>
        <div className={styles.methodButton}>
          <p>Все способы доставки</p>
          <img src={selectArrow} alt="" />
        </div>
      </div>
      <div className={styles.products}>
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
      </div>
      <div className={`${styles.view} ${styles.payment}`}>
        <p className={styles.headerView}>Способ оплаты</p>
        <div className={styles.selectButton}>
          <div className={styles.contentView}>
            <img src={mirIcon} alt="" />
            <p>Привязать карту</p>
          </div>
          <img src={plusIcon} />
        </div>
        <div className={styles.methodButton}>
          <p>Все способы оплаты</p>
          <img src={selectArrow} alt="" />
        </div>
      </div>
      <div className={styles.divLine} />
      <div className={styles.totalView}>
        <p className={`${styles.attributeTotal} ${styles.totalText}`}>Итого</p>
        <p className={`${styles.valueTotal} ${styles.totalText}`}>18400₽</p>
      </div>
      <div className={styles.descriptionView}>
        <div className={styles.viewTotal}>
          <p className={`${styles.descAttrTotal} ${styles.descText}`}>
            {count} товара на сумму
          </p>
          <p className={`${styles.descValueTotal} ${styles.descText}`}>
            18400₽
          </p>
        </div>
        <div className={styles.viewTotal}>
          <p className={`${styles.descAttrTotal} ${styles.descText}`}>Скидка</p>
          <p className={`${styles.descValueTotal} ${styles.descText}`}>
            -18400₽
          </p>
        </div>
        <div className={styles.viewTotal}>
          <p className={`${styles.descAttrTotal} ${styles.descText}`}>
            Доставка
          </p>
          <p className={`${styles.descValueTotal} ${styles.descText}`}>
            Бесплатно
          </p>
        </div>
      </div>
      <div className={styles.orderButton}>
        <p className={styles.orderButtonText}>Заказать</p>
        <div className={styles.prices}>
          <p className={`${styles.oldPriceText} ${styles.priceText}`}>18500₽</p>
          <p className={`${styles.newPriceText} ${styles.priceText}`}>18500₽</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
