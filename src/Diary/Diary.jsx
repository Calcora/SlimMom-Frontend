import { useEffect, useState, forwardRef } from "react";
import styles from "./Diary.module.css";
import logo from "../assets/logo.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  onDateChange, 
}) {
  //Tarih
  const [localDate, setLocalDate] = useState(date);
  useEffect(() => {
    setLocalDate(date);
  }, [date]);

  const currentDate = onDateChange ? date : localDate;

  const handleDatePick = (d) => {
    if (!d) return;
    if (typeof onDateChange === "function") onDateChange(d);
    else setLocalDate(d);
  };

  const CalendarIconBtn = forwardRef(function CalendarIconBtn(
    { onClick },
    ref
  ) {
    return (
      <button
        type="button"
        className={styles.CalendarIconBtn}
        aria-label="Pick a date"
        onClick={onClick}
        ref={ref}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="22"
          height="22"
          className={styles.CalendarIcon}
          aria-hidden="true"
        >
          <path
            d="M7 10h5v5H7v-5zm10-6h-1V2h-2v2H10V2H8v2H7c-1.1 0-1.99.9-1.99 2L5 20c0 1.1.89 2 1.99 2H19c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H7V9h12v11z"
            fill="currentColor"
          />
        </svg>
      </button>
    );
  });

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

  //Tablet/Desktop inline ekleme
  const [nameInput, setNameInput] = useState("");
  const [gramsInput, setGramsInput] = useState("");

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
        <h3 className={styles.DiaryDate}>
          {fmtDate(currentDate)}
          <DatePicker
            selected={currentDate}
            onChange={handleDatePick}
            customInput={<CalendarIconBtn />}
            popperPlacement="bottom-start"
            showPopperArrow
          />
        </h3>

        {/* TABLET & DESKTOP inline add */}
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
              <div className={styles.DiaryItemKcalBox}>
                <span className={styles.DiaryItemKcal}>{itemKcal(p)}</span>
                <span className={styles.DiaryItemKcalUnit}>kcal</span>
              </div>
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

      {/* MOBİL FAB */}
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
        <div className={styles.DiaryNavDividerHeaderSummary}>
          <div className={styles.DiaryTitle}>Nic</div>
          <button
            type="button"
            className={styles.DiaryExitBtn}
            onClick={onExit}
          >
            Exit
          </button>
        </div>

        {/* SOL sütun */}
        <div className={styles.SummaryBox}>
          <h4>Summary for {fmtDate(currentDate)}</h4>
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
