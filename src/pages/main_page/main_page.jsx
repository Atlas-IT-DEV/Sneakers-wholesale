import AboutDelivery from "../../components/about_delivery/about_delivery";
import Adress from "../../components/adress/adress";
import BottomMenu from "../../components/bottom_menu/bottom_menu";
import CompanyInformation from "../../components/company_information/company_information";
import Delivery from "../../components/delivery/delivery";
import Header from "../../components/header/header";
import InviteFriends from "../../components/invite_friends/invite_friends";
import ScoresCard from "../../components/scores_card/scores_card";
import SelectCatalog from "../../components/select_catalog/select_catalog";
import SliderCarousel from "../../components/slider_carousel/slider_carousel";
import styles from "./main_page.module.css";
import { useStores } from "../../store/store_context";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

const MainPage = observer(() => {
  const { pageStore } = useStores();
  useEffect(() => {
    pageStore.getProducts();
    pageStore.getCompanys();
    pageStore.getChars();
    pageStore.getFavouriteByUserIdFull();
  }, []);
  const tg = window.Telegram.WebApp;

  const signUp = async (first_name, last_name, tg_id) => {
    await pageStore.signUp(first_name, last_name, tg_id);
  };
  const signIn = async (tg_id) => {
    await pageStore.signIn(tg_id);
  };

  useEffect(() => {
    console.log(
      tg.initDataUnsafe?.user?.first_name,
      tg.initDataUnsafe?.user?.last_name,
      tg.initDataUnsafe?.user?.id
    );
  }, [tg.initDataUnsafe?.user?.id]);

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
  }, []);

  useEffect(() => {
    console.log("token", pageStore.token);
  }, [pageStore.token]);

  return (
    <div className={styles.container}>
      <header>
        <Header />
      </header>

      <div className={styles.carousel}>
        <SliderCarousel />
      </div>
      <main>
        {/*         <Delivery /> */}
        <SelectCatalog />
        {/*           <div>
            <ScoresCard />
          </div> */}

        <CompanyInformation />
        <Adress />
        <AboutDelivery />
      </main>
      <BottomMenu />
    </div>
  );
});
export default MainPage;
