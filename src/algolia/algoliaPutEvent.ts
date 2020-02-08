import { Event } from "../common/interfaces";
import { getAlgoliaEventsIndex } from "../utils";

export const algoliaPutEvent = async (event: Event): Promise<void> => {
  const index = getAlgoliaEventsIndex();

  await index.addObject(event);
};
