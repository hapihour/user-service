import * as AWS from 'aws-sdk';
import {IUser} from '../common/interaces';

export const handler = (event, context) => {
  const user: IUser = JSON.parse(event.Records[0].Sns.Message);

  insertUserToDynamo(user);
};

const insertUserToDynamo = (user: IUser) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const params = {
    Item: user,
    TableName: process.env.USERS_TABLE!,
  };

  return dynamoDb.put(params).promise();
};
