import styles from "./categories.module.css";

const Categories = ({ name_category = "" }) => {
  return (
    <div className={styles.container}>
      <p className={styles.nameCategory}>{name_category}</p>
    </div>
  );
};

export default Categories;
