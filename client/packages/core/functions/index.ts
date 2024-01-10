import { ServerResponse } from "@zocom/types";
export const mergeState = <T extends object>(
  prevState: T,
  merge: Partial<T>
): T => {
  return { ...prevState, ...merge };
};

export const parseAWSResponseMessage = (data: any): string => {
  if (typeof data === "string") {
    return data;
  }
  try {
    let { message } = data as ServerResponse;
    return message;
  } catch (error) {
    return "Unexpected response from server";
  }
};

export const getCurrentToken = (): string | null => {
  return localStorage.getItem("AccessToken");
};

export const setCurrentToken = (token: string | null): boolean => {
  if (!token) {
    return false;
  }
  try {
    localStorage.setItem("AccessToken", token);
    return true;
  } catch (error) {
    return false;
  }
};

export const removeCurrentToken = () => {
  localStorage.removeItem("AccessToken");
};
