import { getDdbClient } from "../utils";

export const getUserFollowingId = async (userId: string): Promise<string[]> => {
  const client = getDdbClient();

  const params: AWS.DynamoDB.DocumentClient.QueryInput = {
    TableName: process.env.TABLE_NAME!,
    KeyConditionExpression: "#pk = :pk and begins_with(#sk, :sk)",
    ExpressionAttributeNames: {
      "#pk": "PK",
      "#sk": "SK"
    },
    ExpressionAttributeValues:{
      ":pk": `User_${userId}`,
      ":sk": "Following_"
    }
  };

  const res = await client.query(params).promise()
  return (res.Items || []).map(i => i.GSI2PK.split('_')[1]);
};
