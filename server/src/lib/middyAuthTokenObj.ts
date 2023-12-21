import middy from "@middy/core";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { authenticate } from "@lib/authentication.js";
import { ValidationError } from "@util/validationError.js";
import {
  appTokenValidationError,
  appTokenExpiredError,
} from "@util/response.js";

const middyAuthTokenObj = (): middy.MiddlewareObj<
  APIGatewayProxyEvent,
  APIGatewayProxyResult
> => {
  const before: middy.MiddlewareFn<
    APIGatewayProxyEvent,
    APIGatewayProxyResult
  > = async (request): Promise<void> => {
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

  /*const after: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (request):Promise<void> => {
   }

    const onError: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (request):Promise<void> =>{
   };*/

  return {
    before,
  };
};

export default middyAuthTokenObj;
