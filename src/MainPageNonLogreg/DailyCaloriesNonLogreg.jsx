import { useState } from 'react';
import styles from './DailyCaloriesNonLogreg.module.css';
import bananaImg from '../assets/banana.png';
import strawberryImg from '../assets/strawberry.png';
import leafImg from '../assets/nonlogleaf.png';
import grayVector from '../assets/grayvector.svg';

const DailyCaloriesNonLogreg = () => {
  const [formData, setFormData] = useState({
    height: '',
    age: '',
    currentWeight: '',
    desiredWeight: '',
    bloodType: '1'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Form submit logic here
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

            <div className={styles.radioField}>
              <label>Blood type *</label>
              <div className={styles.radioOptions}>
                {['1', '2', '3', '4'].map(type => (
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

      {/* Tablet Design Elements (İkinci Resim - Header + Multiple Leaves) */}
      <section className={styles.tabletDesign}>
        <div className={styles.headerArea}>
          <div className={styles.logoArea}>SlimMom</div>
          <div className={styles.authButtons}>
            <span>LOG IN</span>
            <span>REGISTRATION</span>
          </div>
        </div>
        
        <div className={styles.tabletDecorations}>
          <img src={leafImg} alt="leaf-main" className={styles.leafMain} />
          <img src={leafImg} alt="leaf-small-1" className={styles.leafSmall1} />
          <img src={leafImg} alt="leaf-small-2" className={styles.leafSmall2} />
          <img src={leafImg} alt="leaf-small-3" className={styles.leafSmall3} />
          <img src={bananaImg} alt="banana" className={styles.bananaTablet} />
          <img src={strawberryImg} alt="strawberry" className={styles.strawberryTablet} />
          <img src={grayVector} alt="background" className={styles.backgroundTablet} />
        </div>
      </section>

      {/* Desktop Design Elements (İlk Resim - Simple Layout) */}
      <section className={styles.desktopDesign}>
        <div className={styles.desktopDecorations}>
          <img src={leafImg} alt="leaf" className={styles.leafDesktop} />
          <img src={strawberryImg} alt="strawberry" className={styles.strawberryDesktop} />
          <img src={bananaImg} alt="banana" className={styles.bananaDesktop} />
          <img src={grayVector} alt="background" className={styles.backgroundDesktop} />
        </div>
      </section>
    </div>
  );
};

export default DailyCaloriesNonLogreg;