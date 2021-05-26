import { Formik, Form, Field } from "formik";
import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import * as Yup from "yup";
import BidDetails from "./../../common/BidDetails/index";
import AmountDetails from "./../../common/AmountDetails/index";
import InputInterface from "./../../Interfaces/Input.interface";
import Input from "../../common/Input";
import styles from "./styles.module.scss";
import TravelInterface from "../../Interfaces/Travel.interface";
let initialValues = {
  phoneNumber: "",
  username: "",
  remarks: "",
};

const validationSchema = Yup.object({
  username: Yup.string().required('Name is required'),
  remarks: Yup.string(),
  phoneNumber: Yup.number().moreThan(10, 'Maximum 10 digits can be added').required('Phone Number is required'),
});

export default function UserDetails() {
  const bidData = {
    source: "",
    destination: "",
    noOfTravellers: 0,
    carType: "",
    rateNegotiable: false,
    amount: 0,
  };
  const [bidUserData, setBidUserData] = useState<TravelInterface>(bidData);
  const { state } = useLocation<TravelInterface>();
  const history = useHistory();

  useEffect(() => {
    if (Object.keys(state).length > 0) {
      setBidUserData(state);
    } else {
      const bidUser: string = localStorage.getItem("BidUser") || "";
      const bidStoredData: TravelInterface = JSON.parse(bidUser);
      setBidUserData(bidStoredData);
    }
    const isEditFlow = localStorage.getItem("bidEdit");
    if (isEditFlow === "true") {
      const formData = JSON.parse(localStorage.getItem("BidUser")!);
      initialValues = formData;
    }
  }, []); // eslint-disable-line

  const onSubmit = (values: object) => {
    localStorage.setItem(
      "BidUser",
      JSON.stringify({ ...bidUserData, ...values })
    );
    history.push({
      pathname: "/otp",
      state: { ...bidUserData, ...values },
    });
  };
  return (
    <>
      <BidDetails
        source={bidUserData["source"]}
        destination={bidUserData["destination"]}
        carType={bidUserData["carType"]}
        noOfTravellers={bidUserData["noOfTravellers"]}
      />
      <AmountDetails
        amount={bidUserData["amount"]}
        rateNegotiable={bidUserData["rateNegotiable"]}
      />
      <div className={styles.formContainer}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <Field name="phoneNumber">
              {(props: InputInterface) => {
                props["placeholder"] = "Enter your 10 digits Mobile Number";
                props["id"] = "phoneNumber";
                props["labelName"] = "Enter your 10 digits Mobile Number";
                props["inputType"] = "number";
                props["halfWidth"] = false;
                props["required"] = true;
                return <Input {...props} />;
              }}
            </Field>
            <Field name="username">
              {(props: InputInterface) => {
                props["id"] = "username";
                props["labelName"] = "Enter your Name";
                props["inputType"] = "text";
                props["placeholder"] = "Enter your Name";
                props["halfWidth"] = false;
                props["required"] = true;
                return <Input {...props} />;
              }}
            </Field>
            <Field name="remarks">
              {(props: InputInterface) => {
                props["id"] = "remarks";
                props["labelName"] = "Enter Remarks (optional)";
                props["inputType"] = "text";
                props["placeholder"] = "Enter Remarks (optional)";
                props["halfWidth"] = false;
                props["required"] = false;
                return <Input {...props} />;
              }}
            </Field>
            <button type="submit">Verify via OTP</button>
          </Form>
        </Formik>
      </div>
    </>
  );
}
