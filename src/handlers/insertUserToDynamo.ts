import * as AWS from "aws-sdk";
import { IUser } from "../common/interfaces";

export const handler = (event, context) => {
  const user: IUser = JSON.parse(event.Records[0].Sns.Message);

  insertUserToDynamo(user);
};

const insertUserToDynamo = (user: IUser) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const params = {
    Item: {
      PK: `User_${user.id}`,
      SK: "UserInfo",
      data: user
    },
    TableName: process.env.TABLE_NAME!
  };

  return dynamoDb.put(params).promise();
};
