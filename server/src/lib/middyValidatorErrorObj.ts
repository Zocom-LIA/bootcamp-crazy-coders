import middy from "@middy/core";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { middyValidationError } from "@util/response.js";
import { MiddyError, MiddyErrorObject } from "@src/types";
import { HttpCode } from "@src/util/httpCodes";

const middyValidatorErrorObj = (): middy.MiddlewareObj<
  APIGatewayProxyEvent,
  APIGatewayProxyResult
> => {
  const onError: middy.MiddlewareFn<
    APIGatewayProxyEvent,
    APIGatewayProxyResult
  > = async (request): Promise<void> => {
    if (
      request.error?.name === "BadRequestError" &&
      (request.error as unknown as MiddyError)
    ) {
      let error = request.error as unknown as MiddyError;
      let message =
        "Unable to proceed with request. Encountered following errors => ";
      error.cause.data.forEach((err) => {
        if (err as MiddyErrorObject) {
          message += `[ ${(err as MiddyErrorObject).message} ] `;
        }
      });
      request.response = middyValidationError(HttpCode.BAD_REQUEST, message);
    } else if (request.error?.name === "UnauthorizedError") {
      request.response = middyValidationError(
        HttpCode.UNAUTHORIZED,
        request.error.message
      );
    } else {
      request.response = middyValidationError(
        HttpCode.BAD_REQUEST,
        request.error?.message ?? "Unexpected error"
      );
    }
    Promise.resolve();
  };

  return {
    onError,
  };
};

export default middyValidatorErrorObj;
