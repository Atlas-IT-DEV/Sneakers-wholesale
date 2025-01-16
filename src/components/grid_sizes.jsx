import {
  Box,
  Grid,
  GridItem,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";

const GridSizes = ({ isOpen }) => {
  const containerRef = useRef(null);
  const eu_sizes_adult = [
    "35,5",
    "36",
    "36,5",
    "37",
    "37,5",
    "38",
    "38,5",
    "39",
    "40",
    "40,5",
    "41",
    "42",
    "42,5",
    "43",
    "44",
    "44,5",
    "45",
    "46",
    "46,5",
    "47",
    "48",
  ];

  const length_adult = [
    "22,1",
    "22,5",
    "22,9",
    "23,3",
    "23,8",
    "24,2",
    "24,6",
    "25",
    "25,5",
    "26",
    "26,3",
    "26,7",
    "27,1",
    "27,6",
    "28",
    "28,4",
    "28,8",
    "29,3",
    "29,7",
    "30,1",
    "30,5",
  ];

  const eu_sizes_child = [
    23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
  ];
  const length_child = [
    "14,5",
    "15",
    "15,5",
    "16,5",
    "17",
    "17,5",
    "18,5",
    "19",
    "19,5",
    "20,5",
    "21",
    "21,5",
    "22,5",
    "23",
    "23,5",
  ];

  useEffect(() => {
    if (isOpen && containerRef.current) {
      containerRef.current.scrollLeft = 0;
    }
  }, [isOpen]);
  return (
    <VStack
      ref={containerRef}
      gap={0}
      padding={isOpen ? "10px 0" : 0}
      width={"100%"}
      align={"flex-start"}
      overflowY={"auto"}
      height={isOpen ? "auto" : "0px"} /* Меняем высоту */
      opacity={isOpen ? 1 : 0}
      visibility={isOpen ? "visible" : "hidden"}
      // transition={"opacity 1s, visibility 1s"}
      transition="height 0.5s ease, opacity 1s ease" /* Плавный переход */
    >
      <Text color={"rgba(219, 105, 0, 1)"}>Взрослым</Text>
      <Grid
        templateColumns={`repeat(${eu_sizes_adult.length + 2}, 50px)`}
        templateRows={"repeat(2, 1fr)"}
        // padding={"10px 0"}
      >
        <GridItem colSpan={2} borderBottom={"1px solid white"} height={"48px"}>
          <Text color={"white"} fontWeight={"500"}>
            Размер <br /> EU
          </Text>
        </GridItem>

        {eu_sizes_adult.map((item, index) => (
          <GridItem
            colSpan={1}
            alignContent={"center"}
            alignSelf={"center"}
            borderBottom={"1px solid white"}
            height={"48px"}
            borderLeft={"1px solid white"}
          >
            <Text color={"white"} textAlign={"center"}>
              {item}
            </Text>
          </GridItem>
        ))}
        <GridItem colSpan={2} height={"48px"}>
          <Text color={"white"} fontWeight={"500"}>
            Длина стопы, см
          </Text>
        </GridItem>
        {length_adult.map((item) => (
          <GridItem
            colSpan={1}
            alignContent={"center"}
            alignSelf={"center"}
            height={"48px"}
            borderLeft={"1px solid white"}
          >
            <Text color={"white"} textAlign={"center"}>
              {item}
            </Text>
          </GridItem>
        ))}
      </Grid>
      <Text color={"rgba(219, 105, 0, 1)"} marginTop={"10px"}>
        Детям
      </Text>

      <Grid
        templateColumns={`repeat(${eu_sizes_child.length + 2}, 50px)`}
        templateRows={"repeat(2, 1fr)"}
        // padding={"10px 0"}
      >
        <GridItem colSpan={2} borderBottom={"1px solid white"} height={"48px"}>
          <Text color={"white"} fontWeight={"500"}>
            Размер <br /> EU
          </Text>
        </GridItem>

        {eu_sizes_child.map((item, index) => (
          <GridItem
            colSpan={1}
            alignContent={"center"}
            alignSelf={"center"}
            borderBottom={"1px solid white"}
            borderLeft={"1px solid white"}
            height={"48px"}
          >
            <Text color={"white"} textAlign={"center"}>
              {item}
            </Text>
          </GridItem>
        ))}
        <GridItem colSpan={2} height={"48px"}>
          <Text color={"white"} fontWeight={"500"}>
            Длина стопы, см
          </Text>
        </GridItem>
        {length_child.map((item) => (
          <GridItem
            colSpan={1}
            alignContent={"center"}
            alignSelf={"center"}
            height={"48px"}
            borderLeft={"1px solid white"}
            padding={0}
          >
            <Text color={"white"} textAlign={"center"}>
              {item}
            </Text>
          </GridItem>
        ))}
      </Grid>
    </VStack>
  );
};

export default GridSizes;
