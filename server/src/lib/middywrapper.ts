import middy, { MiddyfiedHandler } from "@middy/core";
import cors from "@middy/http-cors";
import httpErrorHandler from "@middy/http-error-handler";
import { transpileSchema } from "@middy/validator/transpile";
import httpEventNormalizer from "@middy/http-event-normalizer";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import httpResponseSerializer from "@middy/http-response-serializer";
import validator from "@middy/validator";
import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
  Handler as AWSHandler,
} from "aws-lambda";
import { Entity, Paged, OneField } from "dynamodb-onetable";
import middyValidatorErrorObj from "./middyValidatorErrorObj.js";

export interface Event<TBody, TPathParameters, TQueryStringParameters>
  extends Omit<
    APIGatewayProxyEvent,
    "body" | "pathParameters" | "queryStringParameters"
  > {
  body: TBody;
  pathParameters: TPathParameters;
  queryStringParameters: TQueryStringParameters;
  multiValueQueryStringParameters: NonNullable<
    APIGatewayProxyEvent["multiValueQueryStringParameters"]
  >;
}

export interface Result extends Omit<APIGatewayProxyResult, "body"> {
  body:
    | Entity<Record<string, OneField>>
    | Paged<Entity<Record<string, OneField>>>
    | string
    | Record<string, unknown>;
}

export type Handler<
  TBody = void,
  TPathParameters = void,
  TQueryStringParameters = void
> = AWSHandler<Event<TBody, TPathParameters, TQueryStringParameters>, Result>;

export const middyfy = (
  handler: Handler<never, never, never>,
  requestSchema: Record<string, unknown> | null = null,
  middleWareObj: middy.MiddlewareObj<
    APIGatewayProxyEvent,
    APIGatewayProxyResult
  > | null = null
): MiddyfiedHandler<Event<never, never, never>, Result, Error, Context> => {
  const wrapper = middy(handler);
  if (requestSchema) {
    wrapper.use(middyJsonBodyParser());
    wrapper.use(httpEventNormalizer());
    wrapper.use(validator({ eventSchema: transpileSchema(requestSchema) }));
  } else {
    wrapper.use(httpEventNormalizer());
  }
  if (middleWareObj) {
    wrapper.use(middleWareObj);
  }
  wrapper.use(middyValidatorErrorObj());
  wrapper.use(cors()).use(httpErrorHandler());
  return wrapper;
};
