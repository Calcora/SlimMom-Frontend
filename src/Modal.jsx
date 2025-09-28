import React, { useEffect } from 'react';
import logo from './assets/logo.png';
import styles from './Modal.module.css';

const Modal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleOverlayClick = (e) => {
      if (e.target.classList.contains(styles.overlay)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('click', handleOverlayClick);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleOverlayClick);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
            <img src={logo} alt="SlimMom" className={styles.logo} />
            <div className={styles.userInfo}>
              <span>Nic</span>
              <div className={styles.verticalLine}></div>
              <span>Exit</span>
            </div>
            <button className={styles.closeButton} onClick={onClose}>
              ×
            </button>
          </div>
        <div className={styles.content}>
          <h1 className={styles.title}>
            <div>Diary</div>
            <div><span>Calculator</span></div>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Modal;