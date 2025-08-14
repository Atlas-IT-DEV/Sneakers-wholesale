import { useNavigate } from "react-router";
import useWindowDimensions from "../../components/hooks/windowDimensions";
import { useStores } from "../../store/store_context";

import styles from "./checkout_page.module.css";
import sdekIcon from "../../images/sdek_icon.svg";
import selectArrow from "../../images/arrow_light_gray.svg";
import no_photo from "./../../images/tiger_big_logo.jpg";
import pochtaIcon from "./../../images/pochta.svg";
import geo from "./../../images/geo.svg";
import delivery from "./../../images/delivery_car.svg";

import {
  HStack,
  Image,
  Input,
  Radio,
  RadioGroup,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

const CheckoutPage = observer(({}) => {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const toast = useToast();

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
      ? pageStore.updateTypeDelivery("Самовывоз")
      : pageStore.updateTypeDelivery("Другие службы");
  }, [deliveryType]);

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

  const createOrder = async () => {
    await pageStore.createOrder();
  };
  const createOrderPayment = async () => {
    return await pageStore.createOrderPayment();
  };

  const handleCreateOrder = async () => {
    await createOrder();
    const ok = await createOrderPayment();
    if (ok) {
      toast({
        title: "Заказ создан",
        status: "success",
      });
      navigate("/pay");
    }
  };

  const [typePay, setTypePay] = useState("1");
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
              <Image src={sdekIcon} style={{ height: "80px" }} />
            ) : deliveryType[1] == 1 ? (
              <Image src={geo} style={{ height: "80px" }} />
            ) : (
              <Image src={delivery} height={"80px"} />
            )}
          </div>
        </div>
        <div
          className={styles.methodButton}
          onClick={() => setOpenPopup(!openPopup)}
        >
          <p>Все способы доставки</p>
          <img src={selectArrow} alt="" width={"14px"} />
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
                <Image src={geo} height={"50px"} />
                <Text color={"white"}>Самовывоз</Text>
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
                <Image src={delivery} height={"40px"} />
                <Text color={"white"}>Другие службы</Text>
              </HStack>
            </VStack>
          </VStack>
        )}
      </div>
      {deliveryType[2] == 1 && (
        <Text
          fontSize={"12px"}
          color={"gray"}
          padding={"0 16px"}
          marginTop={"5px"}
        >
          Менеджер соориентирует вас в процессе оформления
        </Text>
      )}
      {pageStore.shop_format == 1 && (
        <VStack
          color={"white"}
          width={"100%"}
          align={"flex-start"}
          justify={"flex-start"}
          padding={"0 20px"}
          marginTop={"10px"}
        >
          <Text fontWeight={"600"}>Способ оплаты</Text>
          <RadioGroup value={typePay} onChange={(e) => setTypePay(e)}>
            <VStack justify={"flex-start"} align={"flex-start"}>
              <Radio value="1">1. Криптокошельком</Radio>
              <Radio value="2">2. Другой способ</Radio>
            </VStack>
          </RadioGroup>
        </VStack>
      )}
      <HStack w={"100%"} padding={"0 16px"} marginTop={"20px"}>
        <Input
          type="text"
          placeholder="ФИО"
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
          placeholder="Номер телефона"
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
      {(deliveryType[0] == 1 || deliveryType[2] == 1) && (
        <HStack w={"100%"} padding={"0 16px"} marginTop={"20px"}>
          <Input
            placeholder={
              deliveryType[2] == 1
                ? "Адрес доставки (город, улица, дом)"
                : "Адрес пункта выдачи (город, улица, дом)"
            }
            backgroundColor={"rgba(57,57,57,1)"}
            border={"none"}
            color={"white"}
            borderRadius={"16px"}
            onChange={(e) => setAdressDelivery(e.target.value)}
          />
        </HStack>
      )}

      <div className={styles.products}>
        {pageStore.shop_format == 0
          ? pageStore.cart
              .filter((item) => item?.type_product == "Розница")
              .map((item) => {
                return item?.urls.length != 0 && item?.urls[0] != null ? (
                  item?.urls.map((images, index2) => {
                    return <img src={images} alt="" key={index2} />;
                  })
                ) : (
                  <img src={no_photo} alt="" />
                );
              })
          : pageStore.cart
              .filter((item) => item?.type_product == "Опт")
              .map((item) => {
                return item?.urls.length != 0 && item?.urls[0] != null ? (
                  item?.urls.map((images, index2) => {
                    return <img src={images} alt="" key={index2} />;
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
          {pageStore.shop_format == 0 ? countSumRoznCart() : countSumOptCart()}{" "}
          ₽
        </p>
      </div>
      <div className={styles.descriptionView}>
        <div className={styles.viewTotal}>
          <p className={`${styles.descAttrTotal} ${styles.descText}`}>
            Количество товаров
          </p>
          <p className={`${styles.descValueTotal} ${styles.descText}`}>
            {pageStore.shop_format == 0
              ? pageStore.cart?.filter(
                  (item) => item?.type_product == "Розница"
                ).length
              : pageStore.cart?.filter((item) => item?.type_product == "Опт")
                  .length}
          </p>
        </div>
      </div>
      <div
        className={styles.orderButton}
        onClick={async () => {
          if (
            adressDelivery == "" &&
            (deliveryType[0] == 1 || deliveryType[1] == 1)
          )
            return;
          else if (typePay == "1") {
            await handleCreateOrder();
          } else navigate("/copy");
        }}
        style={
          adressDelivery == "" && (deliveryType[0] == 1 || deliveryType[1] == 1)
            ? { backgroundColor: "rgba(200,0,0,1)", cursor: "no-drop" }
            : null
        }
      >
        <p className={styles.orderButtonText}>Продолжить</p>
        <div className={styles.prices}>
          <p className={`${styles.newPriceText} ${styles.priceText}`}>
            {pageStore.shop_format == 0
              ? countSumRoznCart()
              : countSumOptCart()}{" "}
            ₽
          </p>
        </div>
      </div>
    </div>
  );
});

export default CheckoutPage;
