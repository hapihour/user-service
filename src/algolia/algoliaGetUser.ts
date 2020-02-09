import { getAlgoliaUserIndex } from "../utils";
import {AlgoliaUser} from "../common/interfaces";

export const algoliaGetUser = async (userId: string): Promise<AlgoliaUser> => {
  const index = getAlgoliaUserIndex();

  return (await index.getObject(userId)) as AlgoliaUser
};
