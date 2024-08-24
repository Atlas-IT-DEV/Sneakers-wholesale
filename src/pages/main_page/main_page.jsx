import AboutDelivery from "../../components/about_delivery/about_delivery";
import Adress from "../../components/adress/adress";
import BottomMenu from "../../components/bottom_menu/bottom_menu";
import Catalog from "../../components/catalog/catalog";
import CompanyInformation from "../../components/company_information/company_information";
import Delivery from "../../components/delivery/delivery";
import Header from "../../components/header/header";
import SelectCatalog from "../../components/select_catalog/select_catalog";
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
        <SelectCatalog />
        <Catalog />
        <CompanyInformation />
        <Adress />
        <AboutDelivery />
      </main>
    </div>
  );
};
export default MainPage;
