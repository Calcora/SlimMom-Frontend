import { useState } from "react";
import styles from "./Login.module.css";
import mobilLogo from "./assets/mobilLogo.png";

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
          <img src={mobilLogo} alt="SlimMom logo" />
        </div>

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
