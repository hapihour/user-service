import { APIGatewayProxyEvent } from "aws-lambda";
import { putFollowUser } from "../db/putFollowing";
import { publishToSnsTopic } from "../utils";
import { MessageFollowing, Topics } from "../common/topics";

export const handler = async ({
  body,
  requestContext
}: APIGatewayProxyEvent) => {
  const { userIdToFollow } = JSON.parse(body!);
  const userId = (requestContext.authorizer || {})["HH-UID"];

  await putFollowUser(userId, userIdToFollow);
  await publishToSnsTopic<MessageFollowing>(Topics.UserFollowed, {
    userId,
    userIdToFollow
  });

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      body: "OK"
    })
  };

  return response;
};
