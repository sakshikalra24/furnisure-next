'use client'; 

import React, { useState } from "react";
import axios from "axios";
import {FooterLinks} from "../FooterLinks/FooterLinks";
import "./Footer.scss"; 

const Footer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendTransactionalEmail = async (email, name) => {
    try {
      const response = await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        {
          sender: { email: "updates@furnisure.me", name: "Furnisure Rentals" },
          to: [{ email: email, name: name }],
          subject: "Thank you for subscribing!",
          htmlContent: `<html><body><h1>Hi ${name}, thank you for subscribing!</h1></body></html>`,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  };

  // Handle subscribe form submission
  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("Subscribing...");

    const requestBody = {
      name,
      email,
    };

    try {
      // Send the transactional email directly to the subscriber
      const emailResponse = await sendTransactionalEmail(email, name);

      // Check if email was successfully sent
      if (emailResponse.status === 201) {
        setMessage("Subscription successful! Check your inbox.");
      } else {
        setMessage("Failed to send the email. Please try again.");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={"footer-div"}>
      <div className={"footerLinks"}>
        <FooterLinks />
      </div>
      <div className={"contact"}>
        <h3 className={"footer-header"}>Reach Out</h3>
        <p>
          <span className={"bold"}>E :</span> info@furnisure.me
        </p>
        <p>
          <span className={"bold"}>P :</span> +971 4 576 9174
        </p>
        <p>
          <span className={"bold"}>W :</span> +971 58 57 56 247
        </p>
      </div>
      <div className={"address"}>
        <h3 className={"footer-header"}>Address</h3>
        <p>C17, DIC</p>
        <p>Dubai, UAE</p>
      </div>
      <div className={"subscribe-footer"}>
        <img className={"logo"} src={"/assets/logo/FS Logo.png"} alt="Furnisure Logo" />
        <div>
          <h3 className={"footer-header"}>Curiosity Piqued!</h3>
          <form onSubmit={handleSubscribe}>
            <div className={"input-div"}>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={"button"}>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Footer;
