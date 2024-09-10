import BottomMenu from "../../components/bottom_menu/bottom_menu";
import styles from "./favourite_page.module.css";

const FavouritesPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.namePageText}>Избранное</p>
      </div>
      <BottomMenu />
    </div>
  );
};
export default FavouritesPage;
