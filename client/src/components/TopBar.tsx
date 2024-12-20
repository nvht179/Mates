import { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import UserModal from "./UserModal";
import MatesLogo from "../assets/mates.svg";
import Input from "./Input";

export default function TopBar() {
  const [showModal, setShowModal] = useState(false);

  const userModal = <UserModal onClose={() => setShowModal(false)} />;

  return (
    <div className="sticky top-0 flex h-12 items-center justify-between border bg-bg-darker p-1 px-6">
      {/* Logo */}
      <img src={MatesLogo} alt="Logo" className="h-6 w-6" />

      {/* Search Bar */}
      <Input type="text" placeholder="Search..." className="w-1/3 text-sm" />

      {/* Icons */}
      <div className="mr-2 flex items-center space-x-4">
        {/* Notification Icon */}
        <div className="relative">
          <span className="absolute right-0 top-0 inline-block h-2 w-2 rounded-full bg-red-default"></span>
          <IoMdNotificationsOutline className="mt-1 cursor-pointer text-2xl active:opacity-30" />
        </div>

        {/* Profile Image */}
        <img
          src="../../public/mates.svg"
          alt="User Profile"
          className="h-6 w-6 cursor-pointer rounded-full active:opacity-30"
          onClick={() => setShowModal(true)}
        />
      </div>

      {/* User Modal */}
      {showModal && userModal}
    </div>
  );
}
