import { useNavigate } from "react-router";
import useWindowDimensions from "../../components/hooks/windowDimensions";
import Filters from "../../components/filters/filters";
import { observer } from "mobx-react-lite";
import { useStores } from "../../store/store_context";

import styles from "./filter_page.module.css";

const FilterPage = observer(() => {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const { pageStore } = useStores();

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
        <div className={styles.closeButton} onClick={() => navigate(-1)}>
          <p>Закрыть</p>
        </div>
        <p className={styles.namePageText}>Фильтры</p>
        <div
          className={styles.selectButton}
          onClick={() => {
            pageStore.updateSelectedChars([]);
            pageStore.updateSelectedCompanys([]);
            pageStore.updateMinMax(["", ""]);
            pageStore.updateSearchStr("");
          }}
        >
          <p className={styles.selectButtonText}>Сбросить всё</p>
        </div>
      </div>
      <div className={styles.filters}>
        <Filters />
      </div>
    </div>
  );
});

export default FilterPage;
