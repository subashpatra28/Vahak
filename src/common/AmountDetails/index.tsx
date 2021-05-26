import AmountInterface from "./../../Interfaces/Amount.interface";
import styles from "../styles.module.scss";
export default function AmountDetails({
  amount,
  rateNegotiable,
  phoneNumber,
  username,
  remarks
}: AmountInterface) {
  return (
    <aside className={styles.amountContainer}>
      <div className="left">
          <h3>{phoneNumber && `+91-${phoneNumber}`}</h3>
          <h3>{username}</h3>
          <h3>{remarks}</h3>
      </div>
      <div className="right">
        <h1>
          <i className="fas fa-rupee-sign"></i>{" "}
          {new Intl.NumberFormat("en-IN", {
            maximumSignificantDigits: 3,
          }).format(Number(amount))}
        </h1>
        {rateNegotiable ? <p>Rate Negotiable</p> : <p>Fixed</p>}
      </div>
    </aside>
  );
}
