import styles from "./ResultModal.module.css";
const foods = [{ name: "Apple" }, { name: "Banana" }, { name: "Orange" }];
export default function ResultModal() {
  return (
    <div className={styles.resultModalContainer}>
      <p className={styles.resultModalText}>
        Your recommended daily calorie intake is
      </p>
      <p className={styles.resultModalKcal}>
        2800 <span className={styles.resultModalKcalSpan}> kcal</span>
      </p>
      <div className={styles.FoodContainer}>
        <h4 className={styles.FoodListTitle}>Foods you should not eat</h4>
        <ul className={styles.FoodList}>
          {foods.map((food, index) => (
            <li key={index} className={styles.FoodListItem}>
              {index + 1}. {food.name}
            </li>
          ))}
        </ul>
      </div>
      <button className={styles.ModalBtn}>Start losing weight</button>
    </div>
  );
}
