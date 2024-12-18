import React, { useEffect, useState } from "react";
import { RootState, setUserInfo } from "../store";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import DefaultAvatar from "../assets/default_ava.png";
import Input from "./Input";
import Button from "./Button";

interface UserModalProps {
  onClose: () => void;
}

function getUsername(email: string | null) {
  if (!email) return "";
  return email.split("@")[0];
}

function UserModal({ onClose }: UserModalProps) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const { role, email, avatar, name, phone } = useSelector(
    (state: RootState) => state.user,
  );
  const dispatch = useDispatch();

  const defaultAvatar = DefaultAvatar;

  const userHandler = getUsername(email);

  const [userEmail, setUserEmail] = useState(email ?? "");
  const [userName, setUserName] = useState(userHandler ?? "");
  const [userFullName, setUserFullName] = useState(name ?? "");

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
    dispatch(
      setUserInfo({
        email: userEmail,
        name: userFullName,
        childEmail: "",
        role: role,
        avatar,
        phone,
      }),
    );
  };

  const handleViewClick = () => {
    setIsEditing(false);
    setUserEmail(email || "");
    setUserName(userName || "");
    setUserFullName(name || "");
  };

  const UserInfo = () => (
    <div className="flex items-center">
      <img
        src={defaultAvatar}
        alt="user"
        className="h-12 w-12 rounded-full object-cover"
      />
      <div className="ml-4 flex flex-col">
        <p className="text-sm font-bold uppercase">{userFullName}</p>
        <p className="text-xs text-fg-soft">{userEmail}</p>
        <a
          className="mt-1 cursor-pointer text-xs text-fg-softer hover:text-primary-default"
          onClick={() => setIsEditing(true)}
        >
          Edit account info
        </a>
        {/*<p className="text-sm text-gray-600">Role: {role}</p>*/}
      </div>
    </div>
  );

  const EditableUserInfo = () => (
    <div className="flex items-center">
      <img
        src={defaultAvatar}
        alt="user"
        className="h-14 w-14 rounded-full object-cover"
      />
      <div className="ml-4 flex flex-col">
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
        <p className="text-sm text-gray-600">Role: {role}</p>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      <div
        className="absolute inset-0 bg-black bg-opacity-0 transition-opacity"
        onClick={onClose}
      />
      <div
        className="border-bg-soft relative mr-1 mt-12 transform rounded bg-white p-4 shadow drop-shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          {isEditing ? (
            <Input
              className="w-64 font-semibold"
              placeholder="Enter your username"
              value={userName}
              onChange={handleInputChange(setUserName)}
            />
          ) : (
            <div className="flex w-full flex-row items-center justify-between">
              <div className="flex flex-row items-center">
                <p className="mr-2 text-sm font-semibold uppercase">
                  {userName}
                </p>
                <p className="text-xs">{role}</p>
              </div>
              {!isEditing && (
                <a
                  onClick={handleSignOutClick}
                  className="cursor-pointer text-xs text-fg-softer hover:text-primary-default"
                >
                  Sign out
                </a>
              )}
            </div>
          )}
        </div>

        <div className="mt-2">
          {isEditing ? <EditableUserInfo /> : <UserInfo />}
        </div>

        {/*<div className="mt-6 flex justify-end space-x-2">*/}
        {/*  {isEditing ? (*/}
        {/*    <>*/}
        {/*      <Button secondary onClick={handleViewClick}>*/}
        {/*        Cancel*/}
        {/*      </Button>*/}
        {/*      <Button primary onClick={handleSaveClick}>*/}
        {/*        Save*/}
        {/*      </Button>*/}
        {/*    </>*/}
        {/*  ) : (*/}
        {/*    <Button primary onClick={() => setIsEditing(true)}>*/}
        {/*      <FaRegEdit className="mr-2"/>*/}
        {/*      Edit*/}
        {/*    </Button>*/}
        {/*  )}*/}
        {/*</div>*/}
      </div>
    </div>,
    document.querySelector(".modal-container") as Element,
  );
}

export default UserModal;
