import { User } from "./users";

export interface Review {
  review: string;
  grade: number;
  user: User;
}
