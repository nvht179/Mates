import { useLazySendEmailOtpQuery } from "../store";

// check email and send otp
const useEmailOtp = () => {
  const [checkEmail, { isLoading, isError, error, data, isSuccess }] = useLazySendEmailOtpQuery();

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return {
    isValidEmail,
    checkEmail,
    isLoading,
    isError,
    isSuccess,
    error,
    data
  };
};

export default useEmailOtp;