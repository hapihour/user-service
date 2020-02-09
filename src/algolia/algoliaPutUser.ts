import { IUser, AlgoliaUser } from "../common/interfaces";
import { getAlgoliaUserIndex } from "../utils";

export const algoliaPutUser = async (user: IUser): Promise<void> => {
  const index = getAlgoliaUserIndex();

  const algoliaUser: AlgoliaUser = {
    id: user.id,
    name: user.name,
    photoUrl: user.photoUrl,
    objectID: user.id,
    following: [],
    followers: []
  }

  await index.addObject(algoliaUser);
};
