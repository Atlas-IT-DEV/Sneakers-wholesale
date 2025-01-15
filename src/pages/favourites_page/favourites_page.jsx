import BottomMenu from "../../components/bottom_menu/bottom_menu";
import styles from "./favourite_page.module.css";

// import arrowBackIcon from "../../images/arrow_back_icon.svg";
import sortIcon from "../../images/sort_icon.svg";
import filterIcon from "../../images/filter_icon.svg";
import { useNavigate } from "react-router";
import SelectCatalog from "../../components/select_catalog/select_catalog";
import FavouriteProductCard from "../../components/favourite_product_card/favourite_product_card";
import useWindowDimensions from "../../components/hooks/windowDimensions";
import { useEffect, useState } from "react";
import { useStores } from "../../store/store_context";
import { Text } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import SborOptCard from "../../components/sbor_opt_card";
import Fuse from "fuse.js";

const FavouritesPage = observer(() => {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();

  const tg = window?.Telegram?.WebApp;
  const backButton = tg?.BackButton;
  backButton?.show();
  const back_page = () => {
    navigate("/");
    backButton?.hide();
  };
  backButton?.onClick(back_page);

  const { pageStore } = useStores();

  useEffect(() => {
    pageStore.getFavouriteByUserIdFull();
    console.log("fav", pageStore.favourites);
  }, []);

  const formats = ["Розница", "Опт", "Дропшиппинг", "Сборный опт"];
  const [products, setProducts] = useState([]);
  const [similar, setSimilar] = useState([]);

  const findMatchingProducts = (products, selectedCharacteristics) => {
    return products.filter((product) => {
      // Для каждой характеристики проверяем, есть ли совпадение в product.characteristics
      return selectedCharacteristics.every((selectedChar) =>
        product.characteristics.some(
          (char) =>
            char.id === selectedChar.id && // Совпадает id характеристики
            char.value === selectedChar.value // Совпадает значение
        )
      );
    });
  };

  const sortCatalog = () => {
    let copy_catalog = Array.from(
      pageStore.products.filter(
        (elem) => elem.type_product == formats[pageStore.shop_format]
      )
    );
    if (pageStore.sort_type == 1) {
      copy_catalog = copy_catalog.sort((a, b) => a.price - b.price);
    } else if (pageStore.sort_type == 2) {
      copy_catalog = copy_catalog.sort((a, b) => b.price - a.price);
    }
    if (pageStore.search_str != "") {
      let fuce_copy_catalog = Array.from(copy_catalog);
      copy_catalog = copy_catalog.filter(
        (elem) =>
          elem.name
            .toLowerCase()
            .includes(pageStore.search_str.toLowerCase()) ||
          elem.description
            .toLowerCase()
            .includes(pageStore.search_str.toLowerCase()) ||
          elem.company?.name
            .toLowerCase()
            .includes(pageStore.search_str.toLowerCase())
      );
      const options = {
        keys: ["name", "description"], // Поля для поиска
        threshold: 0.5, // 0 = точное совпадение, 1 = любые совпадения
      };

      const fuse = new Fuse(fuce_copy_catalog, options);
      const result = fuse.search(pageStore.search_str);
      const similarProducts = result
        .map((res) => res.item)
        .filter(
          (el) =>
            !copy_catalog.some(
              (item) => JSON.stringify(el) == JSON.stringify(item)
            )
        );
      console.log(similarProducts);
      setSimilar(similarProducts);
    }
    if (pageStore.selected_chars.length != 0) {
      copy_catalog = findMatchingProducts(
        copy_catalog,
        pageStore.selected_chars
      );
    }
    if (pageStore.min_max[0] != "" && pageStore.min_max[1] != "") {
      copy_catalog = copy_catalog.filter(
        (elem) =>
          Number(elem.price) >= Number(pageStore.min_max[0]) &&
          Number(elem.price) <= Number(pageStore.min_max[1])
      );
    } else if (pageStore.min_max[0] != "" && pageStore.min_max[1] == "") {
      copy_catalog = copy_catalog.filter(
        (elem) => Number(elem.price) >= Number(pageStore.min_max[0])
      );
    } else if (pageStore.min_max[0] == "" && pageStore.min_max[1] != "") {
      copy_catalog = copy_catalog.filter(
        (elem) => Number(elem.price) <= Number(pageStore.min_max[1])
      );
    }
    if (pageStore.selected_companys.length != 0) {
      copy_catalog = copy_catalog.filter((elem) =>
        pageStore.selected_companys.includes(elem.company.name)
      );
    }

    setProducts(copy_catalog);
  };
  const handleSortClick = () => {
    if (pageStore.sort_type < 2) {
      pageStore.updateSortType(pageStore.sort_type + 1);
    } else {
      pageStore.updateSortType(0);
    }
  };
  useEffect(() => {
    sortCatalog();
  }, [
    pageStore.products,
    pageStore.sort_type,
    pageStore.search_str,
    pageStore.selected_chars,
    pageStore.min_max,
    pageStore.selected_companys,
  ]);

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
      <div className={styles.header}>
        <p className={styles.namePageText}>Избранное</p>

        <div className={styles.headerButtons}>
          {/* <div className={styles.backButton}>
            <img src={arrowBackIcon} alt="" />
          </div> */}
          <div className={styles.searchField}>
            <input
              type="search"
              placeholder="Найти"
              value={pageStore.search_str}
              onChange={(e) => pageStore.updateSearchStr(e.target.value)}
              onSubmit={(e) => {
                e.target.preventDefault();
              }}
            />
          </div>
          <div className={styles.sortButton} onClick={handleSortClick}>
            <img src={sortIcon} alt="" />
          </div>
          <div
            className={styles.filterButton}
            onClick={() => navigate("/filters")}
          >
            <img src={filterIcon} alt="" />
          </div>
        </div>
      </div>
      <div className={styles.selector}>
        <SelectCatalog />
      </div>
      <div className={styles.products}>
        {pageStore.favourites.length != 0 &&
        Array.isArray(pageStore.favourites) ? (
          products.map((item, index) => {
            if (
              pageStore.favourites.some((elem) => elem.product.id == item.id)
            ) {
              console.log("item", item);
              return (
                <FavouriteProductCard
                  key={index}
                  name={item?.company?.name}
                  model_name={item?.name}
                  image_product={item?.urls[0]?.url}
                  price={item?.price}
                  shop_type={item?.type_product}
                  obj={item}
                />
              );
            }
          })
        ) : (
          <Text color={"white"} textAlign={"center"}>
            Вы ничего не добавляли в избранное
          </Text>
        )}
        <SborOptCard />
      </div>
      <BottomMenu />
    </div>
  );
});
export default FavouritesPage;
