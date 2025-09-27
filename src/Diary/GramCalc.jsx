import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./GramCalc.module.css";
import logo from "../assets/logo.png";

export default function GramCalc({
  title = "Nic",
  onMenuClick,
  onBack,
  onExit,
  onAdd,
  pending = false,
}) {
  const [name, setName] = useState("");
  const [grams, setGrams] = useState("");
  const [touched, setTouched] = useState({ name: false, grams: false });

  // validations
  const nameOk = name.trim().length >= 2;
  const gramsNum = parseFloat(grams.replace(",", "."));
  const gramsOk = !isNaN(gramsNum) && gramsNum > 0;
  const canSubmit = nameOk && gramsOk && !pending;

  const nameRef = useRef(null);
  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const submit = (e) => {
    e.preventDefault();
    setTouched({ name: true, grams: true });
    if (!canSubmit) return;
    onAdd?.({ name: name.trim(), grams: gramsNum });
  };

  return (
    <div className={styles.Page}>
      {/*Brand Bar*/}
      <div className={styles.BrandBar}>
        <img src={logo} alt="SlimMom" className={styles.BrandLogo} />
        <button
          type="button"
          className={styles.Hamburger}
          onClick={onMenuClick}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Sub Navbar*/}
      <div className={styles.Navbar}>
        <button
          type="button"
          className={styles.BackBtn}
          onClick={onBack}
          aria-label="Back"
        >
          ←
        </button>
        <div className={styles.NavDivider}>
          <div className={styles.NavTitle}>{title}</div>
          <button type="button" className={styles.ExitBtn} onClick={onExit}>
            Exit
          </button>
        </div>
      </div>

      {/*Form  */}
      <form className={styles.Form} onSubmit={submit} noValidate>
        <label className={styles.Label} htmlFor="name">

        </label>
        <input
          id="name"
          ref={nameRef}
          type="text"
          placeholder="Enter product name"
          className={`${styles.Input} ${
            touched.name && !nameOk ? styles.InputError : ""
          }`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, name: true }))}
        />
        {touched.name && !nameOk && (
          <p className={styles.Error}>Please enter at least 2 characters.</p>
        )}

        <label className={styles.Label} htmlFor="grams">
         
        </label>
        <input
          id="grams"
          type="number"
          step="0.1"
          min="0"
          placeholder="Grams"
          className={`${styles.Input} ${
            touched.grams && !gramsOk ? styles.InputError : ""
          }`}
          value={grams}
          onChange={(e) => setGrams(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, grams: true }))}
        />
        {touched.grams && !gramsOk && (
          <p className={styles.Error}>Please enter a positive number.</p>
        )}

        <button type="submit" className={styles.AddBtn} disabled={!canSubmit}>
          {pending ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
}
