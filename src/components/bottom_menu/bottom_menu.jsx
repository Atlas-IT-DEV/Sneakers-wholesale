import styles from "./bottom_menu.module.css";
import homeIcon from "../../images/home.svg";
import catalogIcon from "../../images/catalog.svg";
import favouriteIcon from "../../images/fav.svg";
import shoppingCartIcon from "../../images/shopping_cart_inactive.svg";

import useWindowDimensions from "../hooks/windowDimensions";

const BottomMenu = () => {
  const {width} = useWindowDimensions();
  console.log(width)
  return (
    <div className={width >= 600 ? styles.containerBig : styles.containerMedium}>
      <img src={homeIcon} alt="" />
      <img src={catalogIcon} alt="" />
      <img src={favouriteIcon} alt="" />
      <img src={shoppingCartIcon} alt="" />
    </div>
  );
};

export default BottomMenu;
