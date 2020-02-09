import {getDdbClient} from "../utils"

export const getPushTokensFromUserIds = async (userIds: string[]): Promise<string[]> => {
  const client = getDdbClient();

  const keys = userIds.map(userId => {
    return {
      PK: `User_${userId}`,
      SK: "PushToken"
    }
  })

  const params: AWS.DynamoDB.DocumentClient.BatchGetItemInput = {
    RequestItems: {
      [process.env.TABLE_NAME!]: {
        Keys: keys
      }
    }
  }

  const responses = (await client.batchGet(params).promise()).Responses || {}
  const items = responses[process.env.TABLE_NAME!] || [];

  return items.map(i => i.data.token);
}
