import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";

export default function EmailInput() {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | undefined>();

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

    };

    return (
        <div className="h-2/7 min-h-150 flex w-2/6 min-w-96 flex-col rounded bg-white pl-8 pr-8 pt-4 pb-6">
            {/* <div className="mb-2 flex items-center">
                <h1 className="font-sans text-2xl font-bold text-fg-soft">Enter Email</h1>
            </div> */}

            <h1 className="text-xl font-sans font-semibold">Email</h1>
            <form className="mt-1" onSubmit={handleSubmit}>
                <Input
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
            >
                Get Verification Code
            </Button>
        </div>
    )
}