import createHttpError, { HttpError } from "http-errors";
import { HttpCode } from "./httpCodes";

const createResponse = (statusCode: number, response: any): any => {
  return {
    statusCode,
    headers: {
      ContentType: "application/json",
    },
    body: JSON.stringify(response),
  };
};

const failedResponse = (error: any): any => {
  const data = error || { statusCode: 500, message: "Internal server error" };
  let newObject = (({
    time,
    requestId,
    statusCode,
    retryable,
    retryDelay,
    stackTrace,
    ...object
  }) => object)(data);
  return {
    statusCode: data?.statusCode || 500,
    headers: {
      ContentType: "application/json",
    },
    body: JSON.stringify(newObject),
  };
};

const appKeyValidationError = (): HttpError => {
  return createHttpError(
    HttpCode.UNAUTHORIZED,
    `You are not authorized to access this resource!`,
    { type: "NotAuthorized" }
  );
};

const orderSumError = (): HttpError => {
  return createHttpError(
    HttpCode.BAD_REQUEST,
    `Total sum of order does not match prices!`,
    { type: "BadRequest" }
  );
};

const middyValidationError = (message: string): any => {
  return createResponse(HttpCode.BAD_REQUEST, message);
};

export {
  createResponse,
  failedResponse,
  appKeyValidationError,
  middyValidationError,
  orderSumError,
};
