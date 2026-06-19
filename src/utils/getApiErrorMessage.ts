import axios from "axios";
type ApiErrorResponse = {
  message?: string;
  error?: string;
};

const getApiErrorMessage = (error: unknown, fallbackMessage = "Something went wrong"): string => {
    
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }

    if (error.response?.data?.error) {
      return error.response.data.error;
    }

    if (error.response?.status === 404) {
      return "Requested data was not found.";
    }

    if (error.response?.status === 500) {
      return "Server error. Please try again later.";
    }

    if (error.code === "ECONNABORTED") {
      return "Request timed out. Please try again.";
    }

    if (!error.response) {
      return "Network error. Please check your internet connection.";
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
};

export default getApiErrorMessage;