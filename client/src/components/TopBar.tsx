import { useState } from "react";
import UserModal from "./UserModal";
import MatesLogo from "../assets/mates.svg";
import Input from "./Input";
import defaultAvatar from "../assets/default-avatar.png";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Notification from "./Notification";

export default function TopBar() {
  const [showModal, setShowModal] = useState(false);

  const user = useSelector((state: RootState) => state.user);

  const userModal = <UserModal onClose={() => setShowModal(false)} />;

  return (
    <div>
      <div className="sticky top-0 grid h-12 w-full grid-cols-3 items-center justify-between border bg-bg-darker p-1 px-6">
        {/* Logo */}
        <img src={MatesLogo} alt="Logo" className="h-6 w-6" />

        {/* Search Bar */}
        <div className="flex flex-grow justify-center">
          <Input
            type="text"
            placeholder="Search..."
            className="w-full text-sm"
          />
        </div>

        {/* Icons */}
        <div className="mr-2 ml-auto flex items-center space-x-4">
          {/* Notification Icon */}
          <div className="relative">
            <Notification />
          </div>

          <div
            className="flex cursor-pointer items-center space-x-2 active:opacity-30"
            onClick={() => setShowModal(true)}
          >
            {/* Profile Image */}

            <img
              src={user.avatar ? user.avatar : defaultAvatar}
              alt={user.name || "Unknown"}
              className="h-6 w-6 rounded-full object-cover"
            />
            <p className="text-sm">{user.name}</p>
          </div>
        </div>
      </div>
      {/* User Modal */}
      {showModal && userModal}
    </div>
  );
}
