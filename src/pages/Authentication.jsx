import { useState, useEffect } from "react";
import LoginDialog from "../components/LoginDialog";

export default function Authentication() {
  const [backgroundImage, setBackgroundImage] = useState("");

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
      <LoginDialog />
    </div>
  );
}
