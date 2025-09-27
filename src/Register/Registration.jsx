import { useState } from "react";
import styles from "./Registration.module.css";
import mobilLogo from "./assets/mobilLogo.png";
import tabletLogo from "./assets/logo.png";

export default function Register({ onSubmit, onSwitchTab }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const canSubmit = name.trim() && email.trim() && password.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit?.({ name, email, password });
  };

  return (
    <div className={styles.registrationWrap}>
      {/* HEADER */}
      <div className={styles.registrationHeader}>
        <div className={styles.registrationLogo}>
          <picture>
            <source media="(min-width: 1200px)" srcSet={tabletLogo} />
            <source media="(min-width: 768px)" srcSet={tabletLogo} />
            <img
              src={mobilLogo}
              alt="SlimMom"
              className={styles.logoImg}
              width="120"
              height="28"
              decoding="async"
            />
          </picture>
        </div>

        {/* Tabs: REGISTRATION aktif */}
        <div
          className={styles.registrationHeaderTabs}
          role="tablist"
          aria-label="Auth tabs"
        >
          <button
            type="button"
            role="tab"
            aria-selected="false"
            className={styles.registrationTab}
            onClick={() => onSwitchTab?.("login")}
          >
            LOG IN
          </button>
          <button
            type="button"
            role="tab"
            aria-selected="true"
            className={`${styles.registrationTab} ${styles.registrationActive}`}
          >
            REGISTRATION
          </button>
        </div>
      </div>

      {/* FORM */}
      <form
        className={styles.registrationForm}
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className={styles.registrationTitle}>REGISTRATION</h2>

        <label className={styles.registrationLabel} htmlFor="name">
          Name *
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          className={styles.registrationInput}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className={styles.registrationLabel} htmlFor="email">
          Email *
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className={styles.registrationInput}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className={styles.registrationLabel} htmlFor="password">
          Password *
        </label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          className={styles.registrationInput}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className={styles.registrationBtnAll}>
          <button
            type="submit"
            className={styles.registrationPrimaryBtn}
            disabled={!canSubmit}
          >
            Register
          </button>

          <button
            type="button"
            className={styles.registrationOutlineBtn}
            onClick={() => onSwitchTab?.("login")}
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}
