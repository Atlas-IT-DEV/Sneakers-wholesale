import styles from "./bottom_menu.module.css";
import homeIcon from "../../images/home.svg";
import catalogIcon from "../../images/catalog.svg";
import favouriteIcon from "../../images/fav.svg";
import shoppingCartIcon from "../../images/shopping_cart_inactive.svg";

import useWindowDimensions from "../hooks/windowDimensions";
import { useNavigate } from "react-router";

const BottomMenu = () => {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
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
      <img src={catalogIcon} alt="" onClick={() => navigate("/catalog")}/>
      <img src={favouriteIcon} alt="" onClick={() => navigate("/favourites")}/>
      <img src={shoppingCartIcon} alt="" onClick={() => navigate("/cart")} />
    </div>
  );
};

export default BottomMenu;
