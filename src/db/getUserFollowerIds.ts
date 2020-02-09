import { getDdbClient } from "../utils";

export const getUserFollowerIds = async (userId: string): Promise<string[]> => {
  const client = getDdbClient();

  // TODO: For now we're only getting all users
  const params: AWS.DynamoDB.DocumentClient.QueryInput = {
    TableName: process.env.TABLE_NAME!,
    IndexName: "GSI1",
    KeyConditionExpression: "#pk = :pk and begins_with(#sk, :sk)",
    ExpressionAttributeNames: {
      "#pk": "SK",
      "#sk": "PK"
    },
    ExpressionAttributeValues:{
      ":pk": "UserInfo",
      ":sk": "User_"
    }
  };

  const res = await client.query(params).promise()
  return (res.Items || []).map(i => i.data.id);
};
