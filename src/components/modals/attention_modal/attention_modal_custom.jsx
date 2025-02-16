import { useState } from "react";
import useWindowDimensions from "../../hooks/windowDimensions";
import {
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";

import styles from "./attention_modal.module.css";
import closeIcon from "../../../images/close_icon.svg";
import { useStores } from "../../../store/store_context";
import { observer } from "mobx-react-lite";

const AttentionModalCustom = observer(({ ps_obj = {}, children }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { width } = useWindowDimensions();
  const { pageStore } = useStores();
  const orderPS = async () => {
    const mutation = `
      mutation updatePR {
          updateProductSizeOrdered(productId:3, sizeId:1, ordered:false, telegramId:"Alleeoon", nickName:"COCK"){
            id
          }
        }
    `;

    try {
      const response = await fetch("http://reedshop.ru:8208/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: mutation,
        }),
      });

      const result = await response.json();

      if (result.errors) {
        console.error("GraphQL errors:", result.errors);
      } else {
        console.log("Mutation successful:", result.data);
        // Optionally, update the UI or state here
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  return (
    <>
      <div onClick={() => setModalVisible(true)}>{children}</div>
      {modalVisible && (
        <Modal isOpen={modalVisible} isCentered>
          <ModalOverlay bg={"black"} closeOnOverlayClick={false} />
          <ModalContent bg="rgba(28,28,28,1)" borderRadius={27} padding={25}>
            <div
              className={
                width >= 585
                  ? styles.modal585_600
                  : width >= 565
                  ? styles.modal565_585
                  : width >= 525
                  ? styles.modal525_565
                  : width >= 485
                  ? styles.modal485_525
                  : width >= 450
                  ? styles.modal450_485
                  : width >= 410
                  ? styles.modal410_450
                  : styles.modal375_410
              }
            >
              <div
                className={styles.closeButton}
                onClick={() => setModalVisible(false)}
              >
                <img src={closeIcon} alt="" />
              </div>
              <p className={styles.mainText}>
                {ps_obj?.ordered &&
                ps_obj?.telegramId == pageStore.user_info?.telegram_id
                  ? "Товар уже забронирован вами"
                  : ps_obj?.ordered
                  ? "Товар уже забронирован кем-то"
                  : "Забронировать товар?"}
              </p>
              <div className={styles.aboutButton}>
                <p>
                  {ps_obj?.ordered &&
                  ps_obj?.telegramId == pageStore.user_info?.telegram_id
                    ? "Вы можете выбрать другую пару, если в сборе остались доступные размеры"
                    : ps_obj?.ordered
                    ? "Вы можете выбрать другую пару, если в сборе остались доступные размеры"
                    : "Нажмите ок, если вы готовы забронировать товар"}
                </p>
              </div>
              <VStack width={"100%"} align={"center"}>
                <Button
                  backgroundColor={"rgb(219, 105, 0)"}
                  color={"white"}
                  alignSelf={"center"}
                  marginTop={"30px"}
                  onClick={async () => {
                    await orderPS();
                    setModalVisible(false);
                  }}
                >
                  ОК
                </Button>
              </VStack>
            </div>
          </ModalContent>
        </Modal>
      )}
    </>
  );
});
export default AttentionModalCustom;
