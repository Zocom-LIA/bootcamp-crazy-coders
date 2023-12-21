import { Handler, middyfy } from "@lib/middywrapper.js";
import {
  failedResponse,
  createResponse,
  createAdminExistsError,
} from "@util/response.js";
import { hashSync } from "bcrypt-ts";
import middyAppKeyObj from "@lib/middyAppKeyObj.js";
import { createAdminItemFrom } from "@yumtypes/index.js";
import { createAdminAccountParams } from "@params/index.js";
import { PartialAdminItem } from "@src/types/index.js";
import { execPutRequest } from "@src/database/services/index.js";
import { AWSError } from "aws-sdk";

let admin: PartialAdminItem = {
  email: "chief-cook@yumyum.se",
  id: "de4edea1-10e3-474e-ae82-e63def56de0b",
  username: "chief-cook",
  firstname: "Chief",
  lastname: "Cook",
  password: "chief-cook-99",
  createdAccountAt: new Date().toISOString(),
};

const signUp = async () => {
  let hashedPassword = hashSync(admin.password);
  let adminItem = createAdminItemFrom(admin, hashedPassword);
  let params = createAdminAccountParams(adminItem);
  return execPutRequest(params);
};

const createAccount: Handler<void, void, void> = async (_) => {
  try {
    let dbResponse = await signUp();
    return createResponse(dbResponse.statusCode, {
      message: dbResponse.statusMessage,
    });
  } catch (error) {
    if ((error as AWSError).name === "ConditionalCheckFailedException") {
      return failedResponse(createAdminExistsError());
    }
    return failedResponse(error);
  }
};

const handler = middyfy(createAccount, null, middyAppKeyObj());
export { handler };
