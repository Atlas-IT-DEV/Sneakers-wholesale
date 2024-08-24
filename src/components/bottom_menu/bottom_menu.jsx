import styles from "./bottom_menu.module.css";
import homeIcon from "../../images/home.svg";
import catalogIcon from "../../images/catalog.svg";
import favouriteIcon from "../../images/fav.svg";
import shoppingCartIcon from "../../images/shopping_cart_inactive.svg";

const BottomMenu = () => {
  return (
    <div className={styles.container}>
      <img src={homeIcon} alt="" />
      <img src={catalogIcon} alt="" />
      <img src={favouriteIcon} alt="" />
      <img src={shoppingCartIcon} alt="" />
    </div>
  );
};

export default BottomMenu;
