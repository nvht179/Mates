import { useLazyCheckUserByEmailQuery } from "../store";

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