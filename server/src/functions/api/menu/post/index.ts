import { Handler, middyfy } from "@lib/middywrapper.js";
import { failedResponse, createResponse } from "@util/response.js";
import middyAppKeyObj from "@lib/middyAppKeyObj.js";
import { writeMenu } from "@src/database/services/postMenu";

const table: Handler<void, void, void> = async (_) => {
  try {
    let dbResponse = await writeMenu();
    return createResponse(dbResponse.statusCode, {
      message: dbResponse.statusMessage,
    });
  } catch (error) {
    return failedResponse(error);
  }
};

const handler = middyfy(table, null, middyAppKeyObj());
export { handler };
