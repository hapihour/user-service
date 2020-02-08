export interface IUser {
  id: string;
  email: string;
  photoUrl: string;
  name: string;
}

export interface Event {
  id: string,
  placeId: string,
  userId: string,
  createdAt: string
}
