import ForgetPasswordDialog from "../components/ForgetPasswordDialog";
import Input from "../components/Input";
import ConfirmButtons from "../components/ConfirmButtons";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import useEmailCheck from "../utils/useEmailCheck";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { responseErrorHandler } from "../utils/responseErrorHandler";

const STEPS = [
  {
    id: 0,
    title: "Password Recovery",
    inputs: [
      {
        description: "Please enter your account email.",
        placeholder: "Enter your email",
      },
    ],
  },
  {
    id: 1,
    title: "Verify your identity",
    description: "",
    inputs: [
      {
        description:
          "A verification code has been sent to your email. Please check your inbox, including the spam folder.",
        placeholder: "Enter your verification code",
      },
    ],
  },
  {
    id: 2,
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
  },
];

type Step = 0 | 1 | 2;

export default function ForgetPassword() {
  const [currentStep, setCurrentStep] = useState<Step>(0);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [inputs, setInputs] = useState<string[]>([]);
  const {
    isValidEmail,
    checkEmail,
    isLoading,
    isError,
    isSuccess,
    error,
    data,
  } = useEmailCheck();

  useEffect(() => {
    responseErrorHandler(isError, error as FetchBaseQueryError, setErrorMessage);
    if (isSuccess && data) {
      setCurrentStep((prevIndex) => (prevIndex + 1) as Step);
    }
  }, [isError, isSuccess, error, data]);

  const dialogs = STEPS.map((item) => {
    let handleSubmit: (
      e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>,
    ) => void = (
      e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>,
    ) => {
      e.preventDefault();
    };

    switch (item.id) {
      case 0:
        handleSubmit = async (
          e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>,
        ) => {
          e.preventDefault();
          if (!isValidEmail(inputs[0])) {
            setErrorMessage(
              "Invalid email format, please enter a valid email address.",
            );
          } else {
            await checkEmail({ email: inputs[0] }); // Use checkEmail
          }
        };
        break;
      case 1:
      case 2:
    }

    return (
      <ForgetPasswordDialog
        key={item.id}
        title={item.title}
        confirmButtons={
          <ConfirmButtons
            confirmText={item.id === 2 ? "Confirm" : "Next"}
            cancelText="Cancel"
            className="mt-2"
            cancelOnClick={() => navigate("/login")}
            confirmOnClick={handleSubmit}
            isConfirmLoading={isLoading}
          />
        }
      >
        <form onSubmit={handleSubmit}>
          {item.inputs.map(({ description, placeholder }, index) => {
            const handleInputChanges =
              Array<(e: React.ChangeEvent<HTMLInputElement>) => void>();
            switch (item.id) {
              case 0:
              case 1:
                handleInputChanges.push(
                  (e: React.ChangeEvent<HTMLInputElement>) => {
                    setInputs((prevState) => {
                      const updatedInputs = [...prevState];
                      updatedInputs[0] = e.target.value;
                      return updatedInputs;
                    });
                    setErrorMessage("");
                  },
                );
                break;
              case 2:
                handleInputChanges.push(
                  (e: React.ChangeEvent<HTMLInputElement>) => {
                    setInputs((prevState) => {
                      const updatedInputs = [...prevState];
                      updatedInputs[0] = e.target.value;
                      return updatedInputs;
                    });
                  },
                );
                handleInputChanges.push(
                  (e: React.ChangeEvent<HTMLInputElement>) => {
                    setInputs((prevState) => {
                      const updatedInputs = [...prevState];
                      updatedInputs[1] = e.target.value;
                      return updatedInputs;
                    });
                  },
                );
                break;
            }
            return (
              <>
                <p className="mx-1 mb-2 mt-1 text-sm">{description}</p>
                <Input
                  key={index}
                  placeholder={placeholder}
                  autoFocus={index === 0}
                  className="mb-2"
                  onChange={handleInputChanges[index]}
                />
              </>
            );
          })}
        </form>
        <p className="mb-2 ml-1 h-2 text-xs text-red-default">{errorMessage}</p>
      </ForgetPasswordDialog>
    );
  });
  return <>{dialogs[currentStep]}</>;
}
