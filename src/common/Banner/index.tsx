import styles from "../styles.module.scss";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Banner() {
  const [content, setContent] = useState("");
  const location = useLocation();

  useEffect(() => {
    let path: string = location.pathname;
    const pathArray: string[] = path.split("/");
    if (pathArray[1] === "rate" || pathArray[1] === "user-details") {
      setContent("Place your Bid (2/4 step)");
    } else if (pathArray[1] === "otp") {
      setContent("Verify OTP (3/4 step)");
    } else if (pathArray[1] === "submit") {
      setContent("Summary & Submit Bid (4/4 step)");
    } else if (pathArray[1].length === 0) {
      setContent("Place your Bid (1/4 step)");
    }
  }, [location]);

  return (
    <>
      {content.length > 0 && (
        <section className={styles.banner}>
          <h1>{content}</h1>
        </section>
      )}
    </>
  );
}
