import Icon from "../../images/icon.png";
import styles from "../styles.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <img src={Icon} alt="Vahak" /> <span>Vahak</span>
    </header>
  );
}
