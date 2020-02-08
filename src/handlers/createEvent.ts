import { getDdbClient, getCurrentTime } from "../utils";
import uuidv4 from "uuid/v4";
import { Event } from "../common/interfaces";

export const handler = async ({ body, requestContext }) => {
  const { placeId } = JSON.parse(body);
  const userId = requestContext.authorizer["HH-UID"];

  const event = await insertEventToDynamo(placeId, userId);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      body: event
    })
  };

  return response;
};

const insertEventToDynamo = async (
  placeId: string,
  userId: string
): Promise<Event> => {
  const client = getDdbClient();

  const data: Event = {
    id: uuidv4(),
    placeId,
    userId,
    createdAt: getCurrentTime()
  };

  const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
    Item: {
      PK: `User_${userId}`,
      SK: `Event_${data.id}`,
      data
    },
    TableName: process.env.TABLE_NAME!
  };

  await client.put(params).promise();
  return data;
};
