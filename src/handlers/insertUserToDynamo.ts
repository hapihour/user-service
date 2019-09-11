import * as AWS from "aws-sdk";

interface User {
  id: string;
  email: string;
  photoUrl: string;
  name: string;
}

export const handler = (event, context) => {
  const user: User = JSON.parse(event.Records[0].Sns.Message);

  console.log(user);

  insertUserToDynamo(user);
};

const insertUserToDynamo = (user: User) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const params = {
    Item: user,
    TableName: process.env.USERS_TABLE!
  };

  return dynamoDb.put(params).promise();
}
