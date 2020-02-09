import { Event, AlgoliaEvent } from "../common/interfaces";
import { getAlgoliaEventsIndex } from "../utils";

export const algoliaPutEvent = async (event: Event): Promise<void> => {
  const index = getAlgoliaEventsIndex();
  const createdAtTimestamp = Date.parse(event.createdAt);
  const algoliaEvent: AlgoliaEvent = {
    ...event,
    createdAtTimestamp,
    objectID: event.id
  }

  await index.addObject(algoliaEvent);
};
