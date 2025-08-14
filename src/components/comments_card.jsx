import {
  HStack,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

const CommentCard = ({
  first_name,
  last_name,
  date_comment,
  comment_text,
  images,
  name_product,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [image, setImage] = useState("");
  return (
    <>
      <VStack
        width={"100%"}
        bgColor={"#080808"}
        padding={"20px"}
        borderRadius={"13px"}
        align={"flex-start"}
        gap={0}
        spacing={0}
      >
        <Text color={"gray"} fontSize={"12px"}>
          {new Date(date_comment).toLocaleDateString()}
        </Text>
        <Text color={"rgb(227, 110, 0)"}>
          {first_name} {last_name || ""}
        </Text>
        <HStack
          display={"grid"}
          gridTemplateColumns={"1fr 1fr 1fr"}
          columnGap={"10px"}
          marginTop={"10px"}
        >
          <Image
            src={images[0] || ""}
            borderRadius={"10px"}
            onClick={() => {
              setImage(images[0]);
              onOpen();
            }}
            cursor={"pointer"}
          />
          <Image
            src={images[1] || ""}
            borderRadius={"10px"}
            cursor={"pointer"}
            onClick={() => {
              setImage(images[1]);
              onOpen();
            }}
          />
          <Image
            src={images[2] || ""}
            borderRadius={"10px"}
            cursor={"pointer"}
            onClick={() => {
              setImage(images[2]);
              onOpen();
            }}
          />
        </HStack>
        <Text color={"white"} marginTop={"10px"}>
          {comment_text}
        </Text>
      </VStack>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setImage("");
          onClose();
        }}
        size={"full"}
      >
        <ModalContent backgroundColor={"black"} justifyContent={"center"}>
          <ModalCloseButton
            color={"white"}
            onClick={() => {
              setImage("");
              onClose();
            }}
          />
          <Image src={image} width={"100%"} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default CommentCard;
