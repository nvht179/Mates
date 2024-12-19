import React, { useEffect, useState, useCallback } from "react";
import { RootState, setUserInfo } from "../store";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import DefaultAvatar from "../assets/default-avatar.png";
import Input from "./Input";
import { useLazyLogoutQuery, useUpdateUserIntoMutation } from "../store";
import { responseErrorHandler } from "../utils/responseErrorHandler";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface UserModalProps {
  onClose: () => void;
}

interface UserInfoProps {
  userFullName: string;
  userEmail: string;
  defaultAvatar: string;
  onEdit: () => void;
}

interface EditableUserInfoProps extends Omit<UserInfoProps, "onEdit"> {
  onFullNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  onAvatarChange: (file: File) => void;
}

const getUsername = (email: string | null): string => {
  return email ? email.split("@")[0] : "";
};

const UserInfo = React.memo(
  ({ userFullName, userEmail, defaultAvatar, onEdit }: UserInfoProps) => (
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
    onAvatarChange,
  }: EditableUserInfoProps) => (
    <div className="flex min-h-24 min-w-64 flex-col items-center">
      <div className="flex flex-row items-center">
        <AvatarUpload
          defaultAvatar={defaultAvatar}
          onAvatarChange={onAvatarChange}
        />
        <div className="ml-4 flex flex-col">
          <Input
            className="mb-1 h-8 text-sm"
            placeholder="Enter your full name"
            value={userFullName}
            onChange={onFullNameChange}
          />
          <Input
            className="mb-1 h-8 text-sm"
            placeholder="Enter your email"
            value={userEmail}
            onChange={onEmailChange}
          />
        </div>
      </div>
      <ActionButtons onSave={onSave} onCancel={onCancel} />
    </div>
  ),
);

const AvatarUpload = React.memo(
  ({
    defaultAvatar,
    onAvatarChange,
  }: {
    defaultAvatar: string;
    onAvatarChange: (file: File) => void;
  }) => (
    <label htmlFor="avatarInput" className="cursor-pointer">
      <img
        src={defaultAvatar}
        alt="user"
        className="h-12 w-12 rounded-full object-cover active:opacity-50"
      />
      <input
        type="file"
        id="avatarInput"
        className="hidden"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            onAvatarChange(e.target.files[0]);
          }
        }}
      />
    </label>
  ),
);

const ActionButtons = React.memo(
  ({ onSave, onCancel }: { onSave: () => void; onCancel: () => void }) => (
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
  ),
);

function UserModal({ onClose }: UserModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [userAvatar, setUserAvatar] = useState<File | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { id, role, email, avatar, name, phone } = useSelector(
    (state: RootState) => state.user,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logout, { isSuccess, isError, error }] = useLazyLogoutQuery();
  const [updateUserInto] = useUpdateUserIntoMutation();

  useEffect(() => {
    setUserEmail(email ?? "");
    setUserName(getUsername(email));
    setUserFullName(name ?? "");
  }, [email, name]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    responseErrorHandler(
      isError,
      error as FetchBaseQueryError,
      setErrorMessage,
    );
    if (isSuccess) {
      navigate("/");
    }
    if (isError) {
      console.error(errorMessage);
    }
  }, [error, errorMessage, isError, isSuccess, navigate]);

  const handleLogout = useCallback(async () => {
    onClose();
    await logout();
  }, [onClose, logout]);

  const handleUpdateUser = useCallback(async () => {
    setIsEditing(false);
    await updateUserInto({
      id: String(id),
      email: userEmail,
      name: userFullName,
      phone: String(phone),
      avatar: userAvatar,
    }).unwrap();

    dispatch(
      setUserInfo({
        email: userEmail,
        name: userFullName,
        childEmail: "",
        role,
        avatar: userAvatar ? URL.createObjectURL(userAvatar) : avatar,
        phone,
      }),
    );
  }, [
    updateUserInto,
    userEmail,
    userFullName,
    userAvatar,
    dispatch,
    id,
    role,
    avatar,
    phone,
  ]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setUserEmail(email || "");
    setUserFullName(name || "");
  }, [email, name]);

  const modal = (
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
                onClick={handleLogout}
                className="cursor-pointer text-xs text-fg-softer hover:text-primary-default"
              >
                Log out
              </a>
            )}
          </div>
        </div>
        <div className="mt-2">
          {isEditing ? (
            <EditableUserInfo
              userFullName={userFullName}
              userEmail={userEmail}
              defaultAvatar={
                userAvatar ? URL.createObjectURL(userAvatar) : DefaultAvatar
              }
              onFullNameChange={(e) => setUserFullName(e.target.value)}
              onEmailChange={(e) => setUserEmail(e.target.value)}
              onSave={handleUpdateUser}
              onCancel={handleCancel}
              onAvatarChange={setUserAvatar}
            />
          ) : (
            <UserInfo
              userFullName={userFullName}
              userEmail={userEmail}
              defaultAvatar={avatar ?? DefaultAvatar}
              onEdit={() => setIsEditing(true)}
            />
          )}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modal,
    document.querySelector(".modal-container") as Element,
  );
}

export default React.memo(UserModal);
