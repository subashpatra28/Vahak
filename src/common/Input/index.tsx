import styles from "../styles.module.scss";
import InputInterface from "../../Interfaces/Input.interface";

export default function Input(props: InputInterface) {
  const { field, meta, placeholder, id, labelName, halfWidth, inputType, required } = props;
  console.log(meta);
  return (
    <>
      <div className={`${halfWidth ? styles.form__group : styles.form__number__group}`}>
        <input
          type={inputType}
          className={`${styles.form__field} ${meta.touched && meta.value.length === 0 && styles.requiredField}`}
          placeholder={placeholder}
          id={id}
          {...field}
        />
        <label htmlFor="name" className={`${styles.form__label} ${meta.touched && meta.value.length === 0 && styles.required}`}>
          {labelName} <span className={styles.required}>{required && "*"}</span>
        </label>
        {meta.touched && meta.error?.length > 0 && <span className={styles.required}>{meta.error}</span>}
      </div>
    </>
  );
}
