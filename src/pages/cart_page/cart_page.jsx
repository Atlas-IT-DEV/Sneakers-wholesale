import useWindowDimensions from "../../components/hooks/windowDimensions";
import { useNavigate } from "react-router";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { useStores } from "../../store/store_context";
import { observer } from "mobx-react-lite";

import BottomMenu from "../../components/bottom_menu/bottom_menu";
import CartProductCard from "../../components/cart_product_card/cart_product_card";

import styles from "./cart_page.module.css";
import no_photo from "./../../images/tiger_big_logo.jpg";
import { useEffect, useState } from "react";

const CartPage = observer(() => {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const { pageStore } = useStores();

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

  const countSumRoznCart = () => {
    const sumCart = pageStore.cart
      .filter((item) => item?.type_product == "Розница")
      .map((item) => {
        let sum = 0;
        sum += parseInt(item?.price);
        return sum;
      });

    let priceCart = 0;
    sumCart.forEach((x) => (priceCart += x));

    return priceCart;
  };

  const countSumOptCart = () => {
    const sumCart = pageStore.cart
      .filter((item) => item?.type_product == "Опт")
      .map((item) => {
        let sum = 0;
        sum += parseInt(item?.price);
        return sum;
      });

    let priceCart = 0;
    sumCart.forEach((x) => (priceCart += x));

    return priceCart;
  };

  const [optConfig, setConfig] = useState({});

  const originalInCart = pageStore.cart
    .filter((item) => item.type_product == "Опт")
    .some((item) => item?.is_original);

  const replicaInCart = pageStore.cart
    .filter((item) => item.type_product == "Опт")
    .some((item) => !item?.is_original);

  const getConfigById = async () => {
    const response = await fetch(`https://reedshop.ru:8000/opt_config/1`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    const result = await response.json();
    setConfig(result);
  };

  useEffect(() => {
    getConfigById();
  }, []);

  console.log("opt", optConfig);

  console.log("cart", pageStore.cart);

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
      <div className={styles.discountContainer}>
        {/* Блок с информацией о скидке */}
        {/* {pageStore.cart.length != 0 ? <DiscountCard /> : null} */}
      </div>
      {pageStore.shop_format == 1 && (
        <VStack
          width={"100%"}
          color={"white"}
          padding={"0 10px"}
          marginTop={"10px"}
        >
          <Text>
            <strong>ВАЖНО:</strong> <br />
            1. Для покупки ОРИГИНАЛЬНЫХ товаров оптом необходимо набрать корзину
            на сумму {parseInt(optConfig?.original_sum)}₽ <br />
            2. Для покупки товаров-РЕПЛИКИ оптом необходимо набрать корзину на
            сумму {parseInt(optConfig?.replica_sum)}₽
          </Text>
        </VStack>
      )}

      <div className={styles.productContainer}>
        {pageStore.shop_format == 0 ? (
          pageStore.cart.filter((item) => item.type_product == "Розница")
            .length != 0 ? (
            combineProducts(pageStore.cart)
              .filter((item) => item?.type_product == "Розница")
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
                    image={item?.urls?.[0] || no_photo}
                    count_product={item?.quantity}
                    obj={item}
                    idx={index}
                    size={item?.size}
                    // onChangeQuantity={(value) =>
                    //   changeQuantity(value, item, item?.id, item?.size)
                    // }
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
              Розничная корзина пуста
            </Text>
          )
        ) : pageStore.cart.filter((item) => item?.type_product == "Опт")
            .length != 0 ? (
          combineProducts(pageStore.cart)
            .filter((item) => item?.type_product == "Опт")
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
                  // onChangeQuantity={(value) =>
                  //   changeQuantity(value, item, item?.id, item?.size)
                  // }
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
            Оптовая корзина пуста
          </Text>
        )}
      </div>
      {pageStore.shop_format == 0 ? (
        <div
          style={
            parseInt(countSumRoznCart()) == 0
              ? { cursor: "no-drop", backgroundColor: "rgba(140,0,0,1)" }
              : null
          }
          className={styles.orderButton}
          onClick={() => {
            if (parseInt(countSumRoznCart()) > 0) {
              navigate("/checkout");
            }
          }}
        >
          <p className={styles.orderButtonText}>К оформлению</p>
          <p className={styles.detailsdOrderText}>
            {
              pageStore?.cart.filter((item) => item.type_product == "Розница")
                .length
            }{" "}
            шт, {countSumRoznCart()} ₽
          </p>
        </div>
      ) : pageStore.shop_format == 1 && originalInCart ? (
        <div
          style={
            parseInt(countSumOptCart()) < parseInt(optConfig?.original_sum)
              ? { cursor: "no-drop", backgroundColor: "rgba(140,0,0,1)" }
              : null
          }
          className={styles.orderButton}
          onClick={() => {
            if (
              parseInt(countSumOptCart()) >= parseInt(optConfig?.original_sum)
            ) {
              navigate("/checkout");
            }
          }}
        >
          <p className={styles.orderButtonText}>К оформлению</p>
          <p className={styles.detailsdOrderText}>
            {
              pageStore?.cart.filter((item) => item.type_product == "Опт")
                .length
            }{" "}
            шт, {countSumOptCart()} ₽
          </p>
        </div>
      ) : pageStore.shop_format == 1 && replicaInCart ? (
        <div
          style={
            parseInt(countSumOptCart()) < parseInt(optConfig?.replica_sum)
              ? { cursor: "no-drop", backgroundColor: "rgba(140,0,0,1)" }
              : null
          }
          className={styles.orderButton}
          onClick={() => {
            if (
              parseInt(countSumOptCart()) >= parseInt(optConfig?.replica_sum)
            ) {
              navigate("/checkout");
            }
          }}
        >
          <p className={styles.orderButtonText}>К оформлению</p>
          <p className={styles.detailsdOrderText}>
            {
              pageStore?.cart.filter((item) => item.type_product == "Опт")
                .length
            }{" "}
            шт, {countSumOptCart()} ₽
          </p>
        </div>
      ) : (
        <div
          style={{ cursor: "no-drop", backgroundColor: "rgba(140,0,0,1)" }}
          className={styles.orderButton}
        >
          <p className={styles.orderButtonText}>К оформлению</p>
          <p className={styles.detailsdOrderText}>0 шт, 0 ₽</p>
        </div>
      )}
      <BottomMenu />
    </div>
  );
});
export default CartPage;
