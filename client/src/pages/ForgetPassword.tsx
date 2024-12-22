import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useEmailOtp from "../utils/useEmailOtp";
import ForgetPasswordDialog from "../components/ForgetPasswordDialog";
import ConfirmButtons from "../components/ConfirmButtons";
import Input from "../components/Input";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { responseErrorHandler } from "../utils/responseErrorHandler";

const DATA = {
  title: "Password Recovery",
  description: "Please enter your account email.",
  placeholder: "Enter your email",
};

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [email, setEmail] = useState("");
  const {
    isValidEmail,
    checkEmail,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useEmailOtp();

  useEffect(() => {
    responseErrorHandler(
      isError,
      error as FetchBaseQueryError,
      setErrorMessage,
    );
    if (isSuccess) {
      navigate("/forget-password-otp", { state: email });
    }
  }, [error, email, isError, isSuccess, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>,
  ) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setErrorMessage(
        "Invalid email format, please enter a valid email address.",
      );
    } else {
      await checkEmail({ email: email });
    }
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
