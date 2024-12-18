import { useState } from "react";
import { SelectorState } from "../store";
import { useSelector } from "react-redux";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import DefaultAvatar from "../assets/default_ava.png";
import Button from "./Button";

interface UserModalProps {
  onClose: () => void;
}

function UserModal({ onClose }: UserModalProps) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  // const user = useSelector((state: SelectorState) => state.user);

  const defaultAvatar = DefaultAvatar;

  const user = {
    email: "thanh@gmail.com",
    userName: "thanh",
    fullName: "Dao Xuan Thanh",
    role: "Student",
    picture: defaultAvatar,
  };

  const [userEmail, setUserEmail] = useState(user.email ?? "");
  const [userName, setUserName] = useState(user.userName ?? "");
  const [userFullName, setUserFullName] = useState(user.fullName ?? "");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSignOutClick = () => {
    onClose();
    navigate("/login");
  };

  const handleEditingClick = () => {
    setIsEditing(true);
  };

  const viewAccount = (
    <div>
      <div className="flex flex-row justify-between">
        <p className="font-semibold">{userName}</p>
        <p
          className="cursor-pointer text-fg-softer active:opacity-30"
          onClick={handleSignOutClick}
        >
          Sign out
        </p>
      </div>
      <div className="mt-2 flex flex-row items-center">
        <img
          src={user?.picture ?? defaultAvatar}
          alt="user"
          className="h-14 w-14 rounded-full"
        />
        <div className="ml-2 flex flex-col">
          <div className="text-lg font-bold">{userFullName}</div>
          <p className="">{userEmail}</p>
          <p>Role: {user.role}</p>
        </div>
      </div>
      <Button primary className="mt-4" onClick={handleEditingClick}>
        Edit account
      </Button>
    </div>
  );

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserFullName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };

  const handleViewClick = () => {
    setIsEditing(false);
    setUserEmail(user.email);
    setUserName(user.userName);
    setUserFullName(user.fullName);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // dispatch(updateUser({ email: userEmail, userName, fullName: userFullName }));
  }

  const EditAccount = (
    <div>
      <div className="flex flex-row items-center justify-between">
        <Input
          className="w-64 font-semibold"
          placeholder={"Enter your user name"}
          value={userName || ""}
          onChange={handleUserNameChange}
        />
      </div>
      <div className="mt-2 flex flex-row items-center">
        <img
          src={user?.picture ?? defaultAvatar}
          alt="user"
          className="h-14 w-14 rounded-full"
        />
        <div className="ml-2 flex flex-col">
          <Input
            className="font-semibold"
            placeholder={"Enter your full name"}
            value={userFullName || ""}
            onChange={handleFullNameChange}
          />
          <Input
            className="mt-2"
            placeholder={"Enter your email"}
            value={userEmail || ""}
            onChange={handleEmailChange}
          />
          <p className="mt-2">Role: {user.role}</p>
        </div>
      </div>
      <div className="mt-2 flex flex-row justify-end">
        <Button primary className="w-24" onClick={handleSaveClick}>
          Save
        </Button>
        <Button secondary onClick={handleViewClick} className="ml-2 w-24">
          Cancel
        </Button>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex justify-end">
      <div
        className="absolute inset-0 bg-fg-disabled opacity-50"
        onClick={onClose}
      ></div>
      <div
        className="relative mt-12 h-fit w-96 bg-bg-alt p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {isEditing ? EditAccount : viewAccount}
      </div>
    </div>,
    document.querySelector(".modal-container") as Element,
  );
}

export default UserModal;
