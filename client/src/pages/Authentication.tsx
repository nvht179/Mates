import { useState, useEffect } from "react";
import LoginDialog from "../components/LoginDialog";
import PasswordDialog from "../components/PasswordDialog";

export default function Authentication() {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [email, setEmail] = useState("");
  const [changeEmail, setChangeEmail] = useState(true);

  const handleSubmit = (email) => {
    setEmail(email);
    setChangeEmail(false);
  };

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
      {changeEmail ? (
        <LoginDialog value={email} onSubmit={handleSubmit} />
      ) : (
        <PasswordDialog email={email} onChangeAccount={setChangeEmail} />
      )}
    </div>
  );
}
