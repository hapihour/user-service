import * as AWS from "aws-sdk";

export const getDdbClient = () => {
  return new AWS.DynamoDB.DocumentClient();
};

export const getCurrentTime = (): string => {
  return new Date().toISOString();
}
