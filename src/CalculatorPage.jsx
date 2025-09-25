import { useState } from 'react';
import CalculatorCalorieForm from './MainPage/DailyCalories';
import Modal from './Modal';
import Logo from './Logo';
import styles from './CalculatorPage.module.css';

const CalculatorPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Logo />
          <button
            onClick={() => setIsMenuOpen(true)}
            className={styles.hamburgerButton}
            aria-label="Open menu"
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>
        </div>
      </header>

      <div className={styles.container}>
        <CalculatorCalorieForm />
      </div>

      <div className={styles.group28}>
        {/* Group 28 içeriği */}
      </div>

      <Modal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      >
        <h2 className={styles.diaryTitle}>Diary<br /><br /><br /><span className={styles.calculatorSpan}>Calculator</span></h2>
      </Modal>
    </div>
  );
};

export default CalculatorPage;