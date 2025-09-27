import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Login.module.css";
import mobilLogo from "../assets/mobilLogo.png";
import tabletLogo from "../assets/logo.png";

export default function Login({ onSubmit, onSwitchTab }) {
  const Schema = Yup.object({
    email: Yup.string()
      .trim()
      .email("Please enter a valid email.")
      .required("Email is required."),
    password: Yup.string()
      .min(5, "Password must be at least 5 characters.")
      .required("Password is required."),
  });

  return (
    <div className={styles.loginWrap}>
      {/* Toasts */}
      <ToastContainer position="bottom-right" autoClose={2500} />

      <div className={styles.loginHeader}>
        <div className={styles.loginLogo}>
          <picture>
            {/* 1200px+ */}
            <source media="(min-width: 1200px)" srcSet={tabletLogo} />
            {/* 768px+ */}
            <source media="(min-width: 768px)" srcSet={tabletLogo} />
            {/* Mobile default */}
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

      {/* Formik + Toastify */}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Schema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await onSubmit?.({
              email: values.email.trim(),
              password: values.password,
            });
            toast.success("Logged in ✔");
            resetForm();
          } catch (err) {
            toast.error(
              (err && err.message) || "Login failed. Please try again."
            );
          } finally {
            setSubmitting(false);
          }
        }}
        validateOnChange={false}
        validateOnBlur
      >
        {({ validateForm, submitForm, isSubmitting, dirty }) => {
          const handleLoginClick = async () => {
            const errs = await validateForm();
            const keys = Object.keys(errs);
            if (keys.length) {
              const messages = keys.map((k) => errs[k]);
              toast.error(messages.join(" • "));
              return;
            }
            await submitForm();
          };

          return (
            <Form className={styles.loginForm} noValidate>
              <h2 className={styles.loginTitle}>LOG IN</h2>

              <label className={styles.loginLabel} htmlFor="email">
                Email *
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className={styles.loginInput}
                placeholder="you@example.com"
              />

              <label className={styles.loginLabel} htmlFor="password">
                Password *
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className={styles.loginInput}
                placeholder="••••••••"
              />

              <div className={styles.loginBtnAll}>
                <button
                  type="button"
                  className={styles.loginPrimaryBtn}
                  onClick={handleLoginClick}
                  disabled={isSubmitting || !dirty}
                >
                  {isSubmitting ? "Logging in..." : "Log in"}
                </button>

                <button
                  type="button"
                  className={styles.loginOutlineBtn}
                  onClick={() => onSwitchTab?.("register")}
                >
                  Register
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
