import Fuse from "fuse.js";
import { VStack, Text } from "@chakra-ui/react";
import useWindowDimensions from "../../components/hooks/windowDimensions";
import { useNavigate } from "react-router";
import { useStores } from "../../store/store_context";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useState } from "react";
import { createClient } from "graphql-ws";

import BottomMenu from "../../components/bottom_menu/bottom_menu";
import ProductCard from "../../components/product_card/product_card";
import Categories from "../../components/categories/categories";
import SborOptCard from "../../components/sbor_opt_card";

import styles from "./catalog_page.module.css";
import sortIcon from "../../images/sort_icon.svg";
import filterIcon from "../../images/filter_icon.svg";

// Создаем клиент для подключения к серверу GraphQL через WebSocket
const client = createClient({
  url: "ws://localhost:8000/graphql", // Замените на адрес вашего сервера
});

const CatalogPage = observer(() => {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const { pageStore } = useStores();
  const formats = ["Розница", "Опт", "Дропшиппинг", "Сборный опт"];

  const tg = window?.Telegram?.WebApp;
  const backButton = tg?.BackButton;
  backButton?.show();
  const back_page = () => {
    navigate("/");
    backButton?.hide();
  };

  const [products, setProducts] = useState([]);
  const [similar, setSimilar] = useState([]);
  backButton?.onClick(back_page);
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
  const [sub_products, setSubProducts] = useState([]);
  const subs = () => {
    client.subscribe(
      {
        query: `
    subscription getPrSub {
      onProductsUpdated {
        id
        sizes {
          id
          size {
            name
          }
          ordered
          telegramId
          nickName
        }
      }
    }
  `,
      },
      {
        next: (data) => {
          setSubProducts(data.data.onProductsUpdated);
        },
        error: (err) => {
          setSubProducts([]);
        },
      }
    );
  };
  useEffect(() => {
    if (pageStore.shop_format == 3) {
      subs();
    }
  }, []);

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
        <div className={styles.searchField}>
          <input
            type="search"
            placeholder="Найти"
            value={pageStore.search_str}
            onChange={(e) => {
              pageStore.updateSearchStr(e.target.value);
            }}
            onSubmit={(e) => {
              e.target.preventDefault();
            }}
          />
        </div>
        <div className={styles.sortButton}>
          <img
            src={sortIcon}
            alt=""
            style={{ cursor: "pointer" }}
            onClick={handleSortClick}
          />
        </div>
        <div
          className={styles.filterButton}
          onClick={() => navigate("/filters")}
        >
          <img src={filterIcon} alt="" />
        </div>
      </div>
      <div className={styles.cateroriesField}>
        {pageStore.companys.map((elem, index) => {
          return (
            <Categories key={index} name_category={elem?.name} id={elem?.id} />
          );
        })}
      </div>

      {pageStore.shop_format == 3 ? (
        <VStack padding={"30px"}>
          {sub_products.map((elem) => (
            <SborOptCard />
          ))}
        </VStack>
      ) : null}
      <div className={styles.products}>
        <div className={styles.productsField}>
          {products.map((elem, index) => {
            return (
              <ProductCard
                key={index}
                price={elem.price}
                model_name={elem.name}
                countProduct=""
                oldPrice={""}
                obj={elem}
              />
            );
          })}
        </div>
      </div>
      {similar.length != 0 && (
        <VStack padding={"0px 30px"}>
          <Text color={"white"} alignSelf={"flex-start"} fontSize={20}>
            Возможно вы искали...
          </Text>
          <div className={styles.products}>
            <div className={styles.productsField}>
              {similar.map((elem, index) => {
                return (
                  <ProductCard
                    key={index}
                    price={elem.price}
                    model_name={elem.name}
                    countProduct=""
                    oldPrice={""}
                    obj={elem}
                  />
                );
              })}
            </div>
          </div>
        </VStack>
      )}
      <BottomMenu />
    </div>
  );
});

export default CatalogPage;
