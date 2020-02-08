import { IUser } from "../common/interfaces";
import { getDdbClient } from "../utils";

export const putUser = async (user: IUser) => {
  const client = getDdbClient();

  const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
    TableName: process.env.TABLE_NAME!,
    Item: {
      PK: `User_${user.id}`,
      SK: "UserInfo",
      data: user
    }
  };

  await client.put(params).promise();
};
