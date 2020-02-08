import { IUser } from "../common/interfaces";
import { algoliaPutUser } from "../algolia/algoliaPutUser";
import { SNSEvent } from "aws-lambda";

export const handler = async (event: SNSEvent) => {
  const user: IUser = JSON.parse(event.Records[0].Sns.Message);

  await algoliaPutUser(user);
};
