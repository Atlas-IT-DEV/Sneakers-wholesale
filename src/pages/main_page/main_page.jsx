import Adress from "../../components/adress/adress";
import BottomMenu from "../../components/bottom_menu/bottom_menu";
import CompanyInformation from "../../components/company_information/company_information";
import Delivery from "../../components/delivery/delivery";
import Header from "../../components/header/header";
import SliderCarousel from "../../components/slider_carousel/slider_carousel";
import styles from "./main_page.module.css";

const MainPage = () => {
  return (
    <div className={styles.container}>
      <BottomMenu />
      <header>
        <Header />
      </header>

      <div className={styles.carousel}>
        <SliderCarousel />
      </div>
      <main>
        <Delivery />
        <CompanyInformation />
        <Adress />
      </main>
    </div>
  );
};
export default MainPage;
