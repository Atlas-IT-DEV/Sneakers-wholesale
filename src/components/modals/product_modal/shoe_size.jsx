import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  HStack,
  VStack,
  IconButton,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

const defaultSizeTable = [
  { EU: "37,5", US: "5", UK: "4,5", RU: "36", mm: "23" },
  { EU: "38", US: "5,5", UK: "5", RU: "37", mm: "23,5" },
  { EU: "38,5", US: "6", UK: "5,5", RU: "37,5", mm: "24" },
  { EU: "39", US: "6,5", UK: "6", RU: "38", mm: "24,5" },
  { EU: "40", US: "7", UK: "6,5", RU: "39", mm: "25" },
  { EU: "40,5", US: "7,5", UK: "7", RU: "39,5", mm: "25,5" },
  { EU: "41", US: "8", UK: "7,5", RU: "40", mm: "26" },
  { EU: "42", US: "8,5", UK: "8", RU: "41", mm: "26,5" },
];

const ShoeSizePicker = ({ sizeTable = defaultSizeTable, setSelectedSize }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedEU, setSelectedEU] = useState(null);
  const scrollRef = useRef();

  // Обработчик выбора размера
  const handleSizeSelect = (size) => {
    setSelectedEU(size.EU);
    setSelectedSize(size); // Передаем весь объект размера наружу
  };

  // Обработчик подтверждения выбора
  const handleConfirmSelection = () => {
    if (selectedEU) {
      const selectedSizeObj = sizeTable.find((item) => item.EU === selectedEU);
      setSelectedSize(selectedSizeObj); // Передаем выбранный размер наружу
      setIsExpanded(false); // Сворачиваем таблицу
    }
  };

  useEffect(() => {
    if (!isExpanded && scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, [isExpanded]);

  return (
    <Box
      bg="rgb(28, 28, 28)"
      color="white"
      borderRadius="md"
      w="100%"
      position="relative"
    >
      {/* СВЕРНУТО */}
      {!isExpanded && (
        <Box
          w="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Лента размеров */}
          <Box
            ref={scrollRef}
            overflowX="auto"
            maxW="70%"
            pr={2}
            css={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            sx={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <HStack spacing={1}>
              {sizeTable.map((item) => (
                <Box
                  key={item.EU}
                  px={3}
                  py={1}
                  borderRadius="md"
                  whiteSpace="nowrap"
                  border={
                    selectedEU === item.EU
                      ? "2px solid rgb(219, 105, 0)"
                      : "1px solid transparent"
                  }
                  bg={
                    selectedEU === item.EU
                      ? "rgba(219, 105, 0, 0.15)"
                      : "transparent"
                  }
                  cursor="pointer"
                  _hover={{ bg: "rgba(255,255,255,0.05)" }}
                  onClick={() => handleSizeSelect(item)}
                >
                  {item.EU}
                </Box>
              ))}
            </HStack>
          </Box>

          {/* Кнопка справа */}
          <IconButton
            icon={<ChevronDownIcon />}
            aria-label="Expand"
            onClick={() => setIsExpanded(true)}
            bg="rgba(219, 105, 0, 1)"
            color="white"
            _hover={{ bg: "rgba(219, 105, 0, 0.9)" }}
            borderRadius="full"
            size="sm"
            ml={2}
          />
        </Box>
      )}

      {/* РАЗВЕРНУТО */}
      {isExpanded && (
        <VStack spacing={3}>
          <Box
            maxH="220px"
            overflowY="auto"
            w="100%"
            borderRadius="md"
            border="1px solid rgba(255,255,255,0.1)"
          >
            <Table variant="unstyled" size="sm">
              <Thead>
                <Tr>
                  {["EU", "US", "UK", "RU", "mm"].map((head) => (
                    <Th key={head} color="gray.300">
                      {head}
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {sizeTable.map((row) => (
                  <Tr
                    key={row.EU}
                    bg={
                      selectedEU === row.EU
                        ? "rgba(219, 105, 0, 0.15)"
                        : "transparent"
                    }
                    cursor="pointer"
                    onClick={() => handleSizeSelect(row)}
                    _hover={{ bg: "rgba(255,255,255,0.05)" }}
                  >
                    <Td fontWeight={selectedEU === row.EU ? "bold" : "normal"}>
                      {row.EU}
                    </Td>
                    <Td>{row.US}</Td>
                    <Td>{row.UK}</Td>
                    <Td>{row.RU}</Td>
                    <Td>{row.mm} mm</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          {/* Кнопка свернуть */}
          <HStack justify="space-between" w="100%">
            <IconButton
              icon={<ChevronUpIcon />}
              aria-label="Collapse"
              onClick={() => setIsExpanded(false)}
              bg="rgba(219, 105, 0, 1)"
              color="white"
              _hover={{ bg: "rgba(219, 105, 0, 0.9)" }}
              borderRadius="full"
              size="sm"
            />

            <Button
              colorScheme="orange"
              bg="rgb(219, 105, 0)"
              _hover={{ bg: "rgba(219, 105, 0, 0.9)" }}
              color="white"
              onClick={handleConfirmSelection}
              isDisabled={!selectedEU}
            >
              Выбрать размер {selectedEU && `EU ${selectedEU}`}
            </Button>
          </HStack>
        </VStack>
      )}

      {/* Подпись и кнопка выбора */}
      <Box mt={4}>
        {/* <Text fontSize="sm" color="gray.300">
          🛡 Этот товар можно вернуть, если он вам не подойдёт.{" "}
          <Text
            as="span"
            color="blue.400"
            textDecoration="underline"
            cursor="pointer"
          >
            Как вернуть товар?
          </Text>
        </Text> */}
      </Box>
    </Box>
  );
};

export default ShoeSizePicker;
