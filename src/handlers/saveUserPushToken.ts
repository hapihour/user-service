import { APIGatewayProxyEvent } from "aws-lambda";
import { putUserPushToken } from "../db/putUserPushToken";

export const handler = async ({
  body,
  requestContext
}: APIGatewayProxyEvent) => {
  const { pushToken } = JSON.parse(body!);
  const userId = (requestContext.authorizer || {})["HH-UID"];

  await putUserPushToken(userId, pushToken);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      body: "OK"
    })
  };

  return response;
};
