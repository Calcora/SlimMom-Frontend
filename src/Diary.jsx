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
  onDelete,
}) {
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

  return (
    <div className={styles.DiaryPage}>
      <div className={styles.DiaryBrandBar}>
        <img src={logo} alt="SlimMom" className={styles.DiaryBrandLogo} />
        <button
          type="button"
          className={styles.DiaryHamburger}
          aria-label="Menu"
          onClick={onMenuClick}
        >
          {/* SVG hamburger icon */}
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

      {/*Floating Add Button*/}
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
      {/* Summary*/}
      <div className={styles.DiarySummary}>
        <h4>Summary for {fmtDate(date)}</h4>

        <div className={styles.DiarySummaryGrid}>
          <span className={styles.DiarySummaryLabel}>Left</span>
          <span className={styles.DiarySummaryValue}>{left} kcal</span>

          <span className={styles.DiarySummaryLabel}>Consumed</span>
          <span className={styles.DiarySummaryValue}>{consumed} kcal</span>

          <span className={styles.DiarySummaryLabel}>Daily rate</span>
          <span className={styles.DiarySummaryValue}>{dailyRate} kcal</span>

          <span className={styles.DiarySummaryLabel}>n% of normal</span>
          <span className={styles.DiarySummaryValue}>{percent}%</span>
        </div>

        <div style={{ marginTop: 16 }}>
          <h4>Food not recommended</h4>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
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
