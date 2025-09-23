import DailyCalories from "./DailyCalories";
import styles from "./MainPage.module.css";

const MainPage = () => {
  return (
    <div className={styles.container}>
      <DailyCalories />
    </div>
  );
};

export default MainPage;
