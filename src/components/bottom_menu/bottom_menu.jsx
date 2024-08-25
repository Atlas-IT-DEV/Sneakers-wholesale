import styles from "./bottom_menu.module.css";
import homeIcon from "../../images/home.svg";
import catalogIcon from "../../images/catalog.svg";
import favouriteIcon from "../../images/fav.svg";
import shoppingCartIcon from "../../images/shopping_cart_inactive.svg";

import useWindowDimensions from "../hooks/windowDimensions";

const BottomMenu = () => {
  const { width } = useWindowDimensions();
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
      <img src={homeIcon} alt="" />
      <img src={catalogIcon} alt="" />
      <img src={favouriteIcon} alt="" />
      <img src={shoppingCartIcon} alt="" />
    </div>
  );
};

export default BottomMenu;
