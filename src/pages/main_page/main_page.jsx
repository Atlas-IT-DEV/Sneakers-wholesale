import BottomMenu from "../../components/bottom_menu/bottom_menu";
import Header from "../../components/header/header";
import SliderCarousel from "../../components/slider_carousel/slider_carousel";
import styles from "./main_page.module.css";

const MainPage = () => {
  return (
    <div className={styles.container}>
      <header>
        <Header />
      </header>
      <main>
        <SliderCarousel />
      </main>
      <BottomMenu />
    </div>
  );
};
export default MainPage;
