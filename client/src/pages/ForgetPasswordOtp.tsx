import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { responseErrorHandler } from "../utils/responseErrorHandler";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import ForgetPasswordDialog from "../components/ForgetPasswordDialog";
import ConfirmButtons from "../components/ConfirmButtons";
import Input from "../components/Input";
import { useLazyCheckOtpQuery } from "../store";

const DATA = {
  title: "Verify your identity",
  description:
    "A verification code has been sent to your email. Please check your inbox, including the spam folder.",
  placeholder: "Enter your verification code",
};

export default function ForgetPasswordOtp() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [otp, setOtp] = useState("");
  const { state: email } = useLocation();
  const [
    checkOtp,
    {
      isLoading,
      isError,
      isSuccess,
      error,
    },
  ] = useLazyCheckOtpQuery();

  useEffect(() => {
    responseErrorHandler(
      isError,
      error as FetchBaseQueryError,
      setErrorMessage,
    );
    if (isSuccess) {
      navigate("/forget-password-reset", { state: email });
    }
  }, [error, email, isError, isSuccess, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>,
  ) => {
    e.preventDefault();
    await checkOtp({ email: email, OTP: otp });
  };

  return (
    <ForgetPasswordDialog
      title={DATA.title}
      confirmButtons={
        <ConfirmButtons
          confirmText="Next"
          cancelText="Cancel"
          className="mt-2"
          cancelOnClick={() => navigate("/login")}
          confirmOnClick={handleSubmit}
          isConfirmLoading={isLoading}
        />
      }
    >
      <form onSubmit={handleSubmit}>
        <div>
          <p className="mx-1 mb-2 mt-1 text-sm">{DATA.description}</p>
          <Input
            placeholder={DATA.placeholder}
            autoFocus
            className="mb-2 w-full"
            onChange={handleChange}
          />
        </div>
      </form>
      <p className="mb-2 ml-1 h-2 text-xs text-red-default">{errorMessage}</p>
    </ForgetPasswordDialog>
  );
}
