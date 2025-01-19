import { VStack, Text } from "@chakra-ui/react";
import { useStores } from "../../store/store_context";
import { observer } from "mobx-react-lite";

const Categories = observer(({ name_category = "", id = 0 }) => {
  const { pageStore } = useStores();
  return (
    <VStack
      backgroundColor={
        pageStore.selected_companys.includes(name_category) ? "white" : "black"
      }
      margin={"25px 0 0 25px"}
      borderRadius={"13px"}
      cursor={"pointer"}
      padding={"10px 20px 10px 20px"}
      wrap={"nowrap"}
      color={
        pageStore.selected_companys.includes(name_category) ? "black" : "white"
      }
      _hover={{
        backgroundColor: "transparent",
        color: "white",
      }}
      onClick={() => {
        if (pageStore.selected_companys.includes(name_category)) {
          pageStore.updateSelectedCompanys(
            Array.from(pageStore.selected_companys).filter(
              (elem) => elem != name_category
            )
          );
        } else {
          let copy_selected_companys = Array.from(pageStore.selected_companys);
          copy_selected_companys.push(name_category);
          pageStore.updateSelectedCompanys(copy_selected_companys);
        }
      }}
    >
      <Text whiteSpace={"nowrap"}>{name_category}</Text>
    </VStack>
  );
});

export default Categories;
