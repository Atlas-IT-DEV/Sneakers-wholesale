import styles from "./checkout_page.module.css";
// import arrowBackIcon from "../../images/arrow_back_icon.svg";
import sdekIcon from "../../images/sdek_icon.svg";
// import plusIcon from "../../images/plus_orange_icon.svg";
import selectArrow from "../../images/arrow_light_gray.svg";
// import mirIcon from "../../images/mir_icon.svg";
import no_photo from "./../../images/tiger_big_logo.jpg";
import pochtaIcon from "./../../images/pochta.svg";

import { useNavigate } from "react-router";
import useWindowDimensions from "../../components/hooks/windowDimensions";
import { useStores } from "../../store/store_context";
import {
  HStack,
  Image,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const CheckoutPage = ({ count = 2 }) => {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();

  const tg = window?.Telegram?.WebApp;
  const backButton = tg?.BackButton;
  backButton?.show();
  const back_page = () => {
    navigate("/cart");
    backButton?.hide();
  };
  backButton?.onClick(back_page);

  const { pageStore } = useStores();

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

  const [deliveryType, setDeliveryType] = useState([1, 0, 0]);

  console.log(deliveryType);

  useEffect(() => {
    deliveryType[0] == 1
      ? pageStore.updateTypeDelivery("СДЭК")
      : deliveryType[1] == 1
      ? pageStore.updateTypeDelivery("Почта России")
      : pageStore.updateTypeDelivery("Самовывоз");
  }, [deliveryType]);
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
        <p className={styles.namePageText}>Оформление заказа</p>
      </div>
      <div className={styles.view}>
        <p className={styles.headerView}>Доставка</p>
        <div className={styles.selectButton}>
          <div
            className={styles.contentView}
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            {deliveryType[0] == 1 ? (
              <img src={sdekIcon} style={{ height: "80px" }} />
            ) : deliveryType[1] == 1 ? (
              <img src={pochtaIcon} style={{ height: "80px" }} />
            ) : null}
          </div>
          {/* <img src={plusIcon} /> */}
        </div>

        <Popover strategy="absolute">
          <PopoverTrigger>
            <div className={styles.methodButton}>
              <p>Все способы доставки</p>
              <img src={selectArrow} alt="" />
            </div>
          </PopoverTrigger>
          <PopoverContent
            bgColor={"rgba(30,30,30,1)"}
            border={"1px solid #db6900"}
            // width={"220px"}
            padding={"5px"}
          >
            <PopoverBody>
              <VStack align={"flex-start"} w={"100%"} gap={"10px"}>
                <HStack
                  justify={"space-between"}
                  w={"100%"}
                  cursor={"pointer"}
                  onClick={() => setDeliveryType([1, 0, 0])}
                >
                  <Image src={sdekIcon} height={"50px"} />
                  <Text color={"white"}>СДЭК</Text>
                </HStack>
                <HStack
                  justify={"space-between"}
                  w={"100%"}
                  cursor={"pointer"}
                  onClick={() => setDeliveryType([0, 1, 0])}
                >
                  <Image src={pochtaIcon} height={"50px"} />
                  <Text color={"white"}>Почта России</Text>
                </HStack>
                <HStack
                  justify={"space-between"}
                  w={"100%"}
                  cursor={"pointer"}
                  onClick={() => setDeliveryType([0, 0, 1])}
                >
                  <Image src={""} />
                  <Text color={"white"}>Самовывоз</Text>
                </HStack>
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        {/* <div className={styles.methodButton}>
          <p>Все способы доставки</p>
          <img src={selectArrow} alt="" />
        </div> */}
      </div>
      <div className={styles.products}>
        {pageStore.cart.map((item, index) => {
          return item?.urls.length != 0 ? (
            item?.urls.map((images) => {
              return <img src={images?.url} alt="" />;
            })
          ) : (
            <img src={no_photo} alt="" />
          );
        })}
      </div>
      {/* <div className={`${styles.view} ${styles.payment}`}>
        <p className={styles.headerView}>Способ оплаты</p>
        <div className={styles.selectButton}>
          <div className={styles.contentView}>
            <img src={mirIcon} alt="" />
            <p>Привязать карту</p>
          </div>
          <img src={plusIcon} />
        </div>
        <div className={styles.methodButton}>
          <p>Все способы оплаты</p>
          <img src={selectArrow} alt="" />
        </div>
      </div> */}
      <div className={styles.divLine} />
      <div className={styles.totalView}>
        <p className={`${styles.attributeTotal} ${styles.totalText}`}>Итого</p>
        <p className={`${styles.valueTotal} ${styles.totalText}`}>
          {pageStore.cart.length != 0 ? countSumCart() : 0}₽
        </p>
      </div>
      <div className={styles.descriptionView}>
        <div className={styles.viewTotal}>
          <p className={`${styles.descAttrTotal} ${styles.descText}`}>
            Количество товаров
          </p>
          <p className={`${styles.descValueTotal} ${styles.descText}`}>
            {pageStore.cart.length}
          </p>
        </div>
        {/* <div className={styles.viewTotal}>
          <p className={`${styles.descAttrTotal} ${styles.descText}`}>Сумма</p>
          <p className={`${styles.descValueTotal} ${styles.descText}`}>
            18400₽
          </p>
        </div> */}
        {/* <div className={styles.viewTotal}>
          <p className={`${styles.descAttrTotal} ${styles.descText}`}>Скидка</p>
          <p className={`${styles.descValueTotal} ${styles.descText}`}>
            -18400₽
          </p>
        </div> */}
        {/* <div className={styles.viewTotal}>
            <p className={`${styles.descAttrTotal} ${styles.descText}`}>
              Доставка
            </p>
            <p className={`${styles.descValueTotal} ${styles.descText}`}>
              Бесплатно
            </p>
          </div> */}
      </div>
      <div className={styles.orderButton}>
        <p className={styles.orderButtonText}>Заказать</p>
        <div className={styles.prices}>
          {/* <p className={`${styles.oldPriceText} ${styles.priceText}`}>18500₽</p> */}
          <p className={`${styles.newPriceText} ${styles.priceText}`}>
            {pageStore.cart.length != 0 ? countSumCart() : 0}₽
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
