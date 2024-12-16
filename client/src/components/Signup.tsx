import { useEffect, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../store";

interface RoleState {
    role: string | null;
}

// interface CheckEmailError {
//   status: number;
//   data?: string;
//   error?: string;
// }
export default function SignupParent() {
    const [userName, setUserName] = useState("");
    const [errorMessageUN, setErrorMessageUN] = useState<string | undefined>();
    const [fullName, setFullName] = useState("");
    const [errorMessageFN, setErrorMessageFN] = useState<string | undefined>();
    const [phoneNumber, setPhone] = useState("");
    const [errorMessagePhone, setErrorMessagePhone] = useState<string | undefined>();
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | undefined>();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessagePw, setErrorMessagePw] = useState<string | undefined>();

    const location = useLocation();
    const role = (location.state as RoleState)?.role || null;
    const navigate = useNavigate();

    const [signup] = useSignupMutation();

    useEffect(() => {
        if (!role || role === "") {
            navigate("/choose-role");
        }
    }, [role, navigate]);

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
        if (!checkValidInput()) {
            return;
        }
        const result = await signup({
            role: role as string,
            email,
            name: fullName,
            username: userName,
            phone: phoneNumber,
            password,
            avatar: "",
            childEmail: "",
        });

        if (!result.error) {
            navigate("/verification-sent");
        }
    };

    return (
        <div className="h-2/7 min-h-150 flex w-2/6 min-w-96 flex-col rounded bg-white pl-8 pr-8 pt-4 pb-6">
            <div className="mb-2 flex items-center">
                <h1 className="font-sans text-2xl font-bold text-fg-soft">Sign Up</h1>
            </div>

            <h1 className="text-l  font-sans font-semibold">Full Name</h1>
            <form className="mt-1" onSubmit={handleSubmit}>
                <Input
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={handleFullNameChange}
                />
            </form>

            <div className="ml-2 mb-2 h-2 text-xs text-red-default">
                {errorMessageFN}
            </div>

            <h1 className="text-l  font-sans font-semibold">User Name</h1>
            <form className="mt-1" onSubmit={handleSubmit}>
                <Input
                    placeholder="Enter your user name"
                    value={userName}
                    onChange={handleUserNameChange}
                />
            </form>

            <div className="ml-2 mb-2 h-2 text-xs text-red-default">
                {errorMessageUN}
            </div>

            <h1 className="text-l font-sans font-semibold">Phone</h1>
            <form className="mt-2" onSubmit={handleSubmit}>
                <Input
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                />
            </form>

            <div className="ml-2 mb-2 h-2 text-xs text-red-default">
                {errorMessagePhone}
            </div>

            <h1 className="text-l font-sans font-semibold">Email</h1>
            <form className="mt-1" onSubmit={handleSubmit}>
                <Input
                    placeholder="Enter email"
                    value={email}
                    onChange={handleEmailChange}
                />
            </form>

            <div className="ml-2 mb-2 h-2 text-xs text-red-default">
                {errorMessage}
            </div>

            <h1 className="text-l font-sans font-semibold">Password</h1>
            <form className="mb-4 mt-1" onSubmit={handleSubmit}>
                <Input
                    placeholder="Enter password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </form>

            <h1 className="text-l font-sans font-semibold">Confirm Password</h1>
            <form className="mt-1" onSubmit={handleSubmit}>
                <Input
                    placeholder="Enter password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                />
            </form>

            <div className="ml-2 mb-2 h-2 text-xs text-red-default">
                {errorMessagePw}
            </div>

            <Button
                onClick={handleSubmit}
                className="mt-2 self-end"
            >
            Sign Up
            </Button>
        </div>
    );
}
