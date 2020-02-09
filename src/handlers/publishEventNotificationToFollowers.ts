import { Event } from "../common/interfaces";
import { SNSEvent } from "aws-lambda";
import { getUserFollowerIds } from "../db/getUserFollowerIds";
import { getPushTokensFromUserIds } from "../db/getPushTokensFromUserIds";
import { Expo } from "expo-server-sdk";

const expo = new Expo();

export const handler = async (awsEvent: SNSEvent) => {
  const event: Event = JSON.parse(awsEvent.Records[0].Sns.Message);

  const userId = event.userId;
  const followerIds = await getUserFollowerIds(userId);
  const pushTokens = await getPushTokensFromUserIds(followerIds);

  const messages = pushTokens.map(pushToken => ({
    to: pushToken,
    body: `${event.userName} is drinking in ${event.placeName}`
  }));

  console.log(messages);

  let chunks = expo.chunkPushNotifications(messages);
  for (let chunk of chunks) {
    try {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log(ticketChunk);
    } catch (error) {
      console.error(error);
    }
  }
};
