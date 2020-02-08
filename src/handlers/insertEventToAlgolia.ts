import { Event } from "../common/interfaces";
import { SNSEvent } from "aws-lambda";
import { algoliaPutEvent } from "../algolia/algoliaPutEvent";

export const handler = async (awsEvent: SNSEvent) => {
  const event: Event = JSON.parse(awsEvent.Records[0].Sns.Message);

  await algoliaPutEvent(event);
};
