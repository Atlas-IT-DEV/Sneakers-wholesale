import ArrowOrange from "../../images/orange_arrow.svg";
import moneyIcon from "../../images/money_icon.svg";
import { VStack, HStack, Text } from "@chakra-ui/react";

const ScoresCard = () => {
  return (
    <VStack
      backgroundColor={"rgb(8, 8, 8)"}
      borderRadius={"28px"}
      padding={"14px 28px"}
      gap={"12px"}
      cursor={"pointer"}
    >
      <HStack width={"100%"} justify={"space-between"}>
        <Text
          fontFamily={"TTForsTrialVariable"}
          color={" rgba(227, 110, 0, 1)"}
          fontSize={"17px"}
          fontWeight={600}
        >
          Баллы
        </Text>
        <img src={ArrowOrange} alt="" />
      </HStack>
      <HStack width={"100%"} justify={"space-between"} align={"flex-end"}>
        <img src={moneyIcon} alt="" />
        <Text
          fontFamily={"TTForsTrialVariable"}
          color={" rgba(227, 110, 0, 1)"}
          fontSize={"17px"}
          fontWeight={600}
        >
          300
        </Text>
      </HStack>
    </VStack>
  );
};

export default ScoresCard;
