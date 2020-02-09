import { getAlgoliaUserIndex } from "../utils";
import { algoliaGetUser } from "./algoliaGetUser";
import { AlgoliaUser } from "../common/interfaces";

export const algoliaUpdateFollowingAndFollower = async (
  userId: string,
  userIdToFollow: string
): Promise<void> => {
  const index = getAlgoliaUserIndex();

  const followingUser: AlgoliaUser = await algoliaGetUser(userId);
  const followedUser: AlgoliaUser = await algoliaGetUser(userIdToFollow);

  const objects = [
    {
      objectID: followingUser.objectID,
      following: [...followingUser.following, followedUser.id]
    },
    {
      objectID: followedUser.objectID,
      followers: [...followedUser.followers, followingUser.id]
    }
  ];

  console.log(objects);

  await index.partialUpdateObjects(objects)
};
