import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ForgetPasswordDialog from "../components/ForgetPasswordDialog";
import ConfirmButtons from "../components/ConfirmButtons";
import Input from "../components/Input";
import { useForgetPasswordMutation } from "../store";
import { responseErrorHandler } from "../utils/responseErrorHandler";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

const DATA = {
  title: "Reset your password",
  inputs: [
    {
      description: "Enter your new password",
      placeholder: "Enter your new password",
    },
    {
      description: "Enter your new password again to verify",
      placeholder: "Re-enter your new password",
    },
  ],
};

export default function ForgetPasswordReset() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { state: email } = useLocation();
  const [forgetPassword, { isLoading, isError, isSuccess, error }] =
    useForgetPasswordMutation();

  useEffect(() => {
    responseErrorHandler(
      isError,
      error as FetchBaseQueryError,
      setErrorMessage,
    );
    if (isSuccess) {
      navigate("/login", { state: email });
    }
  }, [error, email, isError, isSuccess, navigate]);

  const validateForm = () => {
    if (!password || !passwordConfirm) {
      setErrorMessage("Please fill in both password fields");
      return false;
    }
    if (password !== passwordConfirm) {
      setErrorMessage("Passwords do not match");
      return false;
    }
    setErrorMessage(undefined);
    return true;
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrorMessage(undefined);
  };

  const handleChangePasswordConfirm = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPasswordConfirm(e.target.value);
    setErrorMessage(undefined);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>,
  ) => {
    e.preventDefault();
    if (!validateForm()) return;

    forgetPassword({
      email: email,
      newPassword: password,
      newPassword2: passwordConfirm,
    });
  };

  return (
    <ForgetPasswordDialog
      title={DATA.title}
      confirmButtons={
        <ConfirmButtons
          confirmText="Submit"
          cancelText="Cancel"
          className="mt-2"
          cancelOnClick={() => navigate("/login")}
          confirmOnClick={handleSubmit}
          isConfirmLoading={isLoading}
        />
      }
    >
      <form onSubmit={handleSubmit}>
        <p className="mx-1 mb-2 mt-1 text-sm">{DATA.inputs[0].description}</p>
        <Input
          placeholder={DATA.inputs[0].placeholder}
          autoFocus
          className="mb-2"
          onChange={handleChangePassword}
          type="password"
        />
      </form>
      <form onSubmit={handleSubmit}>
        <p className="mx-1 mb-2 mt-1 text-sm">{DATA.inputs[1].description}</p>
        <Input
          placeholder={DATA.inputs[1].placeholder}
          className="mb-2"
          onChange={handleChangePasswordConfirm}
          type="password"
        />
      </form>
      <p className="mb-2 ml-1 h-2 text-xs text-red-default">{errorMessage}</p>
    </ForgetPasswordDialog>
  );
}
