import React, { useEffect, useState, useCallback } from "react";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import DefaultAvatar from "../assets/default-avatar.png";
import Input from "./Input";
import { useLazyLogoutQuery, useUpdateUserIntoMutation } from "../store";
import { responseErrorHandler } from "../utils/responseErrorHandler";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { LuUserRoundPen } from "react-icons/lu";

interface UserModalProps {
  onClose: () => void;
}

interface UserInfoProps {
  userFullName: string | undefined;
  userEmail: string | undefined;
  avatarUrl: string | undefined;
  onEdit: () => void;
}

interface EditableUserInfoProps {
  userFullName: string | undefined;
  userEmail: string | undefined;
  avatar: File | null;
  avatarPreviewUrl: string;
  onFullNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  onAvatarChange: (file: File) => void;
}

const getUsername = (email: string): string => {
  return email.split("@")[0];
};

const UserInfo = React.memo(
  ({ userFullName, userEmail, avatarUrl, onEdit }: UserInfoProps) => (
    <div className="flex min-h-10 min-w-64 items-center">
      <img
        src={avatarUrl}
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
    avatarPreviewUrl,
    onFullNameChange,
    onEmailChange,
    onSave,
    onCancel,
    onAvatarChange,
  }: EditableUserInfoProps) => (
    <div className="flex min-h-24 min-w-64 flex-col items-center">
      <div className="flex flex-row items-center">
          <AvatarUpload
            avatarPreviewUrl={avatarPreviewUrl}
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
    avatarPreviewUrl,
    onAvatarChange,
  }: {
    avatarPreviewUrl: string;
    onAvatarChange: (file: File) => void;
  }) => (
    <label htmlFor="avatarInput" className="relative cursor-pointer active:opacity-50">
      <img
        src={avatarPreviewUrl}
        alt="user"
        className="h-12 w-12 rounded-full object-cover"
      />
      <LuUserRoundPen className="absolute right-0 bottom-0 text-fg-softer" />
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
  const [userEmail, setUserEmail] = useState<string | undefined>();
  const [userName, setUserName] = useState<string | undefined>();
  const [userFullName, setUserFullName] = useState<string | undefined>();
  const [errorMessage, setErrorMessage] = useState("");

  const { id, role, email, avatar, name, phone } = useSelector(
    (state: RootState) => state.user,
  );
  const navigate = useNavigate();

  const [logout, { isSuccess, isError, error }] = useLazyLogoutQuery();
  const [
    updateUserInto,
    {
      data: userUpdatedInfo,
      isError: isUpdateUserError,
      error: updateUserError,
    },
  ] = useUpdateUserIntoMutation();

  useEffect(() => {
    setUserEmail(email ?? "");
    setUserName(getUsername(email ?? ""));
    setUserFullName(name ?? "");
  }, [email, name]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // error handling of updating user info
  useEffect(() => {
    responseErrorHandler(
      isUpdateUserError,
      updateUserError as FetchBaseQueryError,
      setErrorMessage,
    );
    if (isUpdateUserError) {
      console.error(errorMessage);
    }
  }, [errorMessage, isUpdateUserError, updateUserError, userUpdatedInfo]);

  // error handling of logging out
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
    const formData = new FormData();
    formData.append("id", String(id));
    if (userEmail) {
      formData.append("email", userEmail);
    }
    if (userFullName) {
      formData.append("name", userFullName);
    }
    if (phone) {
      formData.append("phone", String(phone));
    }
    if (userAvatar) {
      formData.append("file", userAvatar);
    }
    setIsEditing(false);
    await updateUserInto(formData);
  }, [updateUserInto, userEmail, userFullName, userAvatar, id, phone]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setUserEmail(email ?? "");
    setUserFullName(name ?? "");
    setUserAvatar(null);
  }, [email, name]);

  const getAvatarPreviewUrl = useCallback(() => {
    if (userAvatar) {
      return URL.createObjectURL(userAvatar);
    }
    return avatar && avatar !== "" ? avatar : DefaultAvatar;
  }, [userAvatar, avatar]);

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
              avatar={userAvatar}
              avatarPreviewUrl={getAvatarPreviewUrl()}
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
              avatarUrl={avatar && avatar !== "" ? avatar : DefaultAvatar}
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
