import { HStack, Image, Stack, Text, VStack } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import "swiper/css/navigation";
import { FreeMode, Navigation, Pagination } from "swiper/modules";

import no_photo from "./../images/tiger_big_logo.jpg";
import useWindowDimensions from "./hooks/windowDimensions";

const SborOptCard = ({
  brand = "Nike",
  model = "lox",
  sizes,
  price = "3000",
}) => {
  const { width } = useWindowDimensions();
  return (
    <VStack
      w={"100%"}
      bgColor={"black"}
      borderRadius={"26px"}
      padding={"20px"}
      align={"flex-start"}
      justify={"flex-start"}
    >
      <Swiper
        style={{
          "--swiper-pagination-color": "rgba(219, 105, 0, 1)",
          "--swiper-pagination-bullet-inactive-color": "rgba(224, 224, 224, 1)",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-pagination-bullet-size": "9px",
          "--swiper-pagination-bullet-horizontal-gap": "4px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "0 0 30px 0",
        }}
        modules={[FreeMode, Navigation, Pagination]}
        spaceBetween={"10px"}
        freeMode={false}
        navigation={true}
        pagination={true}
      >
        <SwiperSlide
          style={{
            width: "100%",
            borderRadius: "26px",
            height: "150px",
            maxHeight: "150px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image
            src={
              "https://external-preview.redd.it/J0nOulCufsLLryB4Jv8oArsdg_XenJnRqwlLYtTNUiE.jpg?auto=webp&s=1bbb4b06446a799b8e955105d45933469898a4cc"
            }
            objectFit={"cover"}
            borderRadius={"26px"}
            margin={"0 auto"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={no_photo}
            objectFit={"cover"}
            borderRadius={"26px"}
            maxHeight={"150px"}
            margin={"0 auto"}
          />
        </SwiperSlide>
      </Swiper>

      <Text
        color={"white"}
        fontWeight={"600"}
        fontSize={width <= 600 ? ["16px", "18px"] : "18px"}
      >
        {brand}
      </Text>
      <Text color={"white"} fontSize={width <= 600 ? ["16px", "18px"] : "18px"}>
        {model}
      </Text>
      <Text
        color={"rgba(100,100,100,1)"}
        fontSize={width <= 600 ? ["16px", "18px"] : "18px"}
      >
        Размеры
      </Text>
      <HStack
        w={"100%"}
        align={"flex-start"}
        gap={"15px"}
        overflow={"auto"}
        overflowY={"hidden"}
        paddingBottom={"10px"}
      >
        <Stack
          height={"50px"}
          width={"40px"}
          minWidth={"40px"}
          color={"white"}
          border={"1px solid red"}
          borderRadius={"10px"}
          justifyContent={"center"}
          align={"center"}
          fontSize={width <= 600 ? ["16px", "18px"] : "18px"}
        >
          <Text>42</Text>
        </Stack>
      </HStack>

      <Text
        color={"rgba(219, 105, 0, 1)"}
        fontWeight={"600"}
        fontSize={width <= 600 ? ["18px", "20px"] : "20px"}
      >
        {price} ₽ / пару
      </Text>
    </VStack>
  );
};

export default SborOptCard;
