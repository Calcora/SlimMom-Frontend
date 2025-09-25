import { useState } from "react";
import styles from "./Diary.module.css";
import logo from "./assets/logo.png";

export default function Diary({
  products = [],
  date = new Date(),
  dailyRate = 2800,
  onBack,
  onExit,
  onMenuClick,
  onAddClick, 
  onAdd, 
  onDelete,
}) {
  const [nameInput, setNameInput] = useState("");
  const [gramsInput, setGramsInput] = useState("");

  const fmtDate = (d) => {
    const dd = new Date(d);
    const day = String(dd.getDate()).padStart(2, "0");
    const mon = String(dd.getMonth() + 1).padStart(2, "0");
    const year = dd.getFullYear();
    return `${day}.${mon}.${year}`;
  };

  const itemKcal = (p) => {
    if (typeof p.kcal === "number") return p.kcal;
    if (typeof p.kcalPer100 === "number" && typeof p.grams === "number") {
      return Math.round((p.grams / 100) * p.kcalPer100);
    }
    return 0;
  };

  const consumed = products.reduce((sum, p) => sum + itemKcal(p), 0);
  const left = Math.max(dailyRate - consumed, 0);
  const percent = dailyRate > 0 ? Math.round((consumed / dailyRate) * 100) : 0;

  // TABLET/DESKTOP
  const addInline = () => {
    const name = nameInput.trim();
    const gramsNum = parseFloat(String(gramsInput).replace(",", "."));
    if (!name || isNaN(gramsNum) || gramsNum <= 0) return;

    onAdd?.({ name, grams: gramsNum }); 

    setNameInput("");
    setGramsInput("");
  };

  const handleInlineKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addInline();
    }
  };

  return (
    <div className={styles.DiaryPage}>
      {/* Brand bar */}
      <div className={styles.DiaryBrandBar}>
        <img src={logo} alt="SlimMom" className={styles.DiaryBrandLogo} />
        <div className={styles.DiaryNavDividerHeader}>
          <div className={styles.DiaryTitle}>Nic</div>
          <button
            type="button"
            className={styles.DiaryExitBtn}
            onClick={onExit}
          >
            Exit
          </button>
        </div>
        <button
          type="button"
          className={styles.DiaryHamburger}
          aria-label="Menu"
          onClick={onMenuClick}
        >
          <svg
            className={styles.DiaryHamburgerIcon}
            viewBox="0 0 24 24"
            width="24"
            height="24"
            aria-hidden="true"
          >
            <path
              d="M3 6h18M3 12h18M3 18h18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Header */}
      <div className={styles.DiaryHeader}>
        <button
          type="button"
          className={styles.DiaryBackBtn}
          onClick={onBack}
          aria-label="Back"
        >
          ←
        </button>

        <div className={styles.DiaryNavDivider}>
          <div className={styles.DiaryTitle}>Nic</div>
          <button
            type="button"
            className={styles.DiaryExitBtn}
            onClick={onExit}
          >
            Exit
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={styles.DiaryContent}>
        <h3>
          {fmtDate(date)}{" "}
          <span role="img" aria-label="calendar">
            📅
          </span>
        </h3>

        {/* TABLET & DESKTOP */}
        <div className={styles.AddRow}>
          <input
            type="text"
            className={styles.AddName}
            placeholder="Enter product name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={handleInlineKey}
          />
          <input
            type="text"
            className={styles.AddGrams}
            placeholder="Grams"
            value={gramsInput}
            onChange={(e) => setGramsInput(e.target.value)}
            onKeyDown={handleInlineKey}
          />
          <button
            type="button"
            className={styles.AddBtn}
            aria-label="Add"
            onClick={addInline}
          >
            +
          </button>
        </div>

        <ul className={styles.DiaryList}>
          {products.map((p, i) => (
            <li className={styles.DiaryItem} key={`${p.name}-${i}`}>
              <span className={styles.DiaryItemName}>{p.name}</span>
              <span className={styles.DiaryItemGrams}>
                {typeof p.grams === "number" ? p.grams : "--"} g
              </span>
              <span className={styles.DiaryItemKcal}>{itemKcal(p)}</span>
              <span className={styles.DiaryItemKcalUnit}>kcal</span>
              <button
                type="button"
                className={styles.DiaryDeleteBtn}
                aria-label={`Delete ${p.name}`}
                onClick={() => onDelete?.(i)}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* MOBİL */}
      <div className={styles.DiaryFabDiv}>
        <button
          type="button"
          className={styles.DiaryFab}
          aria-label="Add"
          onClick={onAddClick}
        >
          +
        </button>
      </div>

      {/* Summary */}
      <div className={styles.DiarySummary}>
        {/* SOL sütun */}
        <div className={styles.SummaryBox}>
          <h4>Summary for {fmtDate(date)}</h4>
          <ul className={styles.SummaryList}>
            <li>
              <span>Left</span>
              <span>{left} kcal</span>
            </li>
            <li>
              <span>Consumed</span>
              <span>{consumed} kcal</span>
            </li>
            <li>
              <span>Daily rate</span>
              <span>{dailyRate} kcal</span>
            </li>
            <li>
              <span>n% of normal</span>
              <span>{percent}%</span>
            </li>
          </ul>
        </div>

        {/* SAĞ sütun */}
        <div className={styles.FoodBox}>
          <h4>Food not recommended</h4>
          <ul>
            <li>Flour products</li>
            <li>Milk</li>
            <li>Read meat</li>
            <li>Smoked meats</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
