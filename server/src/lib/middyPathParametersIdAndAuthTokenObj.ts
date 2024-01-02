import middy from "@middy/core";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { authenticate } from "@lib/authentication.js";
import { ValidationError } from "@util/validationError.js";
import {
  appTokenValidationError,
  appTokenExpiredError,
  pathParametersError,
} from "@util/response.js";

const middyPathParametersIdAndAuthTokenObj = (): middy.MiddlewareObj<
  APIGatewayProxyEvent,
  APIGatewayProxyResult
> => {
  const before: middy.MiddlewareFn<
    APIGatewayProxyEvent,
    APIGatewayProxyResult
  > = async (request): Promise<void> => {
    if (
      !request.event.pathParameters ||
      !request.event.pathParameters.hasOwnProperty("id")
    ) {
      throw pathParametersError();
    }
    const { authorization } = request.event.headers;
    let secret = process.env["APP_KEY"];
    if (authorization && secret) {
      const [token, ..._] = authorization.split(" ").reverse();
      await authenticate(token, secret)
        .then((decodedData) => {
          (request.event as any).auth = decodedData;
          return;
        })
        .catch((error) => {
          if (
            ValidationError.isInstance(error) &&
            (error as ValidationError).name === "TokenExpiredError"
          ) {
            throw appTokenExpiredError();
          } else {
            throw appTokenValidationError();
          }
        });
    } else {
      throw appTokenValidationError();
    }
  };

  return {
    before,
  };
};

export default middyPathParametersIdAndAuthTokenObj;
