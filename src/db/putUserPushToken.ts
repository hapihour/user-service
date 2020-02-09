import { getDdbClient } from "../utils";

export const putUserPushToken = async (userId: string, pushToken: string): Promise<void> => {
  const client = getDdbClient();

  const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
    TableName: process.env.TABLE_NAME!,
    Item: {
      PK: `User_${userId}`,
      SK: `PushToken`,
      data: { token: pushToken }
    }
  };

  await client.put(params).promise();
};
