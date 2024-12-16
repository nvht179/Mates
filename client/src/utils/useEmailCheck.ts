import { useLazyCheckUserByEmailQuery } from "../store";

interface CheckEmailError {
  status: number;
  data?: string;
  error?: string;
}

const useEmailCheck = () => {
  const [checkEmail, { isLoading }] = useLazyCheckUserByEmailQuery();

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateAndCheckEmail = async (email: string) => {
    if (!isValidEmail(email)) {
      return {
        isValid: false,
        error: "Please enter a valid email address."
      };
    }

    const result = await checkEmail({ email });

    if (result.isError) {
      const { status, error, data } = result.error as CheckEmailError;
      return {
        isValid: false,
        error: status === 403 ? data : error
      };
    }

    return {
      isValid: true,
      error: undefined
    };
  };

  return {
    validateAndCheckEmail,
    isLoading
  };
};

export default useEmailCheck;