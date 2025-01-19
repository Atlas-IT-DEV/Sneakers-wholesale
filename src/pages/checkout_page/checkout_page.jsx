import { useNavigate } from "react-router";
import useWindowDimensions from "../../components/hooks/windowDimensions";
import { useStores } from "../../store/store_context";

import styles from "./checkout_page.module.css";
import sdekIcon from "../../images/sdek_icon.svg";
import selectArrow from "../../images/arrow_light_gray.svg";
import no_photo from "./../../images/tiger_big_logo.jpg";
import pochtaIcon from "./../../images/pochta.svg";
import geo from "./../../images/geo.svg";

import { HStack, Image, Input, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const CheckoutPage = ({}) => {
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

  const [openPopup, setOpenPopup] = useState(false);

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

  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [adressDelivery, setAdressDelivery] = useState("");

  useEffect(() => {
    pageStore.updateAdressDelivery(adressDelivery);
    pageStore.updatePhoneNumber(phoneNumber);
    pageStore.updateUsername(username);
  }, [username, phoneNumber, adressDelivery]);

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
            ) : (
              <img src={geo} style={{ height: "80px" }} />
            )}
          </div>
        </div>
        <div
          className={styles.methodButton}
          onClick={() => setOpenPopup(!openPopup)}
        >
          <p>Все способы доставки</p>
          <img src={selectArrow} alt="" />
        </div>
        {openPopup && (
          <VStack
            bgColor={"rgba(30,30,30,1)"}
            border={"1px solid #db6900"}
            borderRadius={"20px"}
            width={"80%"}
            padding={"10px"}
            position={"absolute"}
            zIndex={1000}
            left={0}
            right={0}
            margin={"0 auto"}
          >
            <VStack align={"flex-start"} w={"100%"} gap={"10px"}>
              <HStack
                justify={"space-between"}
                w={"100%"}
                cursor={"pointer"}
                onClick={() => {
                  setDeliveryType([1, 0, 0]);
                  setOpenPopup(false);
                }}
              >
                <Image src={sdekIcon} height={"50px"} />
                <Text color={"white"}>СДЭК</Text>
              </HStack>
              <HStack
                w={"100%"}
                height={"2px"}
                backgroundColor={"rgba(57, 57, 57, 1)"}
                borderRadius={"20px"}
              />
              <HStack
                justify={"space-between"}
                w={"100%"}
                cursor={"pointer"}
                onClick={() => {
                  setDeliveryType([0, 1, 0]);
                  setOpenPopup(false);
                }}
              >
                <Image src={pochtaIcon} height={"50px"} />
                <Text color={"white"}>Почта России</Text>
              </HStack>
              <HStack
                w={"100%"}
                height={"2px"}
                backgroundColor={"rgba(57, 57, 57, 1)"}
                borderRadius={"20px"}
              />
              <HStack
                justify={"space-between"}
                w={"100%"}
                cursor={"pointer"}
                onClick={() => {
                  setDeliveryType([0, 0, 1]);
                  setOpenPopup(false);
                }}
              >
                <Image src={geo} height={"50px"} />
                <Text color={"white"}>Самовывоз</Text>
              </HStack>
            </VStack>
          </VStack>
        )}
      </div>

      <HStack w={"100%"} padding={"0 16px"} marginTop={"20px"}>
        <Input
          type="text"
          placeholder="Введите ФИО"
          // pattern="/(?:\+|\d)[\d\-\(\) ]{9,}\d/g"
          backgroundColor={"rgba(57,57,57,1)"}
          border={"none"}
          color={"white"}
          borderRadius={"16px"}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </HStack>
      <HStack w={"100%"} padding={"0 16px"} marginTop={"20px"}>
        <Input
          type="text"
          placeholder="Введите номер телефона"
          pattern="/(?:\+|\d)[\d\-\(\) ]{9,}\d/g"
          backgroundColor={"rgba(57,57,57,1)"}
          border={"none"}
          color={"white"}
          borderRadius={"16px"}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
      </HStack>
      {(deliveryType[0] == 1 || deliveryType[1] == 1) && (
        <HStack w={"100%"} padding={"0 16px"} marginTop={"20px"}>
          <Input
            placeholder="Введите адрес доставки (город, улица, дом)"
            backgroundColor={"rgba(57,57,57,1)"}
            border={"none"}
            color={"white"}
            borderRadius={"16px"}
            onChange={(e) => setAdressDelivery(e.target.value)}
          />
        </HStack>
      )}

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
      </div>
      <div
        className={styles.orderButton}
        onClick={() =>
          adressDelivery == "" && (deliveryType[0] == 1 || deliveryType[1] == 1)
            ? null
            : navigate("/copy")
        }
        style={
          adressDelivery == "" && (deliveryType[0] == 1 || deliveryType[1] == 1)
            ? { backgroundColor: "rgba(200,0,0,1)", cursor: "no-drop" }
            : null
        }
      >
        <p className={styles.orderButtonText}>Продолжить</p>
        <div className={styles.prices}>
          <p className={`${styles.newPriceText} ${styles.priceText}`}>
            {pageStore.cart.length != 0 ? countSumCart() : 0}₽
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
