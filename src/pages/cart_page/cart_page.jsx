import useWindowDimensions from "../../components/hooks/windowDimensions";
import { useNavigate } from "react-router";
import { Text } from "@chakra-ui/react";
import { useStores } from "../../store/store_context";
import { observer } from "mobx-react-lite";

import BottomMenu from "../../components/bottom_menu/bottom_menu";
import CartProductCard from "../../components/cart_product_card/cart_product_card";

import styles from "./cart_page.module.css";
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

  const combineProducts = (products) => {
    return products.reduce((acc, product) => {
      const existingProduct = acc.find(
        (item) => item.id === product.id && item.size === product.size
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        acc.push({ ...product, quantity: 1 });
      }
      return acc;
    }, []);
  };

  const changeQuantity = (value, obj, id, size) => {
    if (value <= 0) return;
    let copy_cart = Array.from(pageStore.cart);
    pageStore.updateCart(
      copy_cart.filter((item) => !(item.id == id && item.size == size))
    );
    copy_cart = Array.from(pageStore.cart);

    for (let i = 0; i < value; i++) {
      copy_cart.unshift(obj);
    }
    pageStore.updateCart(copy_cart);
  };

  const countSumCart = () => {
    const sumCart = pageStore.cart.map((item) => {
      let sum = 0;
      sum += parseInt(item?.price);
      return sum;
    });

    let priceCart = 0;
    sumCart.forEach((x) => (priceCart += x));

    return priceCart;
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
      </div>
      <div className={styles.productContainer}>
        {pageStore.cart.length != 0 ? (
          combineProducts(pageStore.cart)
            .sort((a, b) => {
              // Сравнение по name (лексикографическое сравнение)
              const nameComparison = a.name.localeCompare(b.name);
              if (nameComparison !== 0) {
                return nameComparison;
              }
              // Если name одинаковый, сравниваем по size (числовое сравнение)
              return parseInt(a.size, 10) - parseInt(b.size, 10);
            })
            .map((item, index) => {
              return (
                <CartProductCard
                  key={index}
                  brand={item?.company?.name}
                  model={item?.name}
                  type={item?.type_product}
                  new_price={item?.price}
                  image={item?.urls?.[0]?.url || no_photo}
                  count_product={item?.quantity}
                  obj={item}
                  idx={index}
                  size={item?.size}
                  onChangeQuantity={(value) =>
                    changeQuantity(value, item, item?.id, item?.size)
                  }
                />
              );
            })
        ) : (
          <Text
            color={"white"}
            textAlign={"center"}
            marginTop={"20px"}
            fontWeight={600}
            fontSize={"20px"}
          >
            Корзина пуста
          </Text>
        )}
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
          {pageStore?.cart.length} шт,{" "}
          {pageStore.cart.length != 0 ? countSumCart() : 0} ₽
        </p>
      </div>
      <BottomMenu />
    </div>
  );
});
export default CartPage;
