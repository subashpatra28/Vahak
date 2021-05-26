import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import styles from "./styles.module.scss";
import BidDetails from "../../common/BidDetails/index";
import AmountDetails from "../../common/AmountDetails/index";
import OtpInterface from "./../../Interfaces/Otp.interface";
export default function VerifyOtp() {
  const bidData = {
    source: "",
    destination: "",
    noOfTravellers: 0,
    carType: "",
    rateNegotiable: false,
    amount: 0,
    username: "",
    remarks: "",
    phoneNumber: 0,
  };
  const [otp, setOtp] = useState({
    otp_1: "",
    otp_2: "",
    otp_3: "",
    otp_4: "",
  });
  const history = useHistory();
  const [disabledSubmit, setDisabledSubmit] = useState(true);
  const [bidUserData, setBidUserData] = useState<OtpInterface>(bidData);
  const { state } = useLocation<OtpInterface>();
  const [invalidOtp, setInvalidOtp] = useState(false);

  useEffect(() => {
    if (Object.keys(state).length > 0) {
      setBidUserData(state);
    } else {
      const bidUser: string = localStorage.getItem("BidUser") || "";
      const bidStoredData: OtpInterface = JSON.parse(bidUser);
      setBidUserData(bidStoredData);
    }
  }, []);// eslint-disable-line

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { maxLength, name, value } = event.currentTarget;
    const [, fieldIndex] = name.split("_");
    if (value.length >= maxLength) {
      if (parseInt(fieldIndex, 10) < 4) {
        const nextSibling = document.querySelector(
          `input[name=otp_${parseInt(fieldIndex, 10) + 1}]`
        );
        if (nextSibling) {
          (nextSibling as HTMLInputElement).focus();
        }
      }
    }
    setOtp((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
    const otpValues = Object.values(otp).join("");
    if (otpValues.length === 3) {
      setDisabledSubmit(false);
    }
  };

  const submitForm = () => {
    const otpValues = Object.values(otp).join("");
    if (otpValues === "1234") {
      history.push({pathname: '/submit', state: bidUserData});
    }else{
      setInvalidOtp(true);
    }
  };

  const editForm = () => {
    localStorage.setItem('bidEdit', JSON.stringify(true));
    history.push({pathname: '/user-details', state: bidUserData});
}

  return (
    <>
      <BidDetails
        source={bidUserData['source']}
        destination={bidUserData['destination']}
        noOfTravellers={bidUserData['noOfTravellers']}
        carType={bidUserData['carType']}
      />
      <AmountDetails amount={bidUserData['amount']} rateNegotiable={bidUserData['rateNegotiable']} phoneNumber={bidUserData['phoneNumber']} username={bidUserData['username']} remarks={bidUserData['remarks']} />
      <div className={styles.otpContainer}>
        <p>
          We've sent an OTP to your mobile number. Please enter it below to
          submit your bid <span style={{fontWeight: 'bold'}}>{bidUserData['phoneNumber']}</span> <span onClick={editForm} style={{color: '#0f53fb', cursor: 'pointer'}}><i className="fas fa-pencil-alt"></i> Edit</span>
        </p>
        <div className={styles.otpForm}>
          <input
            type="number"
            maxLength={1}
            onChange={handleChange}
            name="otp_1"
            value={otp.otp_1}
          />
          <input
            type="number"
            maxLength={1}
            onChange={handleChange}
            name="otp_2"
            value={otp.otp_2}
          />
          <input
            type="number"
            maxLength={1}
            onChange={handleChange}
            name="otp_3"
            value={otp.otp_3}
          />
          <input
            type="number"
            maxLength={1}
            onChange={handleChange}
            name="otp_4"
            value={otp.otp_4}
          />
        </div>
        <button onClick={submitForm} disabled={disabledSubmit}>
          Verify OTP
        </button>
        {invalidOtp && <p style={{color: 'red', textAlign: 'center'}}>Entered OTP is invalid</p>}
      </div>
    </>
  );
}
