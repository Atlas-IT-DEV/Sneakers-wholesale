import {
  Box,
  Image,
  Text,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { useState } from "react";

import styles from "./slider_carousel.module.css"; // Импорт стилей
import "swiper/css";

const CustomSlide = ({ elem, width }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(null);

  // Функция для открытия полноразмерного изображения
  const handleImageClick = (url) => {
    setSelectedImage(url);
    onOpen();
  };

  // Определение класса стилей в зависимости от ширины экрана
  const containerClass =
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
      : styles.container375_410;

  return (
    <Box
      className={`${styles.main_block1} ${containerClass}`}
      backgroundColor={"#080808"}
      borderRadius={"25px"}
      padding={"10px 25px 25px 25px"}
      height={elem?.urls?.length > 0 ? "263px" : "auto"}
      position={"relative"}
    >
      {/* <Text
        fontSize="xl"
        fontWeight="bold"
        className={styles.nameCompany}
        color={"rgba(227, 110, 0, 1)"}
      >
        REED
      </Text> */}
      <Box
        position={"relative"}
        zIndex={3}
        bg={"rgba(0,0,0,0.8)"}
        padding={"10px"}
        borderRadius={"15px"}
      >
        <Text
          fontSize="md"
          className={styles.descriptionText}
          color={"white"}
          fontWeight={"500"}
        >
          {elem?.name}
        </Text>
        <Text
          fontSize="sm"
          className={styles.subDescriptionText}
          color={"gray"}
        >
          {elem?.description}
        </Text>
      </Box>

      {/* Рендеринг миниатюр, если есть изображения */}
      {elem?.urls?.length > 0 && (
        <Image
          src={elem?.urls[0]}
          objectFit="fill"
          // onClick={() => handleImageClick(url)}
          borderRadius="25px"
          position={"absolute"}
          zIndex={2}
          top={0}
          left={0}
          w={"100%"}
          h={"100%"}
          height={"263px"}
          overflow={"hidden"}
        />
      )}

      {/* Модальное окно для полноразмерного просмотра изображения */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton backgroundColor={"transparent"} />
          <ModalBody>
            <Image src={selectedImage} w="100%" h="auto" objectFit="contain" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CustomSlide;
