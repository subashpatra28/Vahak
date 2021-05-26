import BidDetails from './../../common/BidDetails/index';
import AmountDetails from './../../common/AmountDetails/index';
import styles from './styles.module.scss';
import { useLocation, useHistory } from 'react-router-dom';

import { useState, useEffect } from 'react';
import OtpInterface from './../../Interfaces/Otp.interface';

export default function SubmitForm(){
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
    const { state } = useLocation<OtpInterface>();
    const [bidUserData, setBidUserData] = useState<OtpInterface>(bidData);
    const history = useHistory();
    const [success, setSuccess] = useState(false);
 
    useEffect(() => {
        if (Object.keys(state).length > 0) {
          setBidUserData(state);
        } else {
          const bidUser: string = localStorage.getItem("BidUser") || "";
          const bidStoredData: OtpInterface = JSON.parse(bidUser);
          setBidUserData(bidStoredData);
        }
        return () => {
          localStorage.clear();
        }
      }, []);// eslint-disable-line

      const submitForm = () => {
        setSuccess(true);
        history.push('/');
      }
    return(
        <>
            <BidDetails source={bidUserData['source']} destination={bidUserData['destination']} noOfTravellers={bidUserData['noOfTravellers']} carType={bidUserData['carType']} />
            <AmountDetails amount={bidUserData['amount']} rateNegotiable={bidUserData['rateNegotiable']} phoneNumber={bidUserData['phoneNumber']} username={bidUserData['username']} remarks={bidUserData['remarks']} />
            <button className={styles.button} onClick={submitForm}>Submit Bid</button>
            {success && <p style={{color: 'green', textAlign: 'center'}}>Successfully submitted your Bidding</p>}
        </>
    )
}