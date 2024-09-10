import styles from "./cart_page.module.css";
import BottomMenu from "../../components/bottom_menu/bottom_menu";
import DiscountCard from "../../components/discount_card/discount_card";
import CartProductCard from "../../components/cart_product_card/cart_product_card";

const CartPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.namePageText}>Корзина</p>
        <div className={styles.selectButton}>
          <p className={styles.selectButtonText}>Выбрать</p>
        </div>
      </div>
      <div className={styles.discountContainer}>
        <DiscountCard />
      </div>
      <div className={styles.productContainer}>
        <CartProductCard />
        <CartProductCard />
        <CartProductCard />
      </div>
      <div className={styles.orderButton}>
        <p className={styles.orderButtonText}>К оформлению</p>
        <p className={styles.detailsdOrderText}>2шт, 18400₽</p>
      </div>
      <BottomMenu />
    </div>
  );
};
export default CartPage;
