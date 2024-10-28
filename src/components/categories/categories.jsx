import styles from "./categories.module.css";
import { VStack, Text } from "@chakra-ui/react";
import { useStores } from "../../store/store_context";

const Categories = ({ name_category = "", id = 0 }) => {
  const { pageStore } = useStores();
  return (
    <VStack
      backgroundColor={"black"}
      margin={"25px 0 0 25px"}
      borderRadius={"13px"}
      cursor={"pointer"}
      padding={"10px 20px 10px 20px"}
      wrap={"nowrap"}
      color={"white"}
      _hover={{
        backgroundColor: "white",
        color: "black",
      }}
      onClick={() => {
        if (pageStore.company_filter == id) {
          pageStore.updateCompanyFilter(null);
        } else {
          pageStore.updateCompanyFilter(id);
        }
      }}
    >
      <Text whiteSpace={"nowrap"}>{name_category}</Text>
    </VStack>
  );
};

export default Categories;
