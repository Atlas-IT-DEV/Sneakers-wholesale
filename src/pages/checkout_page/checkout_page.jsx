import styles from "./checkout_page.module.css";
import arrowBackIcon from "../../images/arrow_back_icon.svg";
import sdekIcon from "../../images/sdek_icon.svg";
import plusIcon from "../../images/plus_orange_icon.svg";
import selectArrow from "../../images/arrow_light_gray.svg";

import { useNavigate } from "react-router";

const CheckoutPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.backButton} onClick={() => navigate(-1)}>
          <img src={arrowBackIcon} alt="" />
        </div>
        <p className={styles.namePageText}>Оформление заказа</p>
      </div>
      <div className={styles.delivery}>
        <p style={{ color: "white" }}>Доставка</p>
        <div className={styles.pickUpPoint}>
          <div className={styles.deliveryPoint}>
            <img src={sdekIcon} alt="" />
            <p>Выбрать пункт выдачи</p>
          </div>
          <img src={plusIcon} />
        </div>
        <div className={styles.shippingMethodButton}>
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
      <div></div>
    </div>
  );
};

export default CheckoutPage;
