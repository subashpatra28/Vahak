import styles from './styles.module.scss';
import { useHistory } from 'react-router-dom';

export default function ErrorComponent() {
    const history = useHistory();

  return (
    <div className={styles.container}>
      <h1>404 - Page not found</h1>
      <button onClick={() => history.push('/')}>Goto homepage</button>
    </div>
  );
}
