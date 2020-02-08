import { IUser } from "../common/interfaces";
import { buildUserIndex } from "../common/algolia";

export const handler = (event: any) => {
  const user: IUser = JSON.parse(event.Records[0].Sns.Message);

  insertUserToAlgolia(user);
};

const insertUserToAlgolia = (user: IUser) => {
  const userIndex = buildUserIndex();

  return userIndex.addObject({
    objectID: user.id,
    name: user.name,
    photoUrl: user.photoUrl
  });
};
