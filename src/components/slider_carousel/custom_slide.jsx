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
import { SwiperSlide } from "swiper/react";
import styles from "./slider_carousel.module.css"; // Импорт стилей
import { useState } from "react";
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
      backgroundColor={"black"}
      borderRadius={"25px"}
      padding={"20px 35px 25px 35px"}
    >
      <Text
        fontSize="xl"
        fontWeight="bold"
        className={styles.nameCompany}
        color={"rgba(227, 110, 0, 1)"}
      >
        REED
      </Text>
      <Text fontSize="md" className={styles.descriptionText} color={"white"}>
        {elem?.name}
      </Text>
      <Text fontSize="sm" className={styles.subDescriptionText} color={"white"}>
        {elem?.description}
      </Text>

      {/* Рендеринг миниатюр, если есть изображения */}
      {elem?.urls?.length > 0 && (
        <Flex mt={3} gap={2}>
          {elem.urls.map((url, index) => (
            <Image
              key={index}
              src={url}
              boxSize="50px"
              objectFit="cover"
              cursor="pointer"
              onClick={() => handleImageClick(url)}
              borderRadius="md"
            />
          ))}
        </Flex>
      )}

      {/* Модальное окно для полноразмерного просмотра изображения */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton backgroundColor={'transparent'}/>
          <ModalBody>
            <Image src={selectedImage} w="100%" h="auto" objectFit="contain" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CustomSlide;
