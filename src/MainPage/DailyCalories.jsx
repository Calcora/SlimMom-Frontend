import { useState } from "react";
import styles from "./DailyCalories.module.css";

const DailyCaloriesForm = () => {
  const [formData, setFormData] = useState({
    height: "",
    age: "",
    currentWeight: "",
    desiredWeight: "",
    bloodType: "1",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>
        Calculate your daily calorie intake right now
      </h2>

      <div className={styles.inputGroup}>
        <label>Height *</label>
        <input
          type="number"
          name="height"
          value={formData.height}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Age *</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Current weight *</label>
        <input
          type="number"
          name="currentWeight"
          value={formData.currentWeight}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Desired weight *</label>
        <input
          type="number"
          name="desiredWeight"
          value={formData.desiredWeight}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.radioGroup}>
        <label>Blood type *</label>
        <div className={styles.radios}>
          {[1, 2, 3, 4].map((num) => (
            <label key={num} className={styles.radioItem}>
              <input
                type="radio"
                name="bloodType"
                value={num}
                checked={formData.bloodType === String(num)}
                onChange={handleChange}
              />
              <span>{num}</span>
            </label>
          ))}
        </div>
      </div>

      <button type="submit" className={styles.button}>
        Start losing weight
      </button>
    </form>
  );
};

export default DailyCaloriesForm;
