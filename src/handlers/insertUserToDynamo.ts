import { IUser } from "../common/interfaces";
import { putUser } from "../db/putUser";
import { SNSEvent } from "aws-lambda";

export const handler = async (event: SNSEvent) => {
  const user: IUser = JSON.parse(event.Records[0].Sns.Message);

  await putUser(user);
};
