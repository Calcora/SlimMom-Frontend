import { useState } from "react";
import styles from "./Login.module.css";
import mobilLogo from "./assets/logo.png";
import tabletLogo from "./assets/logo.png";

export default function Login({ onSubmit, onSwitchTab }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const canSubmit = email.trim() && password.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit?.({ email, password });
  };

  return (
    <div className={styles.loginWrap}>
      <div className={styles.loginHeader}>
        <div className={styles.loginLogo}>
          <picture>
            {/* 1200px+ için */}
            <source
              media="(min-width: 1200px)"
              srcSet={tabletLogo}
              
            />
            {/* 768px+ için */}
            <source
              media="(min-width: 768px)"
              srcSet={tabletLogo}
             
            />
            {/* Default: mobil */}
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
        <div className={styles.loginHeaderTabs}>
          <button
            type="button"
            className={`${styles.loginTab} ${styles.loginActive}`}
          >
            LOG IN
          </button>

          <button
            type="button"
            className={styles.loginTab}
            onClick={() => onSwitchTab?.("register")}
          >
            REGISTRATION
          </button>
        </div>
      </div>

      <form className={styles.loginForm} onSubmit={handleSubmit} noValidate>
        <h2 className={styles.loginTitle}>LOG IN</h2>

        <label className={styles.loginLabel} htmlFor="email">
          Email *
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className={styles.loginInput}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className={styles.loginLabel} htmlFor="password">
          Password *
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          className={styles.loginInput}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className={styles.loginBtnAll}>
          {" "}
          <button
            type="submit"
            className={styles.loginPrimaryBtn}
            disabled={!canSubmit}
          >
            Log in
          </button>
          <button
            type="button"
            className={styles.loginOutlineBtn}
            onClick={() => onSwitchTab?.("register")}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
