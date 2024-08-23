import BottomMenu from "../../components/bottom_menu/bottom_menu";
import Header from "../../components/header/header";
import styles from "./main_page.module.css";

const MainPage = () => {
  return (
    <div className={styles.container}>
      <header>
        <Header />
      </header>

      <BottomMenu />
    </div>
  );
};
export default MainPage;
