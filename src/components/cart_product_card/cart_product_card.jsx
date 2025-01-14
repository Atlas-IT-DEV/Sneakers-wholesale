import styles from "./cart_product_card.module.css";
import minusIcon from "../../images/minus_icon.svg";
import plusIcon from "../../images/plus_icon.svg";
import settingProductIcon from "../../images/setting_product_icon.svg";
import { useState } from "react";
import useWindowDimensions from "../hooks/windowDimensions";
import {
  Button,
  HStack,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  position,
  VStack,
} from "@chakra-ui/react";
import { useStores } from "../../store/store_context";

const CartProductCard = ({
  brand = "Asics",
  model = "Gel Quantum Kinetic",
  count = "8 пар",
  type = "опт",
  size = 38,
  price = 18400,
  new_price = 12000,
  image = "https://legacy.reactjs.org/logo-og.png",
  count_product,
  onChangeQuantity,
  obj,
}) => {
  const { width } = useWindowDimensions();

  const { pageStore } = useStores();

  const removeProduct = (id, size) => {
    console.log("size", size, id);
    console.log(pageStore.cart);
    let copy_cart = Array.from(pageStore.cart);
    pageStore.updateCart(
      copy_cart.filter((elem) => !(elem.id === id && elem.size === size))
    );
    // pageStore.updateCart((prevProducts) =>
    //   prevProducts.filter((elem) => !(elem.id === id && elem.size === size))
    // ); prevProducts это текущее состояние которое записано в мобиксе,
    // НО сам превпродуктс передается в функцию в качестве аргумента,
    // что автоматом означает что у нас внутри стрелочной функции меняется область видимости и очевидно не в нашу пользу
    // поэтому лучше такой конструкцией не пользуйся ибо можешь запутаться как сейчас и проебать много времени
    //  либо явно передавай в стрелочную функцию нужные аргументы
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
      <div className={styles.productImage}>
        <img src={image} alt="" />
      </div>
      <div className={styles.aboutProduct}>
        <p className={styles.brandText}>{brand}</p>
        <p className={styles.modelText}>{model}</p>
        <p className={styles.countText}>
          {count} ({type})
        </p>
        <div className={styles.sizeField}>
          <p className={styles.sizeAttributeText}>Размер:</p>
          <p className={styles.sizeText}>{size}</p>
        </div>
        <div className={styles.countProduct}>
          <div
            className={
              obj?.quantity == 1
                ? styles.countUnactiveButton
                : styles.countActiveButton
            }
            onClick={() => {
              if (obj?.quantity != 1) {
                let copy_cart = Array.from(pageStore.cart);

                const index = copy_cart.findLastIndex(
                  (object) => object?.id == obj?.id
                );
                if (index != -1) {
                  copy_cart.splice(index, 1);
                }
                pageStore.updateCart(copy_cart);
              }
            }}
          >
            <img src={minusIcon} alt="" />
          </div>
          <p className={styles.countProductText}>{count_product}</p>
          <div
            className={`${styles.countActiveButton}`}
            onClick={() => {
              let copy_cart = Array.from(pageStore.cart);
              copy_cart.push(obj);
              pageStore.updateCart(copy_cart);
            }}
          >
            <img src={plusIcon} alt="" />
          </div>
        </div>
        <div className={styles.priceProduct}>
          <p className={styles.newPriceText}>
            {parseInt(new_price) * parseInt(count_product)} ₽
          </p>
        </div>
      </div>

      <Popover strategy="absolute" placement="auto">
        <PopoverTrigger>
          <div className={styles.settingsButton}>
            <img
              src={settingProductIcon}
              alt=""
              width={["20px", "20px", "22px", "24px", "26px", "28px", "30px"]}
              height={["20px", "20px", "22px", "24px", "26px", "28px", "30px"]}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent
          bgColor={"rgba(30,30,30,1)"}
          border={"1px solid #db6900"}
          width={"220px"}
          padding={"5px"}
        >
          <PopoverBody>
            <VStack>
              <HStack>
                <Input
                  placeholder="Введите количество"
                  border={"1px solid #db6900"}
                  color={"white"}
                  inputMode="numeric"
                  onChange={(e) => onChangeQuantity(e.target.value)}
                />
              </HStack>

              <Button
                backgroundColor={"rgba(200,0,0,1)"}
                color={"white"}
                _hover={{
                  color: "black",
                  backgroundColor: "rgba(205,205,205,1)",
                }}
                onClick={() => {
                  console.log(obj);
                  removeProduct(obj.id, obj.size);
                }}
              >
                Убрать из корзины
              </Button>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CartProductCard;
