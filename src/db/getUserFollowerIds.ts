import { getDdbClient } from "../utils";

export const getUserFollowerIds = async (userId: string): Promise<string[]> => {
  const client = getDdbClient();

  const params: AWS.DynamoDB.DocumentClient.QueryInput = {
    TableName: process.env.TABLE_NAME!,
    IndexName: "GSI2",
    KeyConditionExpression: "#pk = :pk and begins_with(#sk, :sk)",
    ExpressionAttributeNames: {
      "#pk": "GSI2PK",
      "#sk": "SK"
    },
    ExpressionAttributeValues:{
      ":pk": `User_${userId}`,
      ":sk": "Following_"
    }
  };

  console.log(params);

  const res = await client.query(params).promise()
  return (res.Items || []).map(i => i.PK.split('_')[1]);
};
