import { FormEvent, useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

/*
 ****************************************** TYPES ********************************************************************
 */

interface ILoggedInState {
  loading: boolean;
  showAlertDialog: boolean;
  serverResponse: ServerResponse | null;
}

type LoginCredentials = {
  username?: String;
  password?: String;
};

type ServerResponse = {
  status: number;
  message: string;
};

const initialState = {
  loading: false,
  showAlertDialog: false,
  serverResponse: null,
};

/*
 ****************************************** HELPER ********************************************************************
 */

const mergeState = <T extends object>(prevState: T, merge: Partial<T>): T => {
  return { ...prevState, ...merge };
};

const parseAWSResponseMessage = (data: any): string => {
  console.info(data);
  if (typeof data === 'string') {
    return data;
  }
  try {
    let { message } = data as ServerResponse;
    return message;
  } catch (error) {
    return 'Unexpected response from server';
  }
};

/*
 ****************************************** LOCAL STORAGE ********************************************************************
 */

const getCurrentToken = (): string | null => {
  return localStorage.getItem('AccessToken');
};

const setCurrentToken = (token: string | null): boolean => {
  if (!token) {
    return false;
  }
  try {
    localStorage.setItem('AccessToken', token);
    return true;
  } catch (error) {
    return false;
  }
};

const removeCurrentToken = () => {
  localStorage.removeItem('AccessToken');
};

/*
 ****************************************** REQUEST ********************************************************************
 */

const loginRequest = async (
  credentials: LoginCredentials
): Promise<ServerResponse> => {
  return fetch(`${import.meta.env.VITE_API_URL}/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': `${import.meta.env.VITE_API_KEY}`,
    },
    body: JSON.stringify(credentials),
  })
    .then(async (response) => {
      let data = await response.json();
      if (response.ok) {
        let hasToken = setCurrentToken(data.accessToken);
        return {
          status: hasToken ? 200 : 400,
          message: hasToken
            ? 'Successfully logged in, move on to orders.'
            : 'Tokenvalidation failed',
        };
      } else {
        let message = parseAWSResponseMessage(data);
        return {
          status: response.status,
          message: message,
        };
      }
    })
    .catch((_) => {
      return {
        status: 500,
        message: 'Unexpected error, please try again',
      };
    });
};

const validTokenRequest = async (token: string): Promise<ServerResponse> => {
  return fetch(`${import.meta.env.VITE_API_URL}/admin/validation`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(async (response) => {
    let data = await response.json();
    let message = parseAWSResponseMessage(data);
    return {
      status: response.status,
      message: message,
    };
  });
};

/*
 ****************************************** USE DATA ********************************************************************
 */

export const useData = () => {
  const navigate: NavigateFunction = useNavigate();
  const [state, setState] = useState<ILoggedInState>(initialState);

  const navigateAdminToOrders = () => {
    navigate('/orders');
  };

  useEffect(() => {
    const apiValidToken = async () => {
      let token = getCurrentToken();
      if (token) {
        removeCurrentToken();
        validTokenRequest(token)
          .then((response) => {
            if (response.status === 200) {
              setCurrentToken(token);
              navigateAdminToOrders();
            }
          })
          .catch((error) => {
            console.info(error);
          });
      }
    };
    apiValidToken();
  }, []);

  const apiLogin = (credentials: LoginCredentials) => {
    loginRequest(credentials)
      .then((response) => {
        setState((prevState) => {
          return mergeState(prevState, {
            loading: false,
            showAlertDialog: true,
            serverResponse: response,
          });
        });
      })
      .catch((error: any) => {
        setState((prevState) => {
          return mergeState(prevState, {
            loading: false,
            showAlertDialog: true,
            serverResponse: {
              status: 500,
              message: error.message,
            },
          });
        });
      });
  };

  return {
    state,
    handleLogin(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setState((prevState) => {
        return mergeState(prevState, {
          loading: true,
          showAlertDialog: false,
        });
      });
      const formData = new FormData(e.currentTarget);
      const formProps = Object.fromEntries(formData);
      apiLogin(formProps);
    },
    toggleAlertDialog(value: boolean) {
      setState((prevState) => {
        return mergeState(prevState, {
          showAlertDialog: value,
        });
      });
    },
    successfullyLoggedIn() {
      navigateAdminToOrders();
    },
  };
};
