import styles from "./attention_modal.module.css";
import rightArrowGrayIcon from "../../../images/arrow_select_gray.svg";
import closeIcon from "../../../images/close_icon.svg";
import { useState } from "react";
import useWindowDimensions from "../../hooks/windowDimensions";

import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";

const AttentionModal = ({ name_button = "" }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { width } = useWindowDimensions();
  return (
    <>
      <div
        className={`${
          width >= 585
            ? styles.button585_600
            : width >= 565
            ? styles.button565_585
            : width >= 525
            ? styles.button525_565
            : width >= 485
            ? styles.button485_525
            : width >= 450
            ? styles.button450_485
            : width >= 410
            ? styles.button410_450
            : styles.button375_410
        } ${styles.unActiveButton}`}
        onClick={() => setModalVisible(true)}
      >
        <p className={styles.buttonText}>{name_button}</p>
        <img src={rightArrowGrayIcon} alt="" />
      </div>
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
                Чтобы получить доступ к разделу {name_button} Вам необходимо
                совершить покупку на сумму <br />
                <span>62 929 ₽</span>
              </p>
              <div className={styles.aboutButton}>
                <p>Ознакомиться с условиями</p>
                <img src={rightArrowGrayIcon} alt="" />
              </div>
            </div>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
export default AttentionModal;
