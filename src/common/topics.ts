type ITopics = {
  EventCreated: string
  UserFollowed: string
}

export const Topics: ITopics = {
  EventCreated: 'EventCreated',
  UserFollowed: 'UserFollowed'
}

export type MessageFollowing = {
  userId: string,
  userIdToFollow: string
}
