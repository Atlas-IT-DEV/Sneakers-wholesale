import styles from "./bottom_menu.module.css";
import homeIcon from "../../images/home.svg";
import catalogIcon from "../../images/catalog.svg";
import favouriteIcon from "../../images/fav.svg";
import shoppingCartIcon from "../../images/shopping_cart_inactive.svg";

import useWindowDimensions from "../hooks/windowDimensions";
import { useNavigate } from "react-router";
import { useStores } from "../../store/store_context";
import { Text, VStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
const BottomMenu = observer(() => {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const { pageStore } = useStores();
  return (
    <div
      className={
        width >= 585
          ? styles.container585_600
          : width >= 565
          ? styles.container565_585
          : width >= 525
          ? styles.container525_565
          : width >= 485
          ? styles.container485_525
          : width >= 450
          ? styles.container450_485
          : width >= 410
          ? styles.container410_450
          : styles.container375_410
      }
    >
      <img src={homeIcon} alt="" onClick={() => navigate("/")} />
      <img src={catalogIcon} alt="" onClick={() => navigate("/catalog")} />
      <VStack position={"relative"}>
        <img
          src={favouriteIcon}
          alt=""
          onClick={() => navigate("/favourites")}
        />
        {pageStore.favourites.length != 0 && (
          <Text
            position={"absolute"}
            color={"rgb(219, 105, 0)"}
            top={0}
            right={0}
            fontWeight={600}
          >
            {pageStore.favourites.length}
          </Text>
        )}
      </VStack>
      <VStack position={"relative"}>
        <img src={shoppingCartIcon} alt="" onClick={() => navigate("/cart")} />
        {pageStore.cart.length != 0 && (
          <Text
            position={"absolute"}
            color={"rgb(219, 105, 0)"}
            top={0}
            right={-2}
            fontWeight={600}
          >
            {pageStore.cart.length}
          </Text>
        )}
      </VStack>
    </div>
  );
});

export default BottomMenu;
