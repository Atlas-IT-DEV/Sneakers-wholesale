import styles from "./attention_modal.module.css";
import rightArrowGrayIcon from "../../../images/arrow_select_gray.svg";
import closeIcon from "../../../images/close_icon.svg";
import { useState } from "react";

import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";

const AttentionModal = ({ name_button = "" }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <div
        className={`${styles.button} ${styles.unActiveButton}`}
        onClick={() => setModalVisible(true)}
      >
        <p className={styles.buttonText}>{name_button}</p>
        <img src={rightArrowGrayIcon} alt="" />
      </div>
      {modalVisible && (
        <Modal isOpen={modalVisible} isCentered>
          <ModalOverlay bg={"black"} closeOnOverlayClick={false} />
          <ModalContent bg="rgba(28,28,28,1)" borderRadius={27} padding={25}>
            <div className={styles.modalView}>
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
