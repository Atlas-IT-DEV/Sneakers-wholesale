import { VStack } from "@chakra-ui/react";

const PageContainer = ({ children }) => {
  return (
    <VStack width={"100%"} minH={"100vh"} minW={"100vw"}>
      {children}
    </VStack>
  );
};

export default PageContainer;
