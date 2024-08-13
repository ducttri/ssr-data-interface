import jwt, { JwtPayload } from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { MongoClient } from "mongodb";

const audience = process.env.KINDE_AUDIENCE as string;
const issuer = "https://ssrdatainterface.kinde.com";

const client = jwksClient({
  jwksUri: "https://ssrdatainterface.kinde.com/.well-known/jwks.json",
});

const getKey = (header: any, callback: any) => {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      callback(err, null);
    } else {
      const signingKey = key?.getPublicKey();
      callback(null, signingKey);
    }
  });
};

const verifyAccessToken = (
  token: string,
  audience: string,
  issuer: string
): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      getKey,
      { algorithms: ["RS256"], audience, issuer },
      (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded as JwtPayload);
        }
      }
    );
  });
};

const verifyRole = (roles: JwtPayload[]): boolean => {
  if (Array.isArray(roles) && roles.some((role) => role.name === "Admin")) {
    return true;
  } else {
    return false;
  }
};

export const verifyAccess = async (token: string): Promise<boolean> => {
  let valid = false;

  await verifyAccessToken(token, audience, issuer)
    .then((decoded) => {
      console.log("Token is valid:", decoded);
      if (verifyRole(decoded.roles)) {
        valid = true;
      } 
    })
    .catch((err) => {
      console.error("Token verification failed:", err);
    });

  return valid;
};

export const uploadData = async (data: JSON): Promise<{success: boolean, id: string}> => {
  const uri = process.env.MONGODB_URI as string;
  const dbName = process.env.MONGODB_DATABASE as string;
  const dbCollection = process.env.MONGODB_HEALTH as string;
  const client = new MongoClient(uri);

  try {
    const database = client.db(dbName);
    const datacollection = database.collection(dbCollection);
    const result = await datacollection.insertOne(data);

    return {success: true, id: result.insertedId.toString()};
  } catch (e) {
    console.error("Failed to upload data: " + e);
    return {success: false, id: 'INVALID'};
  }
};


