import { Place } from "@googlemaps/google-maps-services-js/dist/common";
import { placeDetails } from "@googlemaps/google-maps-services-js/dist/places/details";

export const getPlaceDetails = async (placeId: string): Promise<Place> => {
  const params = {
    place_id: placeId,
    key: process.env.GOOGLE_MAPS_API_KEY!
  };

  return (await placeDetails({ params: params })).data.result;
};
