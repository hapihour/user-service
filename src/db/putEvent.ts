import { Event } from "../common/interfaces";
import {getDdbClient} from "../utils";

export const putEvent = async(event: Event): Promise<void> => {
  const client = getDdbClient();

  const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
    TableName: process.env.TABLE_NAME!,
    Item: {
      PK: `User_${event.userId}`,
      SK: `Event_${event.id}`,
      data: event
    }
  }

  await client.put(params).promise();
}
