export interface Log {
  id: number,
  actionType: string,
  entryType: string,
  user: {
    id: number,
    username: string
  },
  albumId: number,
  photoId: number,
}