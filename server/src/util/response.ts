import createHttpError, { HttpError } from "http-errors";
import { HttpCode } from "./httpCodes";

const createResponse = (statusCode: number, response: any): any => {
  return {
    statusCode,
    headers: {
      ContentType: "application/json",
      'Access-Control-Allow-Origin': 'http://localhost:5173',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
      'Access-Control-Allow-Credentials': true,
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

const orderItemsNotFoundError = (): HttpError => {
  return createHttpError(
    HttpCode.BAD_REQUEST,
    `Unexpected item found during process of validating order. Please make sure selection names matches thoose inside current menu.`,
    { type: "BadRequest" }
  );
};

const middyValidationError = (message: string): any => {
  return createResponse(HttpCode.BAD_REQUEST, message);
};

const adminNotFoundError = (): HttpError => {
  return createHttpError(HttpCode.NOT_FOUND, `Incorrect username or password`, {
    type: "NotFound",
  });
};

const appTokenValidationError = (): HttpError => {
  return createHttpError(
    HttpCode.UNAUTHORIZED,
    `You are not authorized to access this resource!`,
    { type: "NotAuthorized" }
  );
};

const appTokenExpiredError = (): HttpError => {
  return createHttpError(
    HttpCode.UNAUTHORIZED,
    `You are not authorized to access this resource, current token has expired!`,
    { type: "NotAuthorized" }
  );
};

const createAdminExistsError = (): any => {
  return {
    statusCode: HttpCode.BAD_REQUEST,
    message: `Create account failed. User already exists in database.`,
  };
};

const createMenuExistsError = (): any => {
  return {
    statusCode: HttpCode.BAD_REQUEST,
    message: `Create menu failed. Menu already exists in database.`,
  };
};

export {
  createResponse,
  failedResponse,
  appKeyValidationError,
  middyValidationError,
  adminNotFoundError,
  appTokenValidationError,
  appTokenExpiredError,
  createAdminExistsError,
  createMenuExistsError,
  orderSumError,
  orderItemsNotFoundError,
};
