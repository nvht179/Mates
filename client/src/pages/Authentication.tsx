import { useState, useEffect } from "react";
import LoginDialog from "../components/LoginDialog";
import PasswordDialog from "../components/PasswordDialog";
import { RootState } from "../store";
import { setCredentials } from "../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Authentication() {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [changeEmail, setChangeEmail] = useState(true);
  const { email } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleSubmitEmail = (email: string) => {
    dispatch(setCredentials({ userId: null, email }));
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
        <LoginDialog email={email} onSubmit={handleSubmitEmail} />
      ) : (
        <PasswordDialog email={email} onChangeAccount={setChangeEmail} />
      )}
    </div>
  );
}
