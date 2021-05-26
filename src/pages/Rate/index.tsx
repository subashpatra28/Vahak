import { Formik, Field, Form } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import BidDetails from "./../../common/BidDetails/index";
import InputInterface from "./../../Interfaces/Input.interface";
import styles from "./styles.module.scss";
import BidInterface from './../../Interfaces/Bid.interface';
const initialValues = {
  amount: "",
  rateNegotiable: false,
};

export default function Rate() {
  const history = useHistory();
  const bidData = {
    source: "",
    destination: "",
    noOfTravellers: 0,
    carType: '',
  };
  const [bidUserData, setBidUserData] = useState<BidInterface>(bidData);
  const { state } = useLocation<BidInterface>();

  useEffect(() => {
    if (Object.keys(state).length > 0) {
      setBidUserData(state);
    } else {
      const bidUser: string = localStorage.getItem("BidUser") || "";
      const bidData: BidInterface = JSON.parse(bidUser);
      setBidUserData(bidData);
    }
  }, [state]);

  const onSubmit = (values: object) => {
    localStorage.setItem(
      "BidUser",
      JSON.stringify({ ...bidUserData, ...values })
    );
    history.push({
      pathname: "/user-details",
      state: { ...bidUserData, ...values },
    });
  };

  return (
    <>
      <BidDetails
        source={bidUserData[`source`]}
        destination={bidUserData["destination"]}
        noOfTravellers={bidUserData["noOfTravellers"]}
        carType={bidUserData["carType"]}
      />
      <div className={styles.container}>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form>
            <Field name="amount">
              {(props: InputInterface) => {
                const { field } = props;
                return (
                  <div className={styles.formControl}>
                    <i className="fas fa-rupee-sign"></i>
                    <input
                      type="number"
                      {...field}
                      className={styles.numberField}
                      placeholder="0"
                    />
                  </div>
                );
              }}
            </Field>
            <Field name="rateNegotiable">
              {(props: InputInterface) => {
                const { field } = props;
                return (
                  <div className={styles.checkboxContainer}>
                    <label>
                      <input type="checkbox" {...field} /> Rate Negotiable
                    </label>
                  </div>
                );
              }}
            </Field>
            <button type="submit">Next</button>
          </Form>
        </Formik>
      </div>
    </>
  );
}
