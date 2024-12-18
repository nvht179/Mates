import React, { useEffect, useState } from "react";
import { SelectorState } from "../store";
import { useSelector } from "react-redux";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import DefaultAvatar from "../assets/default_ava.png";
import Input from "./Input";
import Button from "./Button";
import { FaRegEdit } from "react-icons/fa";

interface UserModalProps {
  onClose: () => void;
}

function UserModal({ onClose }: UserModalProps) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const hihi = useSelector((state: SelectorState) => state.user);

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

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setter(e.target.value);

  const handleSaveClick = () => {
    setIsEditing(false);
    // dispatch(updateUser({ email: userEmail, userName, fullName: userFullName }));
  };

  const handleViewClick = () => {
    setIsEditing(false);
    setUserEmail(user.email);
    setUserName(user.userName);
    setUserFullName(user.fullName);
  };

  const UserInfo = () => (
    <div className="flex items-center">
      <img
        src={user?.picture ?? defaultAvatar}
        alt="user"
        className="h-14 w-14 rounded-full object-cover"
      />
      <div className="ml-4 flex flex-col space-y-1">
        <div className="text-lg font-bold">{userFullName}</div>
        <p className="text-sm text-gray-600">{userEmail}</p>
        <p className="text-sm text-gray-600">Role: {user.role}</p>
      </div>
    </div>
  );

  const EditableUserInfo = () => (
    <div className="flex items-center">
      <img
        src={user?.picture ?? defaultAvatar}
        alt="user"
        className="h-14 w-14 rounded-full object-cover"
      />
      <div className="ml-4 flex flex-col space-y-2">
        <Input
          className="font-semibold"
          placeholder="Enter your full name"
          value={userFullName}
          onChange={handleInputChange(setUserFullName)}
        />
        <Input
          placeholder="Enter your email"
          value={userEmail}
          onChange={handleInputChange(setUserEmail)}
        />
        <p className="text-sm text-gray-600">Role: {user.role}</p>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      <div
        className="absolute inset-0 bg-black bg-opacity-0 shadow transition-opacity"
        onClick={onClose}
      />
      <div
        className="relative mt-12 w-96 transform rounded bg-white p-6 shadow-xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b">
          {isEditing ? (
            <Input
              className="w-64 font-semibold"
              placeholder="Enter your username"
              value={userName}
              onChange={handleInputChange(setUserName)}
            />
          ) : (
            <p className="text-xl font-semibold">{userName}</p>
          )}
          {!isEditing && (
            <button
              onClick={handleSignOutClick}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Sign out
            </button>
          )}
        </div>

        <div className="mt-4">
          {isEditing ? <EditableUserInfo /> : <UserInfo />}
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          {isEditing ? (
            <>
              <Button secondary onClick={handleViewClick}>
                Cancel
              </Button>
              <Button primary onClick={handleSaveClick}>
                Save
              </Button>
            </>
          ) : (
            <Button primary onClick={() => setIsEditing(true)}>
              <FaRegEdit className="mr-2"/>
              Edit
            </Button>
          )}
        </div>
      </div>
    </div>,
    document.querySelector(".modal-container") as Element,
  );
}

export default UserModal;
