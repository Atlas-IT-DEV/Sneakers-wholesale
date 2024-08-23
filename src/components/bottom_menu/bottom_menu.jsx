import styles from "./bottom_menu.module.css";
import homeIcon from "../../images/home.png";
import catalogIcon from "../../images/catalog.png";
import favouriteIcon from "../../images/fav.png";
import shoppingCartIcon from "../../images/shopping_cart_inactive.png";

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
