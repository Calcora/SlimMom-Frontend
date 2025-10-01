import { useState } from "react";
import styles from "./Calculator.module.css";

const Calculator = () => {
  const [formData, setFormData] = useState({
    height: "",
    age: "",
    currentWeight: "",
    desiredWeight: "",
    bloodType: "1",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Form submit logic here
  };

  const summaryData = {
    date: "13.08.2023",
    stats: [
      { label: "Left", value: "000 kcal" },
      { label: "Consumed", value: "000 kcal" },
      { label: "Daily rate", value: "000 kcal" },
      { label: "n% of normal", value: "000 kcal" },
    ],
  };

  return (
    <div className={styles.contentWrapper}>
      {/* Form Section */}
      <section className={styles.formSection}>
        <h1 className={styles.title}>
          Calculate your daily calorie intake right now
        </h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            {/* Height */}
            <div className={styles.inputField}>
              <label htmlFor="height">Height *</label>
              <input
                type="number"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Age */}
            <div className={styles.inputField}>
              <label htmlFor="age">Age *</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Current weight */}
            <div className={styles.inputField}>
              <label htmlFor="currentWeight">Current weight *</label>
              <input
                type="number"
                id="currentWeight"
                name="currentWeight"
                value={formData.currentWeight}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Desired weight */}
            <div className={styles.inputField}>
              <label htmlFor="desiredWeight">Desired weight *</label>
              <input
                type="number"
                id="desiredWeight"
                name="desiredWeight"
                value={formData.desiredWeight}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Blood type */}
            <div className={styles.radioField}>
              <label>Blood type *</label>
              <div className={styles.radioOptions}>
                {["1", "2", "3", "4"].map((type) => (
                  <label key={type} className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="bloodType"
                      value={type}
                      checked={formData.bloodType === type}
                      onChange={handleInputChange}
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>
            Start losing weight
          </button>
        </form>
      </section>

      {/* Summary Section - Mobile/Tablet */}
      <section className={styles.summaryMobile}>
        <div className={styles.summaryContent}>
          <div className={styles.summaryLeft}>
            <h2 className={styles.summaryTitle}>
              Summary for {summaryData.date}
            </h2>
            <ul className={styles.statsList}>
              {summaryData.stats.map((stat, index) => (
                <li key={index}>
                  <span className={styles.statLabel}>{stat.label}</span>
                  <span className={styles.statValue}>{stat.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.summaryRight}>
            <h2 className={styles.summaryTitle}>Food not recommended</h2>
            <p className={styles.dietText}>Your diet will be displayed here</p>
          </div>
        </div>
      </section>

      {/* Summary Sidebar - Desktop */}
      <aside className={styles.summaryDesktop}>
        <h2 className={styles.summaryTitle}>Summary for {summaryData.date}</h2>
        <ul className={styles.statsList}>
          {summaryData.stats.map((stat, index) => (
            <li key={index}>
              <span className={styles.statLabel}>{stat.label}</span>
              <span className={styles.statValue}>{stat.value}</span>
            </li>
          ))}
        </ul>

        <h2 className={styles.summaryTitle}>Food not recommended</h2>
        <p className={styles.dietText}>Your diet will be displayed here</p>
      </aside>
    </div>
  );
};

export default Calculator;
