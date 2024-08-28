import styles from "./cart_page.module.css";
import BottomMenu from "../../components/bottom_menu/bottom_menu";

const CartPage = () => {
  return (
    <div className={styles.container}>
      <header>
        <div className={styles.namePage}>
          <p className={styles.namePageText}>Корзина</p>
        </div>
        <div className={styles.selectButton}>
          <p className={styles.selectButtonText}>Выбрать</p>
        </div>
      </header>
      <BottomMenu />
    </div>
  );
};
export default CartPage;
