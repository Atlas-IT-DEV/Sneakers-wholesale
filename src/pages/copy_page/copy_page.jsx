import {
  Button,
  EditableTextarea,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useStores } from "../../store/store_context";

const CopyPage = () => {
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

  const combineProducts = (products) => {
    return products.reduce((acc, product) => {
      const existingProduct = acc.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        acc.push({ ...product, quantity: 1 });
      }
      return acc;
    }, []);
  };

  function selectEl() {
    let a = document.getElementById("details");
    a.select();
    document.execCommand("copy");
  }
  return (
    <VStack
      width={"100%"}
      //   height={"100vh"}
      align={"flex-start"}
      overflow={"hidden"}
      overflowY={"scroll"}
    >
      <HStack
        backgroundColor={"#db6900"}
        width={"100%"}
        height={"90px"}
        justify={"center"}
      >
        <Text color={"white"} fontSize={"24px"} fontWeight={600}>
          Оформление заказа
        </Text>
      </HStack>
      <Text
        color={"white"}
        fontSize={"20px"}
        fontWeight={600}
        padding={"0 20px"}
        marginTop={"10px"}
      >
        Детали заказа
      </Text>
      <Text
        color={"white"}
        padding={"0 20px"}
        fontSize={"16px"}
        fontWeight={600}
      >
        Проверьте введенные данные. После нажатия на кнопку "Подтвердить" данные
        будут автоматически скопированы в буфер обмена, а Вы будете
        перенаправлены в чат с менеджером. После этого вставьте скопированный
        текст и отправьте нашему менеджеру.
      </Text>
      {console.log(pageStore.user_info)}
      <Stack padding={"0 16px"} w={"100%"} marginTop={"16px"}>
        <textarea
          id="details"
          defaultValue={`Здравствуйте. Хочу сделать заказ. \n\n Данные для заказа: \n ФИО: ${
            pageStore.user_name
          } \n Номер телефона: ${pageStore.phone_number}
           \n Тип доставки: ${pageStore.delivery_type} \n ${
            pageStore.delivery_type == "Почта России" ||
            pageStore.delivery_type == "СДЭК"
              ? `Адрес доставки: ${pageStore.adress_delivery}\n `
              : ""
          }Сумма заказа: ${countSumCart()} ₽ \n\n Товары: \n\n${combineProducts(
            pageStore.cart
          )
            .map((item) => {
              return ` Бренд: ${item?.company?.name}, \n Наименование: ${
                item?.name
              }, \n Количество: ${item?.quantity}, \n Итоговая цена: ${parseInt(
                item?.quantity * parseInt(item?.price)
              )}₽ \n\n`;
            })
            .join("")}  Жду от Вас обратной связи!`}
          style={{
            backgroundColor: "rgba(0,0,0,0)",
            resize: "none",
            border: "1px solid #db6900",
            borderRadius: "20px",
            padding: "10px",
            color: "white",
            height: "auto",
            minHeight: "500px",
            outline: "none",
          }}
        ></textarea>
      </Stack>
      <a
        href="https://t.me/andreykamyshnikov"
        style={{
          marginTop: "20px",
          backgroundColor: "#db6900",
          alignSelf: "center",
          color: "white",
          padding: "10px 20px",
          borderRadius: "20px",
          marginBottom: "30px",
        }}
        onClick={() => {
          selectEl();
        }}
      >
        <Text>Оформить заказ</Text>
      </a>
    </VStack>
  );
};

export default CopyPage;
