"use client";
import React, { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
const key = "6LdG1dkaAAAAAPdOvrX96KRQ5baoNqwPZIAp8b1G";

const ReCaptcha = () => {
  return <ReCAPTCHA sitekey={key} className="custom-rechaptcha" />;
};

export default ReCaptcha;
