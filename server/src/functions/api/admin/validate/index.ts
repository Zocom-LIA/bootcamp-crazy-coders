import { Handler, middyfy } from "@lib/middywrapper.js";
import { failedResponse, createResponse } from "@util/response.js";
import middyAuthTokenObj from "@lib/middyAuthTokenObj.js";
import { HttpCode } from "@util/httpCodes.js";

const validateToken: Handler<void, void, void> = async (_) => {
  try {
    return createResponse(HttpCode.OK, {
      message: "You are authorized",
    });
  } catch (error) {
    return failedResponse(error);
  }
};

const handler = middyfy(validateToken, null, middyAuthTokenObj());
export { handler };
