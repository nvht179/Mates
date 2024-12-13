import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect, useState } from "react";

// Layout for the auth pages, including: login, signup, forget password.
function AuthLayout() {
  const [backgroundImage, setBackgroundImage] = useState("");
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated,
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Fetch a random image URL from Picsum
    const randomImage = `https://picsum.photos/1920/1080/?blur=10`;
    setBackgroundImage(randomImage);
  }, []);

  return (
    <div
      className="flex h-screen w-screen items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Outlet />
    </div>
  );
}

export default AuthLayout;
