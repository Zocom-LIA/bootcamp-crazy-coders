import middy from "@middy/core";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { appKeyValidationError } from "@util/response.js";

const middyAppKeyObj = (): middy.MiddlewareObj<
  APIGatewayProxyEvent,
  APIGatewayProxyResult
> => {
  const before: middy.MiddlewareFn<
    APIGatewayProxyEvent,
    APIGatewayProxyResult
  > = async (request) => {
    const { app_key } = request.event.headers;
    if (app_key !== process.env["APP_KEY"]) {
      throw appKeyValidationError();
    }
  };

  /*const after: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (request):Promise<void> =>{
    };*/

  /*const onError: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (request):Promise<void> =>{
      Promise.resolve();
    };*/

  return {
    before,
    //after,
    //onError
  };
};

export default middyAppKeyObj;
