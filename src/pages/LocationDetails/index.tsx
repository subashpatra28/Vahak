import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import styles from "./styles.module.scss";
import Input from "../../common/Input";
import InputInterface from "./../../Interfaces/Input.interface";
import { useEffect } from "react";
import SelectInterface from './../../Interfaces/Select.interface';
import Select from '../../common/Select';

let initialValues = {
  source: "",
  destination: "",
  carType: "",
  noOfTravellers: "",
};

const validationSchema = Yup.object({
  source: Yup.string().required("Required field"),
  destination: Yup.string().required("Required field"),
  carType: Yup.string().required("Required field"),
  noOfTravellers: Yup.number()
    .required("Required field")
    .max(4, "Travellers should equal or less than 4"),
});

const dropdownOptions = [
  { key: 'Select Car Type', value: ''},
  { key: "Hetchback", value: "hetchback" },
  { key: "Sedan", value: "sedan" },
  { key: "SUV", value: "suv" }
]

export default function LocationDetails() {
  const history = useHistory();

  useEffect(() => {
    const isEditFlow = localStorage.getItem("bidEdit");
    if (isEditFlow === "true") {
      const formData = JSON.parse(localStorage.getItem("BidUser")!);
      initialValues = formData;
    }
  }, []);

  const onSubmit = (values: Object) => {
    localStorage.setItem("BidUser", JSON.stringify(values));
    history.push({ pathname: "/rate", state: values });
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className={styles.form}>
        <div className={styles.container}>
          <Field name="source">
            {(props: InputInterface) => {
              props["placeholder"] = "Enter Source Location";
              props["id"] = "Source";
              props["labelName"] = "Source Location";
              props["inputType"] = "text";
              props["halfWidth"] = true;
              props["required"] = true;
              return <Input {...props} />;
            }}
          </Field>
          <Field name="destination">
            {(props: InputInterface) => {
              props["placeholder"] = "Enter Destination Location";
              props["id"] = "Destination";
              props["labelName"] = "Destination Location";
              props["inputType"] = "text";
              props["halfWidth"] = true;
              props["required"] = true;
              return <Input {...props} />;
            }}
          </Field>
        </div>
        <Field name="carType">
          {(props: SelectInterface) => {
            return (
              <Select {...props} name="carType" options={dropdownOptions} />
            );
          }}
        </Field>
        <Field name="noOfTravellers">
          {(props: InputInterface) => {
            props["placeholder"] = "Enter Number of Travellers";
            props["id"] = "noOfTravellers";
            props["labelName"] = "Number of Travellers";
            props["inputType"] = "number";
            props["halfWidth"] = false;
            props["required"] = true;
            return <Input {...props} />;
          }}
        </Field>
        <button type="submit">Enter Bid Details</button>
      </Form>
    </Formik>
  );
}
