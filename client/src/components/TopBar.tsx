import { IoMdNotificationsOutline } from "react-icons/io";
import logo from "../../public/vite.svg";
import Input from "./Input";

export default function TopBar() {
  return (
    <div className="sticky top-0 flex h-12 items-center justify-between border bg-primary-bg p-1 px-4 shadow-md">
      {/* Logo */}
      <img src={logo} alt="Logo" className="h-6 w-6" />

      {/* Search Bar */}
      <div className="w-2/5 items-center p-2">
        <Input type="text" placeholder="Search" />
      </div>

      {/* Icons */}
      <div className="mr-2 flex items-center space-x-4">
        {/* Notification Icon */}
        <div className="relative">
          <span className="absolute right-0 top-0 inline-block h-2 w-2 rounded-full bg-red-default"></span>
          <IoMdNotificationsOutline className="mt-1 cursor-pointer text-2xl active:opacity-30" />
        </div>

        {/* Profile Image */}
        <img
          src="../../public/vite.svg"
          alt="User Profile"
          className="h-6 w-6 rounded-full"
        />
      </div>
    </div>
  );
}
