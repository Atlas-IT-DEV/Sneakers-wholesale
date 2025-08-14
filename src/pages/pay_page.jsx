import {
  Button,
  Input,
  Stack,
  Text,
  useClipboard,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useStores } from "../store/store_context";
import useWindowDimensions from "../components/hooks/windowDimensions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const PayPage = observer(() => {
  const { pageStore } = useStores();
  const { width } = useWindowDimensions();
  const navigate = useNavigate();

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

  const toast = useToast();
  const textToCopy = "TDQBSwcUqHC2xJ8BVUiVM8JQ8ywQ37FkMe";
  const { onCopy } = useClipboard(textToCopy);

  const [sum, setSum] = useState("");

  const updateOrderPayment = async () => {
    const response = await fetch(
      `https://reedshop.ru:8000/order_payments/${pageStore.created_payment?.id}`,
      {
        method: "PUT",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${pageStore.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: 0,
          order_id: pageStore.created_order?.id,
          is_payment: true,
        }),
      }
    );
    if (response.ok) {
      let copy = pageStore.created_payment;
      pageStore.updateCreatedOrderPayment({
        id: copy?.id,
        order_id: copy?.created_order?.id,
        is_payment: true,
      });
      navigate("/copy");
    }
  };

  const getOrderPaymentById = async () => {
    const response = await fetch(
      `https://reedshop.ru:8000/order_payments/${pageStore.created_order?.id}&${
        pageStore.addressWallet
      }$${(sum * 10 ** 6).toString()}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${pageStore.token}`,
        },
      }
    );
    const result = await response.json();
    if (result) {
      await updateOrderPayment();
    }
  };

  const handleCopy = () => {
    onCopy();
    toast({
      title: "Скопировано в буфер обмена!",
      status: "success",
      duration: 2000,
    });
  };

  const getUsd = async () => {
    const response = await fetch("https://www.cbr-xml-daily.ru/latest.js", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    const result = await response.json();
    setSum(Number(result?.rates?.USD) * Number(countSumOptCart()));
  };

  useEffect(() => {
    getUsd();
  }, []);

  return (
    <VStack width={"100%"} height={"100vh"} align={"flex-start"}>
      <Text
        color={"white"}
        fontWeight={"600"}
        padding={"20px 0"}
        width={"100%"}
        textAlign={"center"}
        bg={"#db6900"}
      >
        Оплата заказа
      </Text>

      <Text
        fontWeight={"500"}
        color={"white"}
        padding={"0 10px"}
        marginTop={"10px"}
      >
        Введите свой адрес кошелька
      </Text>

      <Stack padding={"0 10px"} width={"100%"}>
        <Input
          value={pageStore.addressWallet}
          placeholder={"Адрес кошелька"}
          backgroundColor={"rgba(57,57,57,1)"}
          border={"none"}
          color={"white"}
          borderRadius={"16px"}
          onChange={(e) => pageStore.setAddressWallet(e.target.value)}
        />
      </Stack>

      <Text
        color={"white"}
        fontWeight={"500"}
        padding={"0 10px"}
        marginTop={"10px"}
      >
        Сумма заказа:{" "}
        <span style={{ fontWeight: "400" }}>{sum} USDT TRC20</span>
      </Text>

      <Text
        fontWeight={"500"}
        color={"white"}
        padding={"0 10px"}
        whiteSpace="nowrap" // запрет переноса
        overflow="hidden" // скрытие выходящего за границы
        textOverflow="ellipsis"
        maxWidth={`${width - 20}px`}
      >
        Номер кошелька:{" "}
        <span style={{ fontWeight: "400" }}>
          TDQBSwcUqHC2xJ8BVUiVM8JQ8ywQ37FkMe
        </span>{" "}
      </Text>
      <Stack width={"100%"} padding={"0 10px"}>
        <Button width={"100%"} onClick={handleCopy}>
          Скопировать адрес кошелька
        </Button>
      </Stack>

      <Stack width={"100%"} padding={"0 10px"} marginTop={"10px"}>
        <Button
          width={"100%"}
          onClick={async () => {
            await getOrderPaymentById();
          }}
        >
          Проверить транзакцию
        </Button>
      </Stack>
    </VStack>
  );
});

export default PayPage;
