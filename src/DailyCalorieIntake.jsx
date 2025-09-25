import styles from './DailyCalorieIntake.module.css';

const DailyCalorieIntake = ({ calories }) => {
  return (
    <div className={styles.content}>
      <h3>Your recommended daily calorie intake is:</h3>
      <p className={styles.calories}>{calories} kcal</p>
      <p>Based on your data, this is the amount of calories you should consume daily to reach your desired weight.</p>
    </div>
  );
};

export default DailyCalorieIntake;