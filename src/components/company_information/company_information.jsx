import styles from "./company_information.module.css";
import arrowRightIcon from "../../images/arrow_right_icon.svg";

const CompanyInformation = () => {
  return (
    <div className={styles.container}>
      <div className={styles.field}>
        <p className={styles.fieldText}>Отзывы</p>
        <img src={arrowRightIcon} alt="" />
      </div>
      <div className={styles.divideLine}></div>
      <div className={styles.field}>
        <p className={styles.fieldText}>Контакты</p>
        <img src={arrowRightIcon} alt="" />
      </div>
      <div className={styles.divideLine}></div>
      <div>
        <div className={styles.field}>
          <p className={styles.fieldText}>FAQ</p>
          <img src={arrowRightIcon} alt="" />
        </div>
        <p className={styles.aboutFaqtext}>
          Ответы на часто задаваемые вопросы
        </p>
      </div>
    </div>
  );
};

export default CompanyInformation;
