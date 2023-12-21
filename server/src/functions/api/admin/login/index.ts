import { Handler, middyfy } from "@lib/middywrapper.js";
import { bodySchema, schema } from "@schema/loginSchema.js";
import type { FromSchema } from "json-schema-to-ts";
import {
  failedResponse,
  createResponse,
  adminNotFoundError,
  appKeyValidationError,
} from "@util/response.js";
import middyAppKeyObj from "@lib/middyAppKeyObj.js";
import { ISchemaLoginAdmin, createPayload } from "@yumtypes/index.js";
import { getAdminAccountParams } from "@params/index.js";
import { exeGetAdminRequest } from "@src/database/services";
import { compare } from "bcrypt-ts";
import { generateToken } from "@src/lib/authentication";

const getAdmin = async (adminSchema: ISchemaLoginAdmin) => {
  const params = getAdminAccountParams(adminSchema);
  return exeGetAdminRequest(params);
};

const login = async (adminSchema: ISchemaLoginAdmin) => {
  let admin = await getAdmin(adminSchema);
  if (!admin) {
    throw adminNotFoundError();
  }
  let correctPassword = await compare(adminSchema.password, admin.password);
  let secret = process.env["APP_KEY"];
  if (!correctPassword || !secret) {
    throw adminNotFoundError();
  }
  let payload = createPayload(admin.id, admin.username);
  return {
    accessToken: generateToken(payload, secret),
    username: admin.username,
    firstname: admin.firstname,
    lastname: admin.lastname,
    email: admin.email,
    id: admin.id,
    createdAccountAt: admin.createdAccountAt,
  };
};

const signInAdminPersonal: Handler<
  FromSchema<typeof bodySchema>,
  void,
  void
> = async (event) => {
  try {
    let user: ISchemaLoginAdmin = event.body;
    const result = await login(user);
    return createResponse(200, result);
  } catch (error) {
    return failedResponse(error);
  }
};

const handler = middyfy(signInAdminPersonal, schema, middyAppKeyObj());
export { handler };
