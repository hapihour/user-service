export interface IUser {
  id: string;
  email: string;
  photoUrl: string;
  name: string;
}

export type AlgoliaUser = {
  id: string;
  photoUrl: string;
  name: string;
  objectID: string,
  following: string[],
  followers: string[]
}

export interface Event {
  id: string,
  placeId: string,
  placeName: string,
  vicinity: string,
  userId: string,
  userName: string,
  userPhotoUrl: string,
  createdAt: string
}

export type AlgoliaEvent = Event & {
  createdAtTimestamp: number,
  objectID: string
}
