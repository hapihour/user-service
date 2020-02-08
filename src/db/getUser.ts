import {getDdbClient} from "../utils"
import {IUser} from "../common/interfaces";

export const getUser = async (userId: string): Promise<IUser> => {
  const client = getDdbClient();

  const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
    TableName: process.env.TABLE_NAME!,
    Key: {
      PK: `User_${userId}`,
      SK: "UserInfo"
    }
  }

  const item = (await client.get(params).promise()).Item;

  if (item) {
    return item.data;
  } else {
    throw new Error(`User ${userId} not nfound`);
  }
}
