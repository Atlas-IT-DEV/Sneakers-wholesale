import { HStack, Image, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import useWindowDimensions from "./hooks/windowDimensions";

import "swiper/css";
import "swiper/css/pagination";
import no_photo from "./../images/tiger_big_logo.jpg";
import SborOptSize from "./sbor_opt_size";
import { useState } from "react";
import SborOptImageModal from "./sbor_opt_image_modal";

const SborOptCard = ({
  brand = "Nike",
  model = "lox",
  price = "3000",
  obj = {},
}) => {
  const { width } = useWindowDimensions();

  const images = [
    "https://external-preview.redd.it/J0nOulCufsLLryB4Jv8oArsdg_XenJnRqwlLYtTNUiE.jpg?auto=webp&s=1bbb4b06446a799b8e955105d45933469898a4cc",
    no_photo,
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(obj);

  return (
    <>
      <SborOptImageModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        activeIndex={activeIndex}
        images={obj?.urls}
      />
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
            "--swiper-pagination-bullet-inactive-color":
              "rgba(224, 224, 224, 1)",
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
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {obj?.urls != "" ? (
            obj?.urls.split(",").map((elem) => (
              <SwiperSlide
                style={{
                  width: "100%",
                  borderRadius: "26px",
                  height: "150px",
                  maxHeight: "150px",
                  display: "flex",
                  justifyContent: "center",
                }}
                onClick={onOpen}
              >
                <Image
                  src={elem}
                  objectFit={"cover"}
                  borderRadius={"26px"}
                  margin={"0 auto"}
                  cursor={"pointer"}
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide
              style={{
                width: "100%",
                borderRadius: "26px",
                height: "150px",
                maxHeight: "150px",
                display: "flex",
                justifyContent: "center",
              }}
              onClick={onOpen}
            >
              <Image
                src={no_photo}
                objectFit={"cover"}
                borderRadius={"26px"}
                margin={"0 auto"}
                cursor={"pointer"}
              />
            </SwiperSlide>
          )}
        </Swiper>

        <Text
          color={"white"}
          fontWeight={"600"}
          fontSize={width <= 600 ? ["16px", "18px"] : "18px"}
        >
          {brand}
        </Text>
        <Text
          color={"white"}
          fontSize={width <= 600 ? ["16px", "18px"] : "18px"}
        >
          {model}
        </Text>
        <Text
          color={"white"}
          fontSize={width <= 600 ? ["16px", "18px"] : "18px"}
        >
          {obj?.description}
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
          {obj?.sizes?.map((elem) => (
            <SborOptSize product_size_obj={elem} />
          ))}
        </HStack>

        <Text
          color={"rgba(219, 105, 0, 1)"}
          fontWeight={"600"}
          fontSize={width <= 600 ? ["18px", "20px"] : "20px"}
        >
          {price} ₽ / пару
        </Text>
      </VStack>
    </>
  );
};

export default SborOptCard;
