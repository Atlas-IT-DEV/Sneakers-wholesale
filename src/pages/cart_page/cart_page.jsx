import styles from "./cart_page.module.css";
import BottomMenu from "../../components/bottom_menu/bottom_menu";
import DiscountCard from "../../components/discount_card/discount_card";
import CartProductCard from "../../components/cart_product_card/cart_product_card";
import useWindowDimensions from "../../components/hooks/windowDimensions";
import { Navigation } from "swiper/modules";
import { useNavigate } from "react-router";
import { useEditable } from "@chakra-ui/react";
import { useEffect } from "react";
import { useStores } from "../../store/store_context";
import { observer } from "mobx-react-lite";

import no_photo from "./../../images/tiger_big_logo.jpg";

const CartPage = observer(() => {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const { pageStore } = useStores();
  const tg = window?.Telegram?.WebApp;
  const backButton = tg?.BackButton;
  backButton?.show();
  const back_page = () => {
    navigate("/");
    backButton?.hide();
  };
  backButton?.onClick(back_page);

  useEffect(() => {
    console.log("cart", pageStore.cart);
  }, [pageStore.cart]);

  const groupProducts = (items) => {
    return items.reduce((acc, product) => {
      const existingProduct = acc.find((item) => item.id === product.id);

      if (existingProduct) {
        // Увеличиваем счетчик, если товар уже существует
        existingProduct.quantity += 1;
      } else {
        // Добавляем новый товар с quantity = 1
        acc.push({ ...product, quantity: 1 });
      }

      return acc;
    }, []);
  };

  useEffect(() => {
    pageStore.updateCart(groupProducts(pageStore.cart));
  }, []);

  const increaseQuantity = (id) => {
    pageStore.updateCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    pageStore.updateCart(
      (prevCart) =>
        prevCart
          .map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
              : item
          )
          .filter((item) => item.quantity > 0) // Удалить товар, если quantity становится 0
    );
  };
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
        {pageStore.cart.length != 0 ? <DiscountCard /> : null}
      </div>
      <div className={styles.productContainer}>
        {pageStore?.cart.map((item, index) => {
          return (
            <CartProductCard
              key={index}
              brand={item?.company?.name}
              model={item?.name}
              type={item?.type_product}
              new_price={item?.price}
              image={item?.urls?.[0]?.url || no_photo}
              // count_product={item?.quantity}
              increase={increaseQuantity}
              decrease={decreaseQuantity}
            />
          );
        })}
      </div>
      <div
        style={
          pageStore?.cart.length == 0
            ? { cursor: "no-drop", backgroundColor: "rgba(140,0,0,1)" }
            : null
        }
        className={styles.orderButton}
        onClick={() =>
          pageStore.cart.length != 0 ? navigate("/checkout") : null
        }
      >
        <p className={styles.orderButtonText}>К оформлению</p>
        <p className={styles.detailsdOrderText}>
          {pageStore?.cart.length} шт, 18400₽
        </p>
      </div>
      <BottomMenu />
    </div>
  );
});
export default CartPage;
