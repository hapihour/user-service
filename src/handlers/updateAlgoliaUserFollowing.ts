import { SNSEvent } from "aws-lambda";
import {MessageFollowing} from "../common/topics";
import {algoliaUpdateFollowingAndFollower} from "../algolia/algoliaUpdateFollowingAndFollower";

export const handler = async (event: SNSEvent) => {
  const message: MessageFollowing = JSON.parse(event.Records[0].Sns.Message);
  const { userId, userIdToFollow } = message;

  await algoliaUpdateFollowingAndFollower(userId, userIdToFollow);
};
