import jsonwebtoken from "jsonwebtoken";
import { IPayload, IJwtPayload } from "@yumtypes/index.js";
import { ValidationError } from "@util/validationError";
const { verify, sign } = jsonwebtoken;

export const generateToken = (payload: IPayload, secret: string): string => {
  return sign(payload, secret, { expiresIn: "8h" });
};

export const authenticate = (
  token: string,
  secret: string
): Promise<IJwtPayload> => {
  return new Promise((resolve, reject) => {
    verify(token, secret, (error, decoded) => {
      if (error) {
        reject(new ValidationError(error.name, error.message));
      }
      if (!(decoded as IJwtPayload)) {
        reject(
          new ValidationError(
            "Unrecognized token",
            "Token is not recognized by the system"
          )
        );
      } else {
        resolve(decoded as IJwtPayload);
      }
    });
  });
};
