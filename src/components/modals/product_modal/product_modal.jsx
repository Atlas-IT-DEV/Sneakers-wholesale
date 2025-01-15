import styles from "./product_modal.module.css";

import favouriteInactiveIcon from "../../../images/favourite_inactive_icon.svg";
import favouriteActiveIcon from "../../../images/favourite_active_icon.svg";
import backArrow from "../../../images/arrow_right_icon.svg";
import whiteArrow from "./../../../images/arrow_select_white.svg";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import "swiper/css/navigation";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import useWindowDimensions from "../../hooks/windowDimensions";
import { useStores } from "../../../store/store_context";
import { useNavigate } from "react-router";

import no_photo from "./../../../images/tiger_big_logo.jpg";
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
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

const ProductModal = observer(
  ({
    price = 18400,
    old_price = 18400,
    count = "8 пар (опт)",
    model_name = "Gel Quantum Kinetic",
    brand_name = "Asics",
    obj = {},
  }) => {
    const { width, height } = useWindowDimensions();
    const navigate = useNavigate();

    const { pageStore } = useStores();
    //доставка, детали, гарантия
    const [isPressed, setIsPressed] = useState([false, false, false]);

    const [modalVisible, setModalVisible] = useState(false);
    const toast = useToast();

    const createFavourite = async (product_id) => {
      await pageStore.createFavourite(product_id);
    };

    const deleteFavourite = async (fav_id) => {
      const response = await fetch(
        `https://reed-shop.ru:8088/favorites/${fav_id}`,
        {
          method: "DELETE",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${pageStore.token}`,
          },
        }
      );
      console.log("delete", response);
    };

    console.log("favs", pageStore.favourites);

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

    useEffect(() => {
      modalVisible && console.log("fav", pageStore.favourites);
    }, [pageStore.favourites, modalVisible]);

    const [selectedSize, setSelectedSize] = useState("");

    const { isOpen, onOpen, onClose } = useDisclosure();
    const modalRef = useRef(null);

    useEffect(() => {
      modalVisible && console.log("find", findFavourite());
    }, [pageStore.favourites, isOpen]);

    // размерная сетка
    const [isOpenGrid, setIsOpenGrid] = useState(false);

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
              // setModalVisible(true);
              onOpen();
            }}
          >
            {obj.urls.length != 0 ? (
              obj.urls.map((elem, index) => {
                return (
                  <SwiperSlide className={styles.slider} key={index}>
                    <img
                      src={elem?.url}
                      alt=""
                      className={styles.imageProduct}
                    />
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
            ) : (
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
            )}
          </Swiper>
        </div>

        <Modal
          isOpen={isOpen}
          onClose={onClose}
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
              {/* <VStack align={"flex-start"} position={"relative"}> */}
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
                onClick={() => {
                  setModalVisible(true);
                }}
              >
                <Stack
                  position={"absolute"}
                  zIndex={100}
                  left={"20px"}
                  top={"20px"}
                  cursor={"pointer"}
                  onClick={() => {
                    setSelectedSize("");
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
                {obj.urls.length != 0 ? (
                  obj.urls.map((elem) => (
                    <SwiperSlide className={styles.slideProduct}>
                      <Image
                        src={elem?.url || no_photo}
                        // maxHeight={"300px"}
                        width={width}
                      />
                    </SwiperSlide>
                  ))
                ) : (
                  <SwiperSlide className={styles.slideProduct}>
                    {/* <img src={no_photo} alt="" className={styles.imageProduct} /> */}
                    <Image src={no_photo} width={width} objectFit={"fill"} />
                  </SwiperSlide>
                )}
              </Swiper>
              <VStack width={"100%"} padding={"0 20px"} align={"flex-start"}>
                <HStack
                  width={"100%"}
                  justifyContent={"space-between"}
                  align={"end"}
                  marginTop={"14px"}
                >
                  <Text
                    color={"white"}
                    fontSize={width <= 600 ? ["16px", "18px"] : "18px"}
                  >
                    {parseInt(obj?.price)} ₽
                  </Text>
                </HStack>
                <Text
                  color={"white"}
                  marginTop={"10px"}
                  fontSize={width <= 600 ? ["16px", "18px"] : "18px"}
                >
                  {obj?.name}
                </Text>
                {/* <p className={styles.modelNameText}>{obj?.name}</p> */}
                {/* <p>{obj.company.name}</p> */}
                <Text
                  color={"white"}
                  fontWeight={500}
                  fontSize={width <= 600 ? ["16px", "18px"] : "18px"}
                  _hover={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  {obj?.company?.name}
                </Text>
                {/* <div className={styles.sizesHeader}>
              <p className={styles.sizeHeaderText}>Размеры (EU)</p>
              <p className={styles.gridText}>Размерная сетка</p>
            </div> */}
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
                  <Text
                    color={"rgba(155,155,155,1)"}
                    cursor={"pointer"}
                    textDecoration={"underline"}
                    fontSize={width <= 600 ? ["14px", "16px"] : "16px"}
                    onClick={() => setIsOpenGrid(!isOpenGrid)}
                  >
                    Размерная сетка
                  </Text>
                </HStack>
                <Collapse in={isOpenGrid}>
                  <HStack>
                    <TableContainer>
                      <Table>
                        <Thead>
                          <Th
                            borderRight={"1px solid white"}
                            color={"rgba(219, 105, 0, 1)"}
                            textAlign={"end"}
                            fontSize={"14px"}
                          >
                            Взрослым
                          </Th>
                          <Th></Th>
                          <Th></Th>
                          <Th></Th>
                          <Th></Th>
                          <Th></Th>
                          <Th></Th>
                          <Th></Th>
                          <Th></Th>
                          <Th></Th>
                          <Th></Th>
                          <Th></Th>
                          <Th></Th>
                          <Th></Th>
                          <Th></Th>
                        </Thead>

                        <Tbody color={"white"}>
                          <Tr>
                            <Td
                              borderRight={"1px solid white"}
                              textAlign={"end"}
                            >
                              Размер EU
                            </Td>
                            <Td>35,5</Td>
                            <Td>36</Td>
                            <Td>36,5</Td>
                            <Td>37</Td>
                            <Td>37,5</Td>
                            <Td>38</Td>
                            <Td>38,5</Td>
                            <Td>39</Td>
                            <Td>40</Td>
                            <Td>40,5</Td>
                            <Td>41</Td>
                            <Td>42</Td>
                            <Td>42,5</Td>
                            <Td>43</Td>
                            <Td>44</Td>
                            <Td>44,5</Td>
                            <Td>45</Td>
                            <Td>46</Td>
                            <Td>46,5</Td>
                            <Td>47</Td>
                          </Tr>
                          <Tr>
                            <Td borderRight={"1px solid white"}>
                              Длина стопы, см
                            </Td>
                            <Td>22,1</Td>
                            <Td>22,5</Td>
                            <Td>22,9</Td>
                            <Td>23,3</Td>
                            <Td>23,8</Td>
                            <Td>24,2</Td>
                            <Td>24,6</Td>
                            <Td>25</Td>
                            <Td>25,5</Td>
                            <Td>26</Td>
                            <Td>26,3</Td>
                            <Td>26,7</Td>
                            <Td>27,1</Td>
                            <Td>27,6</Td>
                            <Td>28</Td>
                            <Td>28,4</Td>
                            <Td>28,8</Td>
                            <Td>29,3</Td>
                            <Td>29,7</Td>
                            <Td>30,1</Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </HStack>
                </Collapse>
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
                        onClick={() => setSelectedSize(item)}
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
                  borderRadius={"26px"}
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
                        Доставка Доставка Доставка Доставка Доставка Доставка
                        Доставка Доставка Доставка Доставка Доставка Доставка
                      </Text>
                    </VStack>
                  </Collapse>
                </VStack>

                <VStack
                  align={"flex-start"}
                  padding={"0 20px"}
                  width={"100%"}
                  backgroundColor={"rgba(8,8,8,1)"}
                  borderRadius={"26px"}
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
                  borderRadius={"26px"}
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
                        Гарантия Гарантия Гарантия Гарантия Гарантия Гарантия
                        Гарантия Гарантия Гарантия Гарантия Гарантия Гарантия
                      </Text>
                    </VStack>
                  </Collapse>
                </VStack>
                <HStack
                  margin={"40px 0"}
                  width={"100%"}
                  justify={"space-around"}
                  gap={"20px"}
                >
                  <Button
                    borderRadius={"26px"}
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
                  >
                    Купить сейчас
                  </Button>
                  <Button
                    borderRadius={"26px"}
                    height={"50px"}
                    w={"100%"}
                    bgColor={"black"}
                    color={"white"}
                    fontSize={width <= 600 ? ["16px", "18px"] : "18px"}
                    _hover={{
                      bgColor: selectedSize == "" ? "black" : "white",
                      color: selectedSize == "" ? "white" : "black",
                      cursor: selectedSize == "" ? "no-drop" : "pointer",
                    }}
                    onClick={() => {
                      if (selectedSize != "") {
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
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    );
  }
);

export default ProductModal;
