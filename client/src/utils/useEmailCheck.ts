import { useLazyCheckUserByEmailQuery } from "../store";
import { ResponseFail } from "../interfaces/Auth";

interface CheckEmailError {
  status: number;
  data?: string;
  error?: string;
}

const useEmailCheck = () => {
  const [checkEmail, { isLoading, isError, error, data, isSuccess }] = useLazyCheckUserByEmailQuery();

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

export default useEmailCheck;