import { IUser } from "../common/interfaces";
import { getAlgoliaUserIndex } from "../utils";

export const algoliaPutUser = async (user: IUser): Promise<void> => {
  const index = getAlgoliaUserIndex();

  await index.addObject({
    id: user.id,
    name: user.name,
    photoUrl: user.photoUrl
  });
};
