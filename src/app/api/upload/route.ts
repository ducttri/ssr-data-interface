import jwt, { JwtPayload } from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

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

export async function POST(request: NextRequest) {
  const audience = process.env.KINDE_AUDIENCE as string;
  const issuer = "https://ssrdatainterface.kinde.com";
  const token = request.headers.get("authorization") || "";
  let valid = false;

  await verifyAccessToken(token, audience, issuer)
    .then((decoded) => {
      console.log("Token is valid:", decoded);
      if (verifyRole(decoded.roles)) {
        valid = true;
      } else {
        return NextResponse.json({
          status: 403,
          statusText: "User doesn't have permission",
        });
      }
    })
    .catch((err) => {
      console.error("Token verification failed:", err);
    });

  if (valid) {
    const dataForm = await request.formData();
    const data: JSON = JSON.parse((dataForm.get("data") as string) || "{}");
    const uri = process.env.MONGODB_URI as string;
    const client = new MongoClient(uri);

    try {
      const database = client.db("HealthData");
      const datacollection = database.collection("SampleHealthData");
      const result = await datacollection.insertOne(data);
      
      return NextResponse.json({
        status: 200,
        statusText: "Succesfully upload data",
      });
    } catch (e) {
      console.error("Failed to upload data: " + e);
      return NextResponse.json({
        status: 503,
        statusText: "Unsuccesfully upload data",
      });
    }
  } else {
    return NextResponse.json({
      status: 503,
      statusText: "Failed to verify token",
    });
  }
}
