export  interface IGame {
  _id: string;
  title: string;
  genre: string;
  platform: string;
  releaseYear: number;
  developer: string;
  publisher: string;
  description: string;
  rating: number;
  tagArray: string[];
  seriesName: string;
  imageUrl: string;
}

export  interface IUser {
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}
