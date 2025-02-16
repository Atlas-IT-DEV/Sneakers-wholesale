import { Stack, Text } from "@chakra-ui/react";
import useWindowDimensions from "./hooks/windowDimensions";
import AttentionModalCustom from "./modals/attention_modal/attention_modal_custom";

const SborOptSize = ({ product_size_obj }) => {
  const { width, height } = useWindowDimensions();

  return (
    <AttentionModalCustom ps_obj={product_size_obj}>
      <Stack
        height={"50px"}
        width={"40px"}
        minWidth={"40px"}
        color={"white"}
        border={
          product_size_obj?.ordered
            ? "2px solid rgba(49, 49, 49, 1)"
            : "1px solid rgb(219, 105, 0)"
        }
        borderRadius={"10px"}
        justifyContent={"center"}
        align={"center"}
        fontSize={width <= 600 ? ["16px", "18px"] : "18px"}
        cursor={product_size_obj?.ordered ? "not-allowed" : "pointer"}
        backgroundColor={"rgba(36, 36, 36, 1)"}
        overflow={"hidden"}
        position={"relative"}
        onClick={() => {}}
      >
        {product_size_obj?.ordered && (
          <div
            style={{
              height: "3px",
              width: "142%",
              position: "absolute",
              margin: "auto 0 auto 0",
              backgroundColor: "rgba(49, 49, 49, 1)",
              transform: "rotateZ(52deg)",
            }}
          ></div>
        )}
        <Text>{product_size_obj?.size?.name}</Text>
      </Stack>
    </AttentionModalCustom>
  );
};
export default SborOptSize;
