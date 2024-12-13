import { useState, useEffect } from "react";
import Input from "./Input";
import Button from "./Button";
import { useNavigate, useLocation } from "react-router-dom";

interface RoleState {
    role: string | null;
  }

export default function SignupParent() {
    const [fullName, setFullname] = useState("");
    const [phoneNumber, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpw, setConfirmpw] = useState("");
    const [child, setChild] = useState("");

    const location = useLocation();
    const role = (location.state as RoleState)?.role || null;
    const navigate = useNavigate();

    useEffect(() => {
    if (!role || role === "") {
        navigate("/choose-role");
    }
    }, [role, navigate]);


    const handleFullnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFullname(e.target.value);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setPhone(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleConfirmpwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmpw(e.target.value);
    };

    const handleChildChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setChild(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
    };


    return (
        <div className="flex h-2/7 min-h-150 w-1/4 min-w-96 flex-col rounded bg-white p-8">
            <div className="mb-2 flex items-center">
                <h1 className="font-sans text-2xl font-bold text-fg-soft">
                    Sign Up
                </h1>
            </div>

            <h1 className="mt-4 font-sans text-l font-semibold">Full Name</h1>
            <form className="mb-2 mt-1" onSubmit={handleSubmit}>
                <Input placeholder="Enter your full name" value={fullName} onChange={handleFullnameChange} />
            </form>

            <h1 className="font-sans text-l font-semibold">Phone</h1>
            <form className="mb-2 mt-1" onSubmit={handleSubmit}>
                <Input placeholder="Enter your phone number" value={phoneNumber} onChange={handlePhoneChange} />
            </form>

            <h1 className="font-sans text-l font-semibold">Email</h1>
            <form className="mb-2 mt-1" onSubmit={handleSubmit}>
                <Input placeholder="Enter email" value={email} onChange={handleEmailChange} />
            </form>

            <h1 className="font-sans text-l font-semibold">Password</h1>
            <form className="mb-2 mt-1" onSubmit={handleSubmit}>
                <Input placeholder="Enter password" value={password} onChange={handlePasswordChange} />
            </form>

            <h1 className="font-sans text-l font-semibold">Confirm Password</h1>
            <form className="mb-2 mt-1" onSubmit={handleSubmit}>
                <Input placeholder="Enter password" value={confirmpw} onChange={handleConfirmpwChange} />
            </form>

            <h1 className="font-sans text-l font-semibold">You are:</h1>
            <div className="mb-4 mt-1 w-full">
                <select
                    id="role"
                    value={child}
                    onChange={handleChildChange}
                    className="cursor-pointer w-full rounded border-2 bg border-fg-border p-2 px-3 focus:border-primary-default focus:outline-none"
                    // className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"

                >
                    <option value="" disabled>
                        Select your role
                    </option>
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Admin">Parent</option>
                </select>
            </div>

            <Button>Sign Up</Button>
        </div>
    );
}
