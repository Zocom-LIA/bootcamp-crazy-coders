import { Handler, middyfy } from "@lib/middywrapper.js";
import { failedResponse, createResponse } from "@util/response.js";
import middyAppKeyObj from "@lib/middyAppKeyObj.js";
import { getMenuParams } from "@params/index.js";
import { execGetRequest } from "@database/services/index.js";

const table: Handler<void, void, void> = async (_) => {
  try {
    const params = getMenuParams();
    let menu = await execGetRequest(params);
    return createResponse(200, menu);
  } catch (error) {
    return failedResponse(error);
  }
};

const handler = middyfy(table, null, middyAppKeyObj());
export { handler };
