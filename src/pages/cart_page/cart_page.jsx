import styles from "./cart_page.module.css";
import BottomMenu from "../../components/bottom_menu/bottom_menu";
import DiscountCard from "../../components/discount_card/discount_card";
import CartProductCard from "../../components/cart_product_card/cart_product_card";
import useWindowDimensions from "../../components/hooks/windowDimensions";

const CartPage = () => {
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
