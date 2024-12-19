import React, { useEffect, useState, useCallback } from "react";
import { RootState, setUserInfo } from "../store";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import DefaultAvatar from "../assets/default_ava.png";
import Input from "./Input";

interface UserModalProps {
  onClose: () => void;
}

function getUsername(email: string | null) {
  if (!email) return "";
  return email.split("@")[0];
}

// Move components outside
const UserInfo = React.memo(
  ({
    userFullName,
    userEmail,
    defaultAvatar,
    onEdit,
  }: {
    userFullName: string;
    userEmail: string;
    defaultAvatar: string;
    onEdit: () => void;
  }) => (
    <div className="flex min-h-10 min-w-64 items-center">
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
          onClick={onEdit}
        >
          Edit account info
        </a>
      </div>
    </div>
  ),
);

const EditableUserInfo = React.memo(
  ({
    userFullName,
    userEmail,
    defaultAvatar,
    onFullNameChange,
    onEmailChange,
    onSave,
    onCancel,
  }: {
    userFullName: string;
    userEmail: string;
    defaultAvatar: string;
    onFullNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSave: () => void;
    onCancel: () => void;
  }) => (
    <div className="flex min-h-24 min-w-64 flex-col items-center">
      <div className="flex flex-row items-center">
        <img
          src={defaultAvatar}
          alt="user"
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className="ml-4 flex flex-col">
          <Input
            key="fullname-input"
            className="mb-1 h-8 text-sm"
            placeholder="Enter your full name"
            value={userFullName}
            onChange={onFullNameChange}
          />
          <Input
            key="email-input"
            className="mb-1 h-8 text-sm"
            placeholder="Enter your email"
            value={userEmail}
            onChange={onEmailChange}
          />
        </div>
      </div>
      <div className="mt-1 flex w-full select-none flex-row items-center justify-end">
        <a
          className="cursor-pointer text-xs text-fg-softer hover:text-primary-default"
          onClick={onCancel}
        >
          Cancel
        </a>
        <a
          className="ml-4 mr-2 cursor-pointer text-xs text-fg-softer hover:text-primary-default"
          onClick={onSave}
        >
          Save
        </a>
      </div>
    </div>
  ),
);

function UserModal({ onClose }: UserModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { role, email, avatar, name, phone } = useSelector(
    (state: RootState) => state.user,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState(email ?? "");
  const [userName, setUserName] = useState("");
  const [userFullName, setUserFullName] = useState(name ?? "");
  const defaultAvatar = DefaultAvatar;

  useEffect(() => {
    setUserName(getUsername(email));
  }, [email]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSignOutClick = useCallback(() => {
    onClose();
    navigate("/login");
  }, [onClose, navigate]);

  const handleFullNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setUserFullName(e.target.value),
    [],
  );

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setUserEmail(e.target.value),
    [],
  );

  const handleSaveClick = useCallback(() => {
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
  }, [userEmail, userFullName, role, avatar, phone, dispatch]);

  const handleViewClick = useCallback(() => {
    setIsEditing(false);
    setUserEmail(email || "");
    setUserName(userName || "");
    setUserFullName(name || "");
  }, [email, userName, name]);

  const handleEdit = useCallback(() => setIsEditing(true), []);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      <div
        className="absolute inset-0 bg-black bg-opacity-0 transition-opacity"
        onClick={onClose}
      />
      <div
        className="relative mr-1 mt-12 transform rounded border-bg-soft bg-white p-4 shadow drop-shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex w-full flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <p className="mr-2 text-sm font-semibold uppercase">{userName}</p>
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
        </div>

        <div className="mt-2">
          {isEditing ? (
            <EditableUserInfo
              userFullName={userFullName}
              userEmail={userEmail}
              defaultAvatar={defaultAvatar}
              onFullNameChange={handleFullNameChange}
              onEmailChange={handleEmailChange}
              onSave={handleSaveClick}
              onCancel={handleViewClick}
            />
          ) : (
            <UserInfo
              userFullName={userFullName}
              userEmail={userEmail}
              defaultAvatar={defaultAvatar}
              onEdit={handleEdit}
            />
          )}
        </div>
      </div>
    </div>,
    document.querySelector(".modal-container") as Element,
  );
}

export default React.memo(UserModal);
