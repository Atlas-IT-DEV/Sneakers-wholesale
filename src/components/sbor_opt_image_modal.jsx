import {
  Button,
  HStack,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import { useEffect, useState } from "react";

import no_photo from "./../images/tiger_big_logo.jpg";
import downloadIcon from "./../images/download_arrow_icon.svg";

const SborOptImageModal = ({
  isOpen,
  onOpen,
  onClose,
  activeIndex,
  images,
}) => {
  console.log(activeIndex);

  const [index, setIndex] = useState(activeIndex);

  useEffect(() => {
    console.log(index);
  }, [index]);

  const handleDownload = async (fileUrl, fileName) => {
    const isMobile =
      window.Telegram.WebApp.platform == "ios" ||
      window.Telegram.WebApp.platform == "android";

    if (!isMobile) {
      try {
        const response = await fetch(fileUrl, {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        });
        console.log(response);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        console.log(a);
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Ошибка при скачивании файла:", error);
      }
    } else window.Telegram.WebApp.openLink(fileUrl);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
      <ModalContent
        backgroundColor={"black"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <ModalCloseButton color={"white"} marginTop={1} />
        <Stack
          position={"absolute"}
          zIndex={1000}
          right={"50px"}
          top={"10px"}
          padding={"6px"}
          backgroundColor={"#db6900"}
          justify={"center"}
          align={"center"}
          cursor={"pointer"}
          flexDirection={"row"}
          borderRadius={"20px"}
          border={"1px solid #db6900"}
          onClick={async () => {
            images != "" && images.split(",")?.length != 0
              ? await handleDownload(images.split(",")[activeIndex], `image`)
              : // ? console.log("я тут")
                await handleDownload("/images/tiger_big_logo.jpg");
            //: console.log("я не тут")
          }}
        >
          <Text color={"black"}>Скачать</Text>
          <Image src={downloadIcon} width={"16px"} />
        </Stack>

        <Swiper
          initialSlide={activeIndex}
          modules={[FreeMode]}
          freeMode={false}
          spaceBetween={"10px"}
          style={{
            display: "flex",
            width: "100%",
            height: "auto",
          }}
          onSlideChange={(swiper) => setIndex(swiper.activeIndex)}
        >
          {images != "" ? (
            images.split(",").map((elem) => (
              <SwiperSlide
                style={{
                  display: "flex",
                  position: "relative",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "auto",
                }}
              >
                <Image src={elem} width={"100%"} align={"center"} />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide
              style={{
                display: "flex",
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
                height: "auto",
              }}
            >
              <Image src={no_photo} width={"100%"} align={"center"} />
            </SwiperSlide>
          )}
        </Swiper>
      </ModalContent>
    </Modal>
  );
};

export default SborOptImageModal;
