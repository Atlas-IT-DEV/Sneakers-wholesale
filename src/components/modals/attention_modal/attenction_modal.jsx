import styles from "./attention_modal.module.css";

import close_icon from "../../../images/close_icon.svg";
import rightArrowIcon from "../../../images/arrow_right_icon.svg";

const AttentionModal = ({ name_section = "", sum = "" }) => {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.closeButton} >
          <img src={close_icon} alt="" />
        </div>
        <div className={styles.mainInfo}>
          <div>
            <p className={styles.mainText}>
              Чтобы получить доступ <br /> к разделу {name_section} <br />
              вам необходимо совершить <br />
              покупки на сумму
            </p>
            <p className={styles.sumText}>{sum} ₽</p>
          </div>
          <div className={styles.conditionsButton}>
            <p className={styles.conditionsText}>Ознакомиться с условиями</p>
            <img src={rightArrowIcon} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AttentionModal;
