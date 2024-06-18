import jwt, { JwtPayload } from "jsonwebtoken";
import jwksClient from "jwks-rsa";
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

export async function GET(request: NextRequest) {
  const audience = "http://localhost:3000/api";
  const issuer = "https://ssrdatainterface.kinde.com";
  const token = request.headers.get("authorization") || "";
  verifyAccessToken(token, audience, issuer)
    .then((decoded) => {
      console.log("Token is valid:", decoded);
    })
    .catch((err) => {
      console.error("Token verification failed:", err);
    }); 
  return NextResponse.json({ status: "failed" });
}
