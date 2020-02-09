import { getDdbClient } from "../utils";
import uuidv4 from "uuid/v4";

export const putFollowUser = async (userId: string, userIdToFollow: string) => {
  const client = getDdbClient();

  const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
    TableName: process.env.TABLE_NAME!,
    Item: {
      PK: `User_${userId}`,
      SK: `Following_${uuidv4()}`,
      GSI2PK: `User_${userIdToFollow}`
    }
  };

  await client.put(params).promise();
};
