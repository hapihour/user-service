import { getCurrentTime, publishToSnsTopic } from "../utils";
import uuidv4 from "uuid/v4";
import { Event } from "../common/interfaces";
import { getPlaceDetails } from "../actions/google";
import { putEvent } from "../db/putEvent";
import { APIGatewayProxyEvent } from "aws-lambda";
import { getUser } from "../db/getUser";
import { Topics } from "../common/topics";

export const handler = async ({
  body,
  requestContext
}: APIGatewayProxyEvent) => {
  console.log(body);
  const { placeId } = JSON.parse(body!);
  const userId = (requestContext.authorizer || {})["HH-UID"];

  const place = await getPlaceDetails(placeId);
  const user = await getUser(userId);

  const event: Event = {
    id: uuidv4(),
    placeId,
    userId,
    placeName: place.name || "",
    userName: user.name,
    userPhotoUrl: user.photoUrl,
    vicinity: place.vicinity || "",
    createdAt: getCurrentTime()
  };

  await putEvent(event);
  await publishToSnsTopic<Event>(Topics.EventCreated, event);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      body: event
    })
  };

  return response;
};
