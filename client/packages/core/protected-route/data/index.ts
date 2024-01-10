import {
  getCurrentToken,
  parseAWSResponseMessage,
  removeCurrentToken,
} from "@zocom/helper-functions";
import { ServerResponse } from "@zocom/types";
import { useEffect, useState } from "react";

/*
 ****************************************** REQUEST ********************************************************************
 */

const validTokenRequest = async (token: string): Promise<ServerResponse> => {
  return fetch(`${import.meta.env.VITE_API_URL}/admin/validation`, {
    method: "GET",
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
  const [isValidToken, setIsValidToken] = useState<boolean | undefined>();
  let fetching = false;
  const tooggleToken = (valid: boolean) => {
    if (!valid) {
      removeCurrentToken();
    }
    setIsValidToken(valid);
  };

  useEffect(() => {
    const apiValidToken = async () => {
      let token = getCurrentToken();
      if (token) {
        validTokenRequest(token)
          .then((response) => {
            tooggleToken(response.status === 200);
          })
          .catch(() => {
            tooggleToken(false);
          });
      } else {
        setIsValidToken(false);
      }
    };

    if (!fetching) {
      fetching = true;
      apiValidToken();
    }
  }, []);

  return {
    isValidToken,
  };
};
