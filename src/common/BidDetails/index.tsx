import styles from '../styles.module.scss';
import BidInterface from './../../Interfaces/Bid.interface';
import { useHistory } from 'react-router-dom';

export default function BidDetails({ source, destination, noOfTravellers, carType }: BidInterface){
    const history = useHistory();

    const editForm = () => {
        localStorage.setItem('bidEdit', JSON.stringify(true));
        history.push('/');
    }

    return(
        <div className={styles.card}>
            <aside className={styles.left}>
                <h4>Journey Details</h4>
                <h1>{source} -&gt; {destination}</h1>
                <h2>{noOfTravellers} Persons, {carType}</h2>
            </aside>
            <aside className={styles.right}>
                <button onClick={editForm}><i className="fas fa-pencil-alt"></i> Edit</button>
            </aside>
        </div>
    )
}