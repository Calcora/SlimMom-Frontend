import styles from "./Diary.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Components
import CalendarIconBtn from "../../components/CalenderIconBtn/CalenderIconBtn";
const Diary = () => {
  // Tarih (controlled/uncontrolled destekli)

  // Takvim ikon butonu

  const fmtDate = (d) => {
    const dd = new Date(d);
    const day = String(dd.getDate()).padStart(2, "0");
    const mon = String(dd.getMonth() + 1).padStart(2, "0");
    const year = dd.getFullYear();
    return `${day}.${mon}.${year}`;
  };

  // const itemKcal = (p) => {
  //   if (typeof p.kcal === "number") return p.kcal;
  //   if (typeof p.kcalPer100 === "number" && typeof p.grams === "number") {
  //     return Math.round((p.grams / 100) * p.kcalPer100);
  //   }
  //   return 0;
  // };

  const AddSchema = Yup.object({
    name: Yup.string()
      .trim()
      .min(2, "Please enter at least 2 characters.")
      .required("Please enter at least 2 characters."),
    grams: Yup.number()
      .transform((val, orig) => {
        if (typeof orig === "string") {
          const n = parseFloat(orig.replace(",", "."));
          return Number.isNaN(n) ? val : n;
        }
        return val;
      })
      .typeError("Please enter a positive number.")
      .positive("Please enter a positive number.")
      .required("Please enter a positive number."),
  });

  return (
    <div className={styles.DiaryPage}>
      {/* Toast container */}
      <ToastContainer position="top-center" autoClose={2500} />

      {/* Content */}
      <div className={styles.DiaryContent}>
        <h3 className={styles.DiaryDate}>
          {fmtDate(new Date())}{" "}
          <DatePicker
            customInput={<CalendarIconBtn />}
            popperPlacement="bottom-start"
            showPopperArrow
            calendarClassName={styles.GrayCalendar}
            dayClassName={() => styles.GrayCalendarDay}
            popperClassName={styles.GrayCalendarPopper}
          />
        </h3>

        {/* TABLET & DESKTOP inline add (Formik + Toastify) */}
        <Formik
          initialValues={{ name: "", grams: "" }}
          validationSchema={AddSchema}
          // onSubmit={(vals, { resetForm }) => {
          //   const gramsNumber =
          //     typeof vals.grams === "number"
          //       ? vals.grams
          //       : parseFloat(String(vals.grams).replace(",", "."));
          //   onAdd?.({ name: vals.name.trim(), grams: gramsNumber });
          //   resetForm();
          // }}
          validateOnBlur
          validateOnChange={false}
        >
          {({ validateForm, submitForm, isSubmitting }) => {
            const handleAddClick = async () => {
              const errs = await validateForm();
              const keys = Object.keys(errs);
              if (keys.length) {
                const messages = keys.map((k) => errs[k]);
                toast.error(messages.join(" • "));
                return;
              }
              await submitForm();
              toast.success("Added ✔");
            };

            return (
              <Form className={styles.AddRow} noValidate>
                <Field
                  name="name"
                  type="text"
                  className={styles.AddName}
                  placeholder="Enter product name"
                />
                <Field
                  name="grams"
                  type="text" // virgül desteği
                  className={styles.AddGrams}
                  placeholder="Grams"
                />
                <button
                  type="button"
                  className={styles.AddBtn}
                  aria-label="Add"
                  onClick={handleAddClick}
                  disabled={isSubmitting}
                >
                  +
                </button>
              </Form>
            );
          }}
        </Formik>

        <ul className={styles.DiaryList}>
          {/* {products.map((p, i) => (
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
                // onClick={() => onDelete?.(i)}
              >
                ×
              </button>
            </li>
          ))} */}
        </ul>
      </div>

      {/* MOBİL FAB */}
      <div className={styles.DiaryFabDiv}>
        <button
          type="button"
          className={styles.DiaryFab}
          aria-label="Add"
          // onClick={onAddClick}
        >
          +
        </button>
      </div>

      {/* Summary */}
      <div className={styles.DiarySummary}>
        {/* SOL sütun */}
        <div className={styles.SummaryBox}>
          <h4>Summary for </h4>
          <ul className={styles.SummaryList}>
            <li>
              <span>Left</span>
              {/* <span>{left} kcal</span> */}
            </li>
            <li>
              <span>Consumed</span>
              {/* <span>{consumed} kcal</span> */}
            </li>
            <li>
              <span>Daily rate</span>
              {/* <span>{dailyRate} kcal</span> */}
            </li>
            <li>
              <span>n% of normal</span>
              {/* <span>{percent}%</span> */}
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
};

export default Diary;
