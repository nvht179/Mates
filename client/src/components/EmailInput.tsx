import React, { useState, useEffect } from "react";
import Input from "./Input";
import Button from "./Button";
import { useResendVerificationEmailMutation } from "../store";
import { useNavigate, useLocation } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { responseErrorHandler } from "../utils/responseErrorHandler";

interface EmailState {
    email: string | null;
}

export default function EmailInput() {
    let [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | undefined>();
    const [resendVerificationEmail, { isLoading, data, isError, error, isSuccess }] = useResendVerificationEmailMutation();
    const navigate = useNavigate();
    const location = useLocation();
    email = (location.state as EmailState)?.email || email;

    // useEffect(() => {
    //     if (isError) {
    //         const err = error as ResponseFail;
    //         setErrorMessage(err.data ? err.data.message : err.error);
    //     }
    //     if (isSuccess && data && "user" in data) {
    //         navigate("/verification-sent");
    //     }

    // }, [isError, error, isSuccess, navigate, data]);

    useEffect(() => {
        responseErrorHandler(
            isError,
            error as FetchBaseQueryError,
            setErrorMessage,
        );

        if (isSuccess && data && "user" in data) {
            navigate("/verification-sent");
        }
    }, [isError, isSuccess, error, navigate, data]);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setErrorMessage("");
    };

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>,
    ) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }
        await resendVerificationEmail({ email }).unwrap();

        if (isSuccess) {
            navigate("/verification-sent");
        }
    };

    return (
        <div className="h-2/7 min-h-150 flex w-1/3 min-w-96 flex-col rounded bg-white pl-8 pr-8 pt-4 pb-6">
            <h1 className="text-xl font-sans font-semibold">Email</h1>
            <form className="mt-1" onSubmit={handleSubmit}>
                <Input
                    className="w-full"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                />
            </form>

            <div className="ml-2 mb-2 h-2 text-xs text-red-default">
                {errorMessage}
            </div>

            <Button
                onClick={handleSubmit}
                className="mt-2 self-end"
                disabled={isLoading}
            >
                {isLoading ? "Loading..." : "Get Verification Code"}
            </Button>
        </div>
    )
}