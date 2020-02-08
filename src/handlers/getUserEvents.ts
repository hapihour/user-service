import { getDdbClient } from "../utils";
import { Event } from "../common/interfaces";

export const handler = async ({ requestContext }) => {
  const userId = requestContext.authorizer["HH-UID"];

  const event = await getUserEventsFromDdb(userId);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      body: event
    })
  };

  return response;
};

const getUserEventsFromDdb = async (userId: string): Promise<Event[]> => {
  const client = getDdbClient();
  const params: AWS.DynamoDB.DocumentClient.QueryInput = {
    TableName: process.env.TABLE_NAME!,
    KeyConditionExpression: "#pk = :pk and begins_with(#sk, :sk)",
    ExpressionAttributeNames: {
      "#pk": "PK",
      "#sk": "SK"
    },
    ExpressionAttributeValues: {
      ":pk": `User_${userId}`,
      ":sk": "Event_"
    }
  }


  const res = await client.query(params).promise();

  return (res.Items || []).map(i => i.data);
}
