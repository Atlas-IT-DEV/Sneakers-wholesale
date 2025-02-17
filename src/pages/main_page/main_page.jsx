import { useStores } from "../../store/store_context";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import AboutDelivery from "../../components/about_delivery/about_delivery";
import Adress from "../../components/adress/adress";
import BottomMenu from "../../components/bottom_menu/bottom_menu";
import CompanyInformation from "../../components/company_information/company_information";
import Header from "../../components/header/header";
import SelectCatalog from "../../components/select_catalog/select_catalog";
import SliderCarousel from "../../components/slider_carousel/slider_carousel";

import styles from "./main_page.module.css";
import CommentsSlider from "../../components/comments_slider";

const MainPage = observer(() => {
  const { pageStore } = useStores();
  const tg = window.Telegram.WebApp;

  const signUp = async (first_name, last_name, tg_id) => {
    await pageStore.signUp(first_name, last_name, tg_id);
  };
  const signIn = async (tg_id) => {
    await pageStore.signIn(tg_id);
  };

  const register = async () => {
    await signIn(tg.initDataUnsafe?.user?.id);
    pageStore.token && (await pageStore.getCurrentAuthUser());
    if (!pageStore.token) {
      await signUp(
        tg.initDataUnsafe?.user?.first_name,
        tg.initDataUnsafe?.user?.last_name,
        tg.initDataUnsafe?.user?.id
      );
      pageStore.token && (await signIn(tg.initDataUnsafe?.user?.id));
      pageStore.token && (await pageStore.getCurrentAuthUser());
    }
  };

  useEffect(() => {
    register();
    pageStore.getProducts();
    pageStore.getCompanys();
    pageStore.getChars();
    pageStore.getFavouriteByUserIdFull();
    pageStore.getAllComments();
  }, []);

  return (
    <div className={styles.container}>
      <header>
        <Header />
      </header>

      <div className={styles.carousel}>
        <SliderCarousel />
      </div>
      <main>
        <SelectCatalog />
        <CompanyInformation />
        <Adress />
        <AboutDelivery />
        <CommentsSlider></CommentsSlider>
      </main>
      <BottomMenu />
    </div>
  );
});
export default MainPage;
