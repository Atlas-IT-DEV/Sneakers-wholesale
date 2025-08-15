import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import useWindowDimensions from "../../hooks/windowDimensions";
import { useStores } from "../../../store/store_context";
import { useNavigate } from "react-router";
import { observer } from "mobx-react-lite";
import {
  Button,
  Collapse,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import GridSizes from "../../grid_sizes";

import styles from "./product_modal.module.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import favouriteInactiveIcon from "../../../images/favourite_inactive_icon.svg";
import favouriteActiveIcon from "../../../images/favourite_active_icon.svg";
import backArrow from "../../../images/arrow_right_icon.svg";
import whiteArrow from "./../../../images/arrow_select_white.svg";
import no_photo from "./../../../images/tiger_big_logo.jpg";
import downloadIcon from "./../../../images/download_arrow_icon.svg";
import redact from "../../../redact";
import ShoeSizeSelector from "./shoe_size";
// import original from "./original.png";
import { FaCheckCircle } from "react-icons/fa";
const defaultSizeTable = [
  { id: 1, EU: "36", US: "4", UK: "3,5", RU: "35", mm: "22" },
  { id: 2, EU: "36,5", US: "4,5", UK: "4", RU: "35,5", mm: "22,5" },
  { id: 3, EU: "37,5", US: "5", UK: "4,5", RU: "36", mm: "23" },
  { id: 4, EU: "38", US: "5,5", UK: "5", RU: "37", mm: "23,5" },
  { id: 5, EU: "38,5", US: "6", UK: "5,5", RU: "37,5", mm: "24" },
  { id: 6, EU: "39", US: "6,5", UK: "6", RU: "38", mm: "24,5" },
  { id: 7, EU: "40", US: "7", UK: "6,5", RU: "39", mm: "25" },
  { id: 8, EU: "40,5", US: "7,5", UK: "7", RU: "39,5", mm: "25,5" },
  { id: 9, EU: "41", US: "8", UK: "7,5", RU: "40", mm: "26" },
  { id: 10, EU: "42", US: "8,5", UK: "8", RU: "41", mm: "26,5" },
  { id: 11, EU: "42,5", US: "9", UK: "8,5", RU: "41,5", mm: "27" },
  { id: 12, EU: "43", US: "9,5", UK: "9", RU: "42", mm: "27,5" },
  { id: 13, EU: "44", US: "10", UK: "9,5", RU: "43", mm: "28" },
  { id: 14, EU: "44,5", US: "10,5", UK: "10", RU: "43,5", mm: "28,5" },
  { id: 15, EU: "45", US: "11", UK: "10,5", RU: "44", mm: "29" },
  { id: 16, EU: "46", US: "11,5", UK: "11", RU: "44,5", mm: "29,5" },
  { id: 17, EU: "47", US: "12", UK: "11,5", RU: "45", mm: "30" },
  { id: 18, EU: "47,5", US: "12,5", UK: "12", RU: "45,5", mm: "30,5" },
  { id: 19, EU: "48", US: "13", UK: "12,5", RU: "46", mm: "31" },
  { id: 20, EU: "48,5", US: "13,5", UK: "13", RU: "46,5", mm: "31,5" },
  { id: 21, EU: "49", US: "14", UK: "13,5", RU: "47", mm: "32" },
  { id: 22, EU: "49,5", US: "14,5", UK: "14", RU: "47,5", mm: "32,5" },
  { id: 23, EU: "50", US: "15", UK: "14,5", RU: "48", mm: "33" },
];

const ProductModal = observer(({ obj = {} }) => {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();

  const { pageStore } = useStores();
  //доставка, детали, гарантия
  const [isPressed, setIsPressed] = useState([false, false, false]);

  const createFavourite = async (product_id) => {
    await pageStore.createFavourite(product_id);
  };

  const deleteFavourite = async (fav_id) => {
    const response = await fetch(
      `https://reedshop.ru:8000/favorites/${fav_id}`,
      {
        method: "DELETE",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${pageStore.token}`,
        },
      }
    );
  };

  const findFavourite = () => {
    return pageStore.favourites?.length != 0 &&
      Array.isArray(pageStore.favourites)
      ? pageStore.favourites.find((item) => item?.product?.id == obj?.id)
      : null;
  };

  const toggleFavourite = async () => {
    onClose();
    if (!findFavourite()) {
      await createFavourite(obj?.id);
    } else {
      await deleteFavourite(findFavourite()?.id);
    }
    await pageStore.getFavouriteByUserIdFull();
  };

  const toggleModalFavourite = async () => {
    if (!findFavourite()) {
      await createFavourite(obj?.id);
    } else {
      await deleteFavourite(findFavourite()?.id);
    }
    await pageStore.getFavouriteByUserIdFull();
  };

  const [selectedSize, setSelectedSize] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalRef = useRef(null);

  const [isOpenGrid, setIsOpenGrid] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    console.log(activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    setIsOpenGrid(false);
    getTexts();
  }, [isOpen]);
  const [policy, setPolicy] = useState([{ text: "" }, { text: "" }]);
  const getPolicy = async (policyType) => {
    try {
      const response = await fetch(
        `https://reedshop.ru:8888/policy/${policyType}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Ошибка при получении политики:", error);
      throw error;
    }
  };
  const getTexts = async () => {
    let initial = Array.from(policy);
    let dostavka = await getPolicy("delivery");
    let warranty = await getPolicy("warranty");
    setPolicy([dostavka, warranty]);
  };

  const handleDownload = async (fileUrl, fileName) => {
    const isMobile =
      window.Telegram.WebApp.platform == "ios" ||
      window.Telegram.WebApp.platform == "android";

    if (!isMobile) {
      try {
        const response = await fetch(fileUrl, {
          method: "GET",
          headers: {
            // accept: "application/json",
            "Content-Type": "application/octet-stream",
          },
        });
        console.log("response", response);
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
  const [sizeTable, setSizeTable] = useState([]); // Состояние для хранения таблицы размеров

  // Функция загрузки таблицы размеров
  const fetchSizeTable = async (productId) => {
    try {
      const response = await fetch(
        `https://reedshop.ru:8888/size-table/${productId}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${pageStore.token}`, // если требуется авторизация
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const data = await response.json();
      setSizeTable(data); // Сохраняем данные в состояние

      // Если данных нет - устанавливаем таблицу по умолчанию
      if (!data || data.length === 0) {
        setSizeTable(defaultSizeTable);
      }

      return data;
    } catch (error) {
      console.error("Ошибка при загрузке таблицы размеров:", error);
      // В случае ошибки устанавливаем таблицу по умолчанию
      setSizeTable(defaultSizeTable);
      throw error;
    }
  };

  // Или при изменении productId:
  useEffect(() => {
    if (obj.id !== null) {
      fetchSizeTable(obj.id).catch(console.error);
    }
  }, [obj]);

  const handleDefaultImageDownload = () => {
    const a = document.createElement("a");
    a.href = "/images/tiger_big_logo.jpg";
    a.download = "tiger_big_logo.jpg"; // Указываем имя файла
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const originalInCart = pageStore.cart
    .filter((item) => item.type_product == "Опт")
    .some((item) => item?.is_original);

  const replicaInCart = pageStore.cart
    .filter((item) => item.type_product == "Опт")
    .some((item) => !item?.is_original);

  const isAddButtonDisabled = (product) => {
    if (originalInCart && !product?.is_original) {
      return true; // Блокируем реплику, если есть оригинал
    }
    if (replicaInCart && product?.is_original) {
      return true; // Блокируем оригинал, если есть реплика
    }
    return false; // Иначе кнопка активна
  };

  return (
    <div>
      <div
        className={
          width >= 585
            ? styles.imageContainer585_600
            : width >= 565
            ? styles.imageContainer565_585
            : width >= 525
            ? styles.imageContainer525_565
            : width >= 485
            ? styles.imageContainer485_525
            : width >= 450
            ? styles.imageContainer450_485
            : width >= 410
            ? styles.imageContainer410_450
            : styles.imageContainer375_410
        }
      >
        <Swiper
          style={{
            "--swiper-pagination-color": "rgba(219, 105, 0, 1)",
            "--swiper-pagination-bullet-inactive-color":
              "rgba(224, 224, 224, 1)",
            "--swiper-pagination-bullet-inactive-opacity": "1",
            "--swiper-pagination-bullet-size": "9px",
            "--swiper-pagination-bullet-horizontal-gap": "4px",
          }}
          className={styles.slideTrack}
          modules={[FreeMode, Navigation, Pagination]}
          spaceBetween={50}
          freeMode={false}
          navigation={true}
          pagination={true}
          onClick={() => {
            onOpen();
            setActiveIndex(0);
          }}
        >
          {obj.urls.length != 0 && obj.urls[0] != null ? (
            obj.urls.map((elem, index) => {
              return (
                <SwiperSlide className={styles.slider} key={index}>
                  {elem.includes("MOV") || elem.includes("mp4") ? (
                    <video
                      src={elem}
                      autoPlay
                      className={styles.imageProduct}
                      muted
                    />
                  ) : (
                    <img src={elem} alt="" className={styles.imageProduct} />
                  )}
                  <div
                    className={styles.favouriteButton}
                    onClick={async () => {
                      await toggleFavourite();
                    }}
                  >
                    <img
                      src={
                        findFavourite()
                          ? favouriteActiveIcon
                          : favouriteInactiveIcon
                      }
                      alt=""
                    />
                  </div>
                </SwiperSlide>
              );
            })
          ) : obj.urls[0] == null ? (
            <SwiperSlide className={styles.slider}>
              <img src={no_photo} alt="" className={styles.imageProduct} />
              <div
                className={styles.favouriteButton}
                onClick={async () => {
                  await toggleFavourite();
                }}
              >
                <img
                  src={
                    findFavourite()
                      ? favouriteActiveIcon
                      : favouriteInactiveIcon
                  }
                  alt=""
                />
              </div>
            </SwiperSlide>
          ) : null}
        </Swiper>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setActiveIndex(0);
        }}
        size={"fullscreen"}
        motionPreset="slideInBottom"
        blockScrollOnMount
        isCentered={false}
        initialFocusRef={modalRef}
        // scrollBehavior="inside"
      >
        <ModalOverlay position={"relative"} width={"100%"} height={"100vh"} />
        <ModalContent
          ref={modalRef}
          margin={0}
          padding={0}
          position={"fixed"}
          bottom={0}
          left={0}
          w={"100%"}
          height={"96vh"}
          backgroundColor={"rgba(28,28,28,1)"}
          borderTopLeftRadius={"26px"}
          borderTopRightRadius={"26px"}
          overflow={"scroll"}
          overflowX={"hidden"}
        >
          <ModalBody padding={0} width={"100%"}>
            <Swiper
              style={{
                "--swiper-pagination-position": "top",
                "--swiper-pagination-color": "rgba(219, 105, 0, 1)",
                "--swiper-pagination-bullet-inactive-color":
                  "rgba(224, 224, 224, 1)",
                "--swiper-pagination-bullet-inactive-opacity": "1",
                "--swiper-pagination-bullet-size": "9px",
                "--swiper-pagination-bullet-horizontal-gap": "4px",
                display: "flex",
                borderTopLeftRadius: "26px",
                borderTopRightRadius: "26px",
                position: "relative",
              }}
              // className={styles.sliderProduct}
              modules={[FreeMode, Navigation, Pagination]}
              spaceBetween={10}
              freeMode={false}
              // navigation={true}
              pagination={{
                clickable: true,
                type: "bullets",
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
              <Stack
                position={"absolute"}
                zIndex={100}
                left={"20px"}
                top={"20px"}
                cursor={"pointer"}
                onClick={() => {
                  setSelectedSize("");
                  setActiveIndex(0);
                  onClose();
                }}
                backgroundColor={"white"}
                width={width <= 600 ? ["35px", "40px"] : "40px"}
                height={width <= 600 ? ["35px", "40px"] : "40px"}
                justify={"center"}
                align={"center"}
                borderRadius={"50%"}
              >
                <Image
                  src={backArrow}
                  transform={"rotate(180deg)"}
                  marginRight={"4px"}
                  w={width <= 600 ? ["15px", "18px"] : "18px"}
                />
              </Stack>
              <Stack
                position={"absolute"}
                top={"20px"}
                right={"20px"}
                cursor={"pointer"}
                zIndex={100}
                backgroundColor={"white"}
                width={width <= 600 ? ["35px", "40px"] : "40px"}
                height={width <= 600 ? ["35px", "40px"] : "40px"}
                justify={"center"}
                align={"center"}
                borderRadius={"50%"}
                onClick={() => toggleModalFavourite()}
              >
                <Image
                  src={
                    findFavourite()
                      ? favouriteActiveIcon
                      : favouriteInactiveIcon
                  }
                  width={width <= 600 ? ["20px", "25px"] : "25px"}
                />
              </Stack>
              {obj.is_original ? (
                <Stack
                  bg={"rgba(0,0,0,0.8)"}
                  borderRadius={"10px"}
                  position={"absolute"}
                  zIndex={1000}
                  left={"20px"}
                  bottom={"20px"}
                  padding={"6px"}
                  justify={"center"}
                  align={"center"}
                  cursor={"pointer"}
                  flexDirection={"row"}
                  onClick={async () =>
                    obj?.urls.length != 0 && obj.urls[0] != null
                      ? await handleDownload(obj?.urls[activeIndex], `image`)
                      : handleDownload("/images/tiger_big_logo.jpg")
                  }
                >
                  <Text color={"rgba(89, 200, 79, 1)"} fontWeight={600}>
                    Оригинал
                  </Text>
                  {/* <Image src={original} width={"16px"} /> */}
                  <FaCheckCircle color="rgba(89, 200, 79, 1)"/>
                </Stack>
              ) : null}

              <Stack
                position={"absolute"}
                zIndex={1000}
                right={"20px"}
                bottom={"20px"}
                padding={"6px"}
                backgroundColor={"#db6900"}
                justify={"center"}
                align={"center"}
                cursor={"pointer"}
                flexDirection={"row"}
                borderRadius={"13px"}
                border={"1px solid #db6900"}
                onClick={async () =>
                  obj?.urls.length != 0 && obj.urls[0] != null
                    ? await handleDownload(obj?.urls[activeIndex], `image`)
                    : handleDownload("/images/tiger_big_logo.jpg")
                }
              >
                <Text color={"black"}>Скачать</Text>
                <Image src={downloadIcon} width={"16px"} />
              </Stack>
              {obj.urls.length != 0 && obj.urls[0] != null ? (
                obj.urls.map((elem) => (
                  <SwiperSlide className={styles.slideProduct}>
                    {elem.includes("MOV") || elem.includes("mp4") ? (
                      <video src={elem} muted autoPlay />
                    ) : (
                      <Image src={elem} width={width} />
                    )}
                  </SwiperSlide>
                ))
              ) : obj.urls[0] == null ? (
                <SwiperSlide className={styles.slideProduct}>
                  <Image src={no_photo} width={width} objectFit={"fill"} />
                </SwiperSlide>
              ) : null}
            </Swiper>
            <VStack width={"100%"} padding={"0 20px"} align={"flex-start"}>
              <HStack
                width={"100%"}
                justifyContent={"flex-start"}
                align={"end"}
                marginTop={"14px"}
                gap={"15px"}
              >
                <VStack
                  align={"flex-start"}
                  borderRadius={"13px"}
                  backgroundColor={"rgb(28, 28, 28)"}
                  border={"1px solid rgb(219, 105, 0)"}
                  p={"10px"}
                >
                  <Text
                    color={"rgb(219, 105, 0)"}
                    fontSize={width <= 600 ? ["16px", "18px"] : "18px"}
                    fontWeight={600}
                  >
                    {`${obj.price.split("#")[0] ?? 0}`}₽
                  </Text>
                  <Text color={"white"}>{obj.price.split("#")[1]}</Text>
                </VStack>
                <VStack
                  align={"flex-start"}
                  borderRadius={"13px"}
                  backgroundColor={"rgb(28, 28, 28)"}
                  border={"1px solid rgb(219, 105, 0)"}
                  p={"10px"}
                >
                  <Text
                    color={"rgb(219, 105, 0)"}
                    fontSize={width <= 600 ? ["16px", "18px"] : "18px"}
                    fontWeight={600}
                  >
                    {`${obj.price.split("#")[2]}`}₽
                  </Text>
                  <Text color={"white"}>{obj.price.split("#")[3]}</Text>
                </VStack>
              </HStack>
              {/* <Text
                color={"white"}
                marginTop={"10px"}
                fontSize={width <= 600 ? ["16px", "18px"] : "18px"}
              >
                {obj?.name} {obj?.is_original ? "(Оригинал)" : "(Реплика)"}
              </Text> */}
              {/* <Text
                color={"white"}
                fontWeight={500}
                fontSize={width <= 600 ? ["16px", "18px"] : "18px"}
                _hover={{ textDecoration: "underline", cursor: "pointer" }}
              >
                Бренд {obj?.company?.name}
              </Text> */}
              <HStack
                width={"100%"}
                onClick={() => console.log(obj)}
                overflowX={"scroll"}
                gap={"30px"}
                align={"flex-start"}
                paddingBottom={"10px"}
              >
                {obj.characteristics
                  .filter((char) => char.name != "Размер")
                  .map((char) => {
                    return (
                      <VStack
                        align={"flex-start"}
                        border={"1px solid rgba(219, 105, 0, 1)"}
                        borderRadius={"13px"}
                        padding={"15px"}
                      >
                        <Text
                          fontWeight={600}
                          color={"rgb(219, 105, 0)"}
                          whiteSpace="nowrap"
                        >
                          {char.name}
                        </Text>
                        <Text color={"white"}>{char.value}</Text>
                      </VStack>
                    );
                  })}
              </HStack>
              <HStack
                justify={"space-between"}
                width={"100%"}
                align={"flex-end"}
              >
                <Text
                  color={"white"}
                  fontSize={width <= 600 ? ["14px", "16px"] : "16px"}
                  marginTop={"20px"}
                >
                  Размеры (EU)
                </Text>
                {/* <Text
                  color={"rgba(155,155,155,1)"}
                  cursor={"pointer"}
                  textDecoration={"underline"}
                  fontSize={width <= 600 ? ["14px", "16px"] : "16px"}
                  onClick={() => setIsOpenGrid(!isOpenGrid)}
                >
                  Размерная сетка
                </Text> */}
              </HStack>
              <ShoeSizeSelector
                sizeTable={sizeTable}
                setSelectedSize={setSelectedSize}
              />
              {/* <GridSizes isOpen={isOpenGrid} /> */}
              <HStack
                overflow={"scroll"}
                overflowY={"hidden"}
                gap={"20px"}
                marginTop={"15px"}
              >
                {Array.from(obj?.characteristics)
                  .filter((elem) => elem.id == 1)
                  .map((elem) => elem.value)
                  .sort()
                  .map((item) => (
                    <Stack
                      width={"50px"}
                      height={"60px"}
                      onClick={() =>
                        selectedSize != item
                          ? setSelectedSize(item)
                          : setSelectedSize("")
                      }
                      justify={"center"}
                      align={"center"}
                      borderRadius={"13px"}
                      backgroundColor={
                        selectedSize == item
                          ? "rgba(219, 105, 0, 1)"
                          : "rgba(36,36,36,1)"
                      }
                      border={"1px solid rgba(219, 105, 0, 1)"}
                      cursor={"pointer"}
                    >
                      <Text
                        color={"white"}
                        fontSize={width <= 600 ? ["16px", "18px"] : "18px"}
                      >
                        {item}
                      </Text>
                    </Stack>
                  ))}
              </HStack>
              {selectedSize == "" ? (
                <Text
                  color={"red"}
                  fontSize={width <= 600 ? ["14px", "16px"] : "16px"}
                >
                  Выберите размер
                </Text>
              ) : selectedSize == "new" ? (
                <Text
                  color={"rgb(219, 105, 0)"}
                  fontSize={width <= 600 ? ["14px", "16px"] : "16px"}
                >
                  Товар добавлен!
                </Text>
              ) : null}

              <VStack
                align={"flex-start"}
                padding={"0 20px"}
                width={"100%"}
                backgroundColor={"rgba(8,8,8,1)"}
                borderRadius={"13px"}
                marginTop={"20px"}
              >
                <HStack
                  height={"50px"}
                  width={"100%"}
                  justify={"space-between"}
                  cursor={"pointer"}
                  onClick={() => {
                    let copyIsPressed = Array.from(isPressed);
                    copyIsPressed[0] = !copyIsPressed[0];
                    setIsPressed(copyIsPressed);
                  }}
                >
                  <Text
                    color={"white"}
                    fontSize={width <= 600 ? ["16px", "18px"] : "18px"}
                  >
                    Доставка
                  </Text>
                  <Image
                    src={whiteArrow}
                    height={"32px"}
                    transform={isPressed[0] ? "rotate(90deg)" : null}
                    transition={"0.2s"}
                  />
                </HStack>
                <Collapse in={isPressed[0]}>
                  <VStack padding={"10px 0"}>
                    <Text
                      color={"white"}
                      fontSize={width <= 600 ? ["14px", "16px"] : "16px"}
                    >
                      {redact(policy[0].text)}
                    </Text>
                  </VStack>
                </Collapse>
              </VStack>

              <VStack
                align={"flex-start"}
                padding={"0 20px"}
                width={"100%"}
                backgroundColor={"rgba(8,8,8,1)"}
                borderRadius={"13px"}
                marginTop={"10px"}
              >
                <HStack
                  height={"50px"}
                  width={"100%"}
                  justify={"space-between"}
                  cursor={"pointer"}
                  onClick={() => {
                    let copyIsPressed = Array.from(isPressed);
                    copyIsPressed[1] = !copyIsPressed[1];
                    setIsPressed(copyIsPressed);
                  }}
                >
                  <Text
                    color={"white"}
                    fontSize={width <= 600 ? ["16px", "18px"] : "18px"}
                  >
                    Детали
                  </Text>
                  <Image
                    src={whiteArrow}
                    height={"32px"}
                    transform={isPressed[1] ? "rotate(90deg)" : null}
                    transition={"0.2s"}
                  />
                </HStack>
                <Collapse in={isPressed[1]}>
                  <VStack padding={"10px 0"}>
                    <Text
                      color={"white"}
                      fontSize={width <= 600 ? ["14px", "16px"] : "16px"}
                    >
                      {obj?.description}
                    </Text>
                  </VStack>
                </Collapse>
              </VStack>

              <VStack
                align={"flex-start"}
                padding={"0 20px"}
                width={"100%"}
                backgroundColor={"rgba(8,8,8,1)"}
                borderRadius={"13px"}
                marginTop={"10px"}
              >
                <HStack
                  height={"50px"}
                  width={"100%"}
                  justify={"space-between"}
                  cursor={"pointer"}
                  onClick={() => {
                    let copyIsPressed = Array.from(isPressed);
                    copyIsPressed[2] = !copyIsPressed[2];
                    setIsPressed(copyIsPressed);
                  }}
                >
                  <Text
                    color={"white"}
                    fontSize={width <= 600 ? ["16px", "18px"] : "18px"}
                  >
                    Гарантия
                  </Text>
                  <Image
                    src={whiteArrow}
                    height={"32px"}
                    transform={isPressed[2] ? "rotate(90deg)" : null}
                    transition={"0.2s"}
                  />
                </HStack>
                <Collapse in={isPressed[2]}>
                  <VStack padding={"10px 0"}>
                    <Text
                      color={"white"}
                      fontSize={width <= 600 ? ["14px", "16px"] : "16px"}
                    >
                      {redact(policy[1].text)}
                    </Text>
                  </VStack>
                </Collapse>
              </VStack>
              <HStack
                margin={
                  obj?.type_product == "Розница"
                    ? "40px 0"
                    : !isAddButtonDisabled(obj)
                    ? "40px 0"
                    : "40px 0 0 0"
                }
                width={"100%"}
                justify={
                  pageStore.shop_format == 1 ? "flex-end" : "space-around"
                }
                gap={"20px"}
              >
                <Button
                  borderRadius={"13px"}
                  height={"50px"}
                  w={"100%"}
                  backgroundColor={"rgba(219, 105, 0, 1)"}
                  color={"white"}
                  fontSize={width <= 600 ? ["16px", "18px"] : "18px"}
                  _hover={{
                    bgColor:
                      selectedSize == "" ? "rgba(219, 105, 0, 1)" : "white",
                    color:
                      selectedSize == "" ? "white" : "rgba(219, 105, 0, 1)",
                    cursor: selectedSize == "" ? "no-drop" : "pointer",
                  }}
                  onClick={() => {
                    if (selectedSize != "") {
                      let copy_cart = Array.from(pageStore.cart);
                      copy_cart.push({ ...obj, size: selectedSize });
                      pageStore.updateCart(copy_cart);
                      setSelectedSize("new");
                      setTimeout(() => setSelectedSize(""), 1000);
                      navigate("/checkout");
                    }
                  }}
                >
                  Купить сейчас
                </Button>
                <Button
                  borderRadius={"13px"}
                  height={"50px"}
                  w={pageStore.shop_format == 1 ? "50%" : "100%"}
                  bgColor={"black"}
                  color={"white"}
                  fontSize={width <= 600 ? ["16px", "18px"] : "18px"}
                  _hover={{
                    bgColor:
                      selectedSize == "" ||
                      (isAddButtonDisabled(obj) && obj?.type_product == "Опт")
                        ? "black"
                        : "white",
                    color:
                      selectedSize == "" ||
                      (isAddButtonDisabled(obj) && obj?.type_product == "Опт")
                        ? "white"
                        : "black",
                    cursor:
                      selectedSize == "" ||
                      (isAddButtonDisabled(obj) && obj?.type_product == "Опт")
                        ? "no-drop"
                        : "pointer",
                  }}
                  onClick={() => {
                    if (
                      isAddButtonDisabled(obj) &&
                      obj?.type_product == "Опт"
                    ) {
                      return;
                    } else if (selectedSize != "") {
                      let copy_cart = Array.from(pageStore.cart);
                      copy_cart.push({ ...obj, size: selectedSize });
                      pageStore.updateCart(copy_cart);
                      setSelectedSize("new");
                      setTimeout(() => setSelectedSize(""), 1000);
                    }
                  }}
                >
                  В корзину
                </Button>
              </HStack>
              {isAddButtonDisabled(obj) && obj?.type_product == "Опт" ? (
                <Text marginBottom={"40px"} color={"red"}>
                  Нельзя добавлять в корзину оригинал и реплику одновременно!
                </Text>
              ) : null}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
});

export default ProductModal;
