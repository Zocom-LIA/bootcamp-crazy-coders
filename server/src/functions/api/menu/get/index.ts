import { Handler, middyfy } from "@lib/middywrapper.js";
import { failedResponse, createResponse } from "@util/response.js";
import middyAppKeyObj from "@lib/middyAppKeyObj.js";
import { queryMenuParam } from "@params/index.js";
import { execQueryTable } from "@database/services/index.js";

const table: Handler<void, void, void> = async (_) => {
  try {
    const params = queryMenuParam();
    const items = await execQueryTable(params);
    return createResponse(200, items);
  } catch (error) {
    return failedResponse(error);
  }
};

const handler = middyfy(table, null, middyAppKeyObj());
export { handler };