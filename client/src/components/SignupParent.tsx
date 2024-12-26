import { useEffect, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../store";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { responseErrorHandler } from "../utils/responseErrorHandler";


interface RoleState {
  role: string | null;
}

export default function SignupParent() {
  const [userName, setUserName] = useState("");
  const [errorMessageUN, setErrorMessageUN] = useState<string | undefined>();
  const [fullName, setFullName] = useState("");
  const [errorMessageFN, setErrorMessageFN] = useState<string | undefined>();
  const [phoneNumber, setPhone] = useState("");
  const [errorMessagePhone, setErrorMessagePhone] = useState<string | undefined>();
  const [email, setEmail] = useState("");
  const [childEmail, setChildEmail] = useState("");
  const [errorMessageCE, setErrorMessageCE] = useState<string | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(); const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessagePw, setErrorMessagePw] = useState<string | undefined>();
  const [signupMutation, { isLoading, data, isError, error, isSuccess }] = useSignupMutation();

  const location = useLocation();
  const role = (location.state as RoleState)?.role || null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!role || role === "") {
      navigate("/choose-role");
    }
  }, [role, navigate]);

  useEffect(() => {
    responseErrorHandler(
      isError,
      error as FetchBaseQueryError,
      setErrorMessageCE,
    );

    if (isSuccess) {
      navigate("/verification-sent");
    }
  }, [isError, isSuccess, error, navigate, data]);

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone: string): boolean => {
    const phoneRegex = /^\d+$/;
    return phoneRegex.test(phone);
  }


  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
    setErrorMessageUN("");
  };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
    setErrorMessageFN("");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    setErrorMessagePhone("");
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrorMessage("");
  };

  const handleChildEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChildEmail(e.target.value);
    setErrorMessageCE("");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrorMessagePw("");
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(e.target.value);
    setErrorMessagePw("");
  };

  const checkValidInput = () => {
    var pass = true;
    if (fullName === "") {
      setErrorMessageFN("Please enter your full name.");
      pass = false;
    }

    if (userName === "") {
      setErrorMessageUN("Please enter your username.");
      pass = false;
    }

    if (password !== confirmPassword) {
      setErrorMessagePw("Passwords do not match.");
      pass = false;
    }

    if (!isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      pass = false;
    }

    if (!isValidEmail(childEmail)) {
      setErrorMessageCE("Please enter a valid email address.");
      pass = false;
    }

    if (!isValidPhone(phoneNumber)) {
      setErrorMessagePhone("Please enter a valid phone number.");
      pass = false;
    }
    return (pass);
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>,
  ) => {
    e.preventDefault();

    var validInput = checkValidInput();
    if (!validInput) {
      return;
    }
    await signupMutation({
      role: role as string,
      email,
      name: fullName,
      username: userName,
      phone: phoneNumber,
      password,
      avatar: "",
      childEmail: childEmail,
    }).unwrap();
  };

  return (
    <div className="flex justify-center">
      <div className="h-2/5 min-h-150 flex w-1/2 min-w-96 flex-col rounded bg-white pl-8 pr-8 pt-4">
        <div className="mb-2 flex items-center">
          <h1 className="font-sans text-2xl font-bold text-fg-soft">Sign Up</h1>
        </div>

        <form className="mt-1 w-full" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <h1 className="text-l font-sans font-semibold">Full Name</h1>
              <Input
                className="w-full"
                placeholder="Enter your full name"
                value={fullName}
                onChange={handleFullNameChange}
              />
              <div className="ml-2 mb-2 h-2 text-xs text-red-default">
                {errorMessageFN}
              </div>
            </div>

            <div className="w-full md:w-1/2 px-3">
              <h1 className="text-l font-sans font-semibold">User Name</h1>
              <Input
                className="w-full"
                placeholder="Enter your user name"
                value={userName}
                onChange={handleUserNameChange}
              />
              <div className="ml-2 mb-2 h-2 text-xs text-red-default">
                {errorMessageUN}
              </div>
            </div>

            <div className="w-full md:w-1/2 px-3">
              <h1 className="text-l font-sans font-semibold">Phone</h1>
              <Input
                className="w-full"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={handlePhoneChange}
              />
              <div className="ml-2 mb-2 h-2 text-xs text-red-default">
                {errorMessagePhone}
              </div>
            </div>

            <div className="w-full md:w-1/2 px-3">
              <h1 className="text-l font-sans font-semibold">Email</h1>
              <Input
                className="w-full"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
              />
              <div className="ml-2 mb-2 h-2 text-xs text-red-default">
                {errorMessage}
              </div>
            </div>

            <div className="w-full md:w-1/2 px-3">
              <h1 className="text-l font-sans font-semibold">Password</h1>
              <Input
                className="w-full"
                placeholder="Enter password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>

            <div className="w-full md:w-1/2 px-3">
              <h1 className="text-l font-sans font-semibold">Confirm Password</h1>
              <Input
                className="w-full"
                placeholder="Enter password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <div className="ml-2 mb-2 h-2 text-xs text-red-default">
                {errorMessagePw}
              </div>
            </div>

            <div className="w-full md:w-1/2 px-3">
              <h1 className="text-l font-sans font-semibold">Your Child Email</h1>
              <Input
                className="w-full"
                placeholder="Enter your child email"
                value={childEmail}
                onChange={handleChildEmailChange}
              />
              <div className="ml-2 mb-2 h-2 text-xs text-red-default">
                {errorMessageCE}
              </div>
            </div>

            <div className="w-full md:w-1/2 px-3">
              <Button
                onClick={handleSubmit}
                className="mt-6 self-end w-full border-2"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Sign Up"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}


